import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from './ui/Dialog';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import toast from 'react-hot-toast';
import { Package, Upload, Loader2, Image as ImageIcon } from 'lucide-react';

interface CreateShipmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (shipmentId: string) => void;
}

function generateTrackingNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'SHIP';
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function CreateShipmentModal({ open, onOpenChange, onSuccess }: CreateShipmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    origin: '',
    destination: '',
    sender_name: '',
    sender_phone: '',
    sender_email: '',
    sender_address: '',
    receiver_name: '',
    receiver_phone: '',
    receiver_email: '',
    receiver_address: '',
    package_description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setUploadingImage(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('package-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('package-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const trackingNumber = generateTrackingNumber();

      let packageImageUrl = null;
      if (imageFile) {
        packageImageUrl = await uploadImage();
      }

      const senderName = formData.sender_name || formData.customer_name;
      const senderPhone = formData.sender_phone || formData.customer_phone;
      const senderEmail = formData.sender_email || formData.customer_email;
      const senderAddress = formData.sender_address || formData.origin;

      const { data, error } = await supabase
        .from('shipments')
        .insert({
          tracking_number: trackingNumber,
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone,
          customer_email: formData.customer_email,
          origin: formData.origin,
          destination: formData.destination,
          current_location: formData.origin,
          status: 'pending',
          sender_name: senderName,
          sender_email: senderEmail,
          sender_phone: senderPhone,
          sender_address: senderAddress,
          receiver_name: formData.receiver_name,
          receiver_email: formData.receiver_email,
          receiver_phone: formData.receiver_phone,
          receiver_address: formData.receiver_address || formData.destination,
          package_description: formData.package_description,
          package_image_url: packageImageUrl,
          recipient_name: formData.receiver_name || 'TBD',
          recipient_email: formData.receiver_email || '',
          recipient_phone: formData.receiver_phone || '',
          recipient_address: formData.receiver_address || formData.destination,
          package_type: 'parcel',
          package_weight: 0,
          service_type: 'standard',
          price: 0,
        })
        .select()
        .single();

      if (error) throw error;

      await supabase.from('tracking_events').insert({
        shipment_id: data.id,
        status: 'pending',
        location: formData.origin,
        description: 'Shipment created',
      });

      toast.success(`Shipment created! Tracking: ${trackingNumber}`);
      setFormData({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        origin: '',
        destination: '',
        sender_name: '',
        sender_phone: '',
        sender_email: '',
        sender_address: '',
        receiver_name: '',
        receiver_phone: '',
        receiver_email: '',
        receiver_address: '',
        package_description: '',
      });
      setImageFile(null);
      setImagePreview(null);
      onOpenChange(false);
      onSuccess(data.id);
    } catch (error) {
      console.error('Error creating shipment:', error);
      toast.error('Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader onClose={() => onOpenChange(false)}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Package className="w-5 h-5 text-teal-600" />
            </div>
            <DialogTitle>Create New Shipment</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Sender Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sender_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Name
                    </label>
                    <Input
                      id="sender_name"
                      name="sender_name"
                      value={formData.sender_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="sender_phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Phone
                    </label>
                    <Input
                      id="sender_phone"
                      name="sender_phone"
                      type="tel"
                      value={formData.sender_phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label htmlFor="sender_email" className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Email
                    </label>
                    <Input
                      id="sender_email"
                      name="sender_email"
                      type="email"
                      value={formData.sender_email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="sender_address" className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Address
                    </label>
                    <Input
                      id="sender_address"
                      name="sender_address"
                      value={formData.sender_address}
                      onChange={handleChange}
                      placeholder="123 Main St, New York, NY"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Receiver Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="receiver_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Receiver Name *
                    </label>
                    <Input
                      id="receiver_name"
                      name="receiver_name"
                      value={formData.receiver_name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="receiver_phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Receiver Phone *
                    </label>
                    <Input
                      id="receiver_phone"
                      name="receiver_phone"
                      type="tel"
                      value={formData.receiver_phone}
                      onChange={handleChange}
                      placeholder="+1 987 654 3210"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="receiver_email" className="block text-sm font-medium text-gray-700 mb-1">
                      Receiver Email
                    </label>
                    <Input
                      id="receiver_email"
                      name="receiver_email"
                      type="email"
                      value={formData.receiver_email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="receiver_address" className="block text-sm font-medium text-gray-700 mb-1">
                      Receiver Address
                    </label>
                    <Input
                      id="receiver_address"
                      name="receiver_address"
                      value={formData.receiver_address}
                      onChange={handleChange}
                      placeholder="456 Oak Ave, Los Angeles, CA"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-900 mb-4">Package Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="package_description" className="block text-sm font-medium text-gray-700 mb-1">
                      Package Description
                    </label>
                    <textarea
                      id="package_description"
                      name="package_description"
                      value={formData.package_description}
                      onChange={handleChange}
                      placeholder="Describe the package contents..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="package_image" className="block text-sm font-medium text-gray-700 mb-1">
                      Package Image
                    </label>
                    <div className="space-y-3">
                      <input
                        id="package_image"
                        name="package_image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="package_image"
                        className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {imageFile ? imageFile.name : 'Click to upload image'}
                        </span>
                      </label>

                      {imagePreview && (
                        <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                          <img
                            src={imagePreview}
                            alt="Package preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legacy Fields (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Phone
                    </label>
                    <Input
                      id="customer_phone"
                      name="customer_phone"
                      type="tel"
                      value={formData.customer_phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Email
                    </label>
                    <Input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                      Origin
                    </label>
                    <Input
                      id="origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      placeholder="New York, NY"
                    />
                  </div>

                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                      Destination
                    </label>
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Los Angeles, CA"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading || uploadingImage}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploadingImage}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : uploadingImage ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Create Shipment'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
