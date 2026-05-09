import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, User, MapPin, Phone, Mail, Weight, DollarSign, CheckCircle } from 'lucide-react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: '',
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientAddress: '',
    packageType: 'parcel',
    packageWeight: '',
    declaredValue: '',
    serviceType: 'standard',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');

  const calculatePrice = () => {
    const weight = parseFloat(formData.packageWeight) || 0;
    const basePrice = 10;
    let pricePerKg = 5;

    if (formData.serviceType === 'express') {
      pricePerKg = 8;
    } else if (formData.serviceType === 'overnight') {
      pricePerKg = 12;
    }

    if (formData.packageType === 'freight') {
      pricePerKg *= 1.5;
    }

    return basePrice + (weight * pricePerKg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const price = calculatePrice();
      const estimatedDays = formData.serviceType === 'overnight' ? 1 : formData.serviceType === 'express' ? 2 : 5;
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + estimatedDays);

      const { data, error: insertError } = await supabase
        .from('shipments')
        .insert([
          {
            sender_name: formData.senderName,
            sender_email: formData.senderEmail,
            sender_phone: formData.senderPhone,
            sender_address: formData.senderAddress,
            recipient_name: formData.recipientName,
            recipient_email: formData.recipientEmail,
            recipient_phone: formData.recipientPhone,
            recipient_address: formData.recipientAddress,
            package_type: formData.packageType,
            package_weight: parseFloat(formData.packageWeight),
            declared_value: parseFloat(formData.declaredValue) || 0,
            service_type: formData.serviceType,
            price: price,
            notes: formData.notes,
            estimated_delivery: estimatedDelivery.toISOString(),
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      await supabase.from('tracking_events').insert([
        {
          shipment_id: data.id,
          status: 'pending',
          location: 'Origin Facility',
          description: 'Shipment created and awaiting pickup',
          event_time: new Date().toISOString(),
        },
      ]);

      setTrackingNumber(data.tracking_number);
      setSuccess(true);
      setFormData({
        senderName: '',
        senderEmail: '',
        senderPhone: '',
        senderAddress: '',
        recipientName: '',
        recipientEmail: '',
        recipientPhone: '',
        recipientAddress: '',
        packageType: 'parcel',
        packageWeight: '',
        declaredValue: '',
        serviceType: 'standard',
        notes: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-scaleIn">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full animate-scaleIn delay-100">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 animate-fadeInUp delay-200">Shipment Booked Successfully!</h3>
        <p className="text-slate-600 mb-6 animate-fadeInUp delay-300">Your tracking number is:</p>
        <div className="bg-slate-100 rounded-lg p-4 mb-6 animate-scaleIn delay-400">
          <p className="text-3xl font-mono font-bold text-blue-600">{trackingNumber}</p>
        </div>
        <p className="text-sm text-slate-500 mb-6 animate-fadeInUp delay-500">
          A confirmation email has been sent to both sender and recipient.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 animate-fadeInUp delay-500"
        >
          Book Another Shipment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Book Your Shipment</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Sender Information
          </h4>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
            <input
              type="tel"
              name="senderPhone"
              value={formData.senderPhone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Address</label>
            <textarea
              name="senderAddress"
              value={formData.senderAddress}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Recipient Information
          </h4>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
            <input
              type="tel"
              name="recipientPhone"
              value={formData.recipientPhone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Address</label>
            <textarea
              name="recipientAddress"
              value={formData.recipientAddress}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          Package Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Package Type</label>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="document">Document</option>
              <option value="parcel">Parcel</option>
              <option value="freight">Freight</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              name="packageWeight"
              value={formData.packageWeight}
              onChange={handleChange}
              required
              step="0.1"
              min="0.1"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Service Type</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard (5 days)</option>
              <option value="express">Express (2 days)</option>
              <option value="overnight">Overnight (1 day)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Declared Value ($)</label>
            <input
              type="number"
              name="declaredValue"
              value={formData.declaredValue}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Special Instructions (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {formData.packageWeight && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Estimated Cost:</span>
              <span className="text-2xl font-bold text-blue-600">${calculatePrice().toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-6 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 disabled:transform-none"
      >
        {loading ? 'Processing...' : 'Book Shipment'}
      </button>
    </form>
  );
}
