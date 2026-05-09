import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import CreateShipmentModal from '../components/CreateShipmentModal';
import toast, { Toaster } from 'react-hot-toast';
import { Package, TrendingUp, CheckCircle, Clock, Plus, Check, X, Upload, Loader2, Trash2, Mail, Eye, Phone } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
}

interface Shipment {
  id: string;
  tracking_number: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  origin: string | null;
  destination: string | null;
  current_location: string | null;
  sender_name: string;
  sender_phone: string | null;
  sender_email: string | null;
  sender_address: string;
  receiver_name: string | null;
  receiver_phone: string | null;
  receiver_email: string | null;
  receiver_address: string | null;
  recipient_name: string;
  recipient_address: string;
  package_description: string | null;
  package_image_url: string | null;
  status: string;
  package_type: string;
  package_weight: number;
  price: number;
  extra_info: string | null;
  customs_amount: number | null;
  created_at: string;
  updated_at: string;
}

const statusOptions = [
  'pending',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'failed',
  'returned'
];

export default function AdminDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Shipment>>({});
  const [originalValues, setOriginalValues] = useState<Partial<Shipment>>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [updatedShipmentId, setUpdatedShipmentId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0,
  });

  const fetchShipments = async () => {
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setShipments(data || []);

      const total = data?.length || 0;
      const pending = data?.filter(s => s.status === 'pending').length || 0;
      const inTransit = data?.filter(s => ['picked_up', 'in_transit', 'out_for_delivery'].includes(s.status)).length || 0;
      const delivered = data?.filter(s => s.status === 'delivered').length || 0;

      setStats({ total, pending, inTransit, delivered });
    } catch (error) {
      console.error('Error fetching shipments:', error);
      toast.error('Failed to load shipments');
    } finally {
      setLoading(false);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setContactMessages(data || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      toast.error('Failed to load contact messages');
    }
  };

  const updateStats = (shipmentsList: Shipment[]) => {
    const total = shipmentsList.length;
    const pending = shipmentsList.filter(s => s.status === 'pending').length;
    const inTransit = shipmentsList.filter(s => ['picked_up', 'in_transit', 'out_for_delivery'].includes(s.status)).length;
    const delivered = shipmentsList.filter(s => s.status === 'delivered').length;
    setStats({ total, pending, inTransit, delivered });
  };

  useEffect(() => {
    fetchShipments();
    fetchContactMessages();

    const shipmentsChannel = supabase
      .channel('shipments-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'shipments'
      }, (payload) => {
        const newShipment = payload.new as Shipment;
        setShipments(prev => {
          const updated = [newShipment, ...prev];
          updateStats(updated);
          return updated;
        });
        toast.success('New shipment created');
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'shipments'
      }, (payload) => {
        const updatedShipment = payload.new as Shipment;
        setShipments(prev => {
          const updated = prev.map(s => s.id === updatedShipment.id ? updatedShipment : s);
          updateStats(updated);
          return updated;
        });

        if (editingId !== updatedShipment.id) {
          setUpdatedShipmentId(updatedShipment.id);
          setTimeout(() => setUpdatedShipmentId(null), 2000);
        }
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'shipments'
      }, (payload) => {
        const deletedId = payload.old.id;
        setShipments(prev => {
          const updated = prev.filter(s => s.id !== deletedId);
          updateStats(updated);
          return updated;
        });
      })
      .subscribe();

    const messagesChannel = supabase
      .channel('messages-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'contact_messages'
      }, (payload) => {
        const newMessage = payload.new as ContactMessage;
        setContactMessages(prev => [newMessage, ...prev]);
        toast('New contact message received');
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'contact_messages'
      }, (payload) => {
        const updatedMessage = payload.new as ContactMessage;
        setContactMessages(prev => prev.map(m => m.id === updatedMessage.id ? updatedMessage : m));
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'contact_messages'
      }, (payload) => {
        const deletedId = payload.old.id;
        setContactMessages(prev => prev.filter(m => m.id !== deletedId));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(shipmentsChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, []);

  const startEditing = (shipment: Shipment) => {
    setEditingId(shipment.id);
    setOriginalValues(shipment);
    setEditedValues(shipment);
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('package-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('package-images')
        .getPublicUrl(filePath);

      handleFieldChange('package_image_url', publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedValues({});
    setOriginalValues({});
    toast('Changes cancelled');
  };

  const deleteShipment = async (shipmentId: string, trackingNumber: string) => {
    if (!confirm(`Are you sure you want to delete shipment ${trackingNumber}? This action cannot be undone and the tracking code will become invalid.`)) {
      return;
    }

    try {
      await supabase
        .from('tracking_events')
        .delete()
        .eq('shipment_id', shipmentId);

      const { error } = await supabase
        .from('shipments')
        .delete()
        .eq('id', shipmentId);

      if (error) throw error;

      setShipments(prev => prev.filter(s => s.id !== shipmentId));
      toast.success('Shipment deleted successfully');

      if (editingId === shipmentId) {
        cancelEdit();
      }
    } catch (error) {
      console.error('Error deleting shipment:', error);
      toast.error('Failed to delete shipment');
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', messageId);

      if (error) throw error;

      setContactMessages(prev =>
        prev.map(msg => msg.id === messageId ? { ...msg, is_read: true, read_at: new Date().toISOString() } : msg)
      );
      toast.success('Message marked as read');
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark message as read');
    }
  };

  const deleteContactMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setContactMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const [saving, setSaving] = useState(false);

  const saveChanges = async () => {
    if (!editingId) return;

    const mergedValues = {
      ...originalValues,
      ...editedValues,
    } as Partial<Shipment>;

    try {
      setSaving(true);

      const oldStatus = originalValues.status;
      const oldLocation = originalValues.current_location;
      const newStatus = mergedValues.status ?? 'pending';
      const newLocation = mergedValues.current_location;
      const customsAmount = typeof mergedValues.customs_amount === 'string'
        ? Number(mergedValues.customs_amount)
        : mergedValues.customs_amount ?? 5000;
      const extraInfo = newStatus === 'in_transit'
        ? `Customs duty of $${customsAmount} is required to continue delivery. Please contact support for payment`
        : mergedValues.extra_info ?? null;

      const updatePayload = {
        tracking_number: mergedValues.tracking_number,
        customer_name: mergedValues.customer_name,
        customer_phone: mergedValues.customer_phone,
        customer_email: mergedValues.customer_email,
        origin: mergedValues.origin,
        destination: mergedValues.destination,
        current_location: mergedValues.current_location,
        sender_name: mergedValues.sender_name,
        sender_phone: mergedValues.sender_phone,
        sender_email: mergedValues.sender_email,
        sender_address: mergedValues.sender_address,
        receiver_name: mergedValues.receiver_name,
        receiver_phone: mergedValues.receiver_phone,
        receiver_email: mergedValues.receiver_email,
        receiver_address: mergedValues.receiver_address,
        package_description: mergedValues.package_description,
        package_image_url: mergedValues.package_image_url,
        status: newStatus,
        extra_info: extraInfo,
        customs_amount: customsAmount,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('shipments')
        .update(updatePayload)
        .eq('id', editingId)
        .select('*');

      if (error) throw error;

      const updatedShipment = Array.isArray(data) && data.length > 0 ? data[0] : null;
      if (!updatedShipment) {
        console.warn('Supabase update returned no rows; falling back to local merged values.', data);
      }

      const logTrackingEvent = async (payload: {
        shipment_id: string;
        status: string;
        location: string;
        description: string;
      }) => {
        const { error: eventError } = await supabase
          .from('tracking_events')
          .insert(payload);

        if (eventError) {
          console.error('Error logging tracking event:', eventError);
        }
      };

      if (oldStatus !== newStatus) {
        const location = newLocation || mergedValues.destination || mergedValues.recipient_address || 'Unknown';
        await logTrackingEvent({
          shipment_id: editingId,
          status: newStatus,
          location,
          description: `Status updated from ${oldStatus || 'unknown'} to ${newStatus}`,
        });
      }

      if (oldLocation !== newLocation && newLocation) {
        await logTrackingEvent({
          shipment_id: editingId,
          status: newStatus,
          location: newLocation,
          description: `Location updated to ${newLocation}`,
        });
      }

      const updatedRow = updatedShipment || { ...mergedValues, id: editingId };
      setShipments(prev =>
        prev.map(s => (s.id === editingId ? { ...s, ...updatedRow } : s))
      );

      toast.success('Shipment updated successfully');
      cancelEdit();
    } catch (error) {
      console.error('Error updating shipment:', error);
      const message = error instanceof Error ? error.message : JSON.stringify(error);
      toast.error(`Failed to update shipment: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleShipmentCreated = (shipmentId: string) => {
    fetchShipments();
    setTimeout(() => {
      if (tableRef.current) {
        const newRow = document.querySelector(`[data-shipment-id="${shipmentId}"]`);
        if (newRow) {
          newRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
          newRow.classList.add('animate-pulse', 'bg-teal-50');
          setTimeout(() => {
            newRow.classList.remove('animate-pulse', 'bg-teal-50');
          }, 2000);
        }
      }
    }, 100);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-teal-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage all shipments and tracking information</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} size="lg" className="w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Create New Shipment
          </Button>
        </div>

        <CreateShipmentModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={handleShipmentCreated}
        />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Total Shipments</CardTitle>
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Pending</CardTitle>
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">In Transit</CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.inTransit}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stats.delivered}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">All Shipments</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="overflow-x-auto max-w-full -mx-2 sm:mx-0" ref={tableRef}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Tracking #</TableHead>
                    <TableHead className="min-w-[120px]">Customer</TableHead>
                    <TableHead className="min-w-[100px]">Phone</TableHead>
                    <TableHead className="min-w-[140px]">Email</TableHead>
                    <TableHead className="min-w-[120px]">Origin</TableHead>
                    <TableHead className="min-w-[120px]">Destination</TableHead>
                    <TableHead className="min-w-[120px]">Location</TableHead>
                    <TableHead className="min-w-[110px]">Status</TableHead>
                    <TableHead className="min-w-[130px]">Created</TableHead>
                    <TableHead className="min-w-[180px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center text-gray-500 py-8">
                        No shipments found. Click "Create New Shipment" to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    shipments.map((shipment) => {
                      const isEditing = editingId === shipment.id;
                      const isUpdated = updatedShipmentId === shipment.id;
                      const displayValues = isEditing ? editedValues : shipment;
                      const showExtraInfo = isEditing && displayValues.status === 'in_transit';

                      return (
                        <>
                          <TableRow
                            key={shipment.id}
                            data-shipment-id={shipment.id}
                            className={`transition-all duration-300 ${
                              isEditing ? 'bg-blue-50' :
                              isUpdated ? 'bg-green-100 animate-pulse' :
                              ''
                            }`}
                          >
                            <TableCell>
                              <Input
                                value={displayValues.tracking_number || ''}
                                onFocus={() => !isEditing && startEditing(shipment)}
                                onChange={(e) => handleFieldChange('tracking_number', e.target.value)}
                                className="w-full font-mono text-xs"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={displayValues.customer_name || displayValues.sender_name || ''}
                                onFocus={() => !isEditing && startEditing(shipment)}
                                onChange={(e) => handleFieldChange('customer_name', e.target.value)}
                                className="w-full text-xs"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={displayValues.customer_phone || ''}
                                onFocus={() => !isEditing && startEditing(shipment)}
                                onChange={(e) => handleFieldChange('customer_phone', e.target.value)}
                                placeholder="Phone"
                                className="w-full text-xs"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={displayValues.customer_email || ''}
                                onFocus={() => !isEditing && startEditing(shipment)}
                                onChange={(e) => handleFieldChange('customer_email', e.target.value)}
                                placeholder="Email"
                                type="email"
                                className="w-full text-xs"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={displayValues.origin || displayValues.sender_address || ''}
                                onFocus={() => !isEditing && startEditing(shipment)}
                                onChange={(e) => handleFieldChange('origin', e.target.value)}
                                placeholder="Origin"
                                className="w-full text-xs"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={displayValues.destination || displayValues.recipient_address || ''}
                                onFocus={() => !isEditing && startEditing(shipment)}
                                onChange={(e) => handleFieldChange('destination', e.target.value)}
                                placeholder="Destination"
                                className="w-full text-xs"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={displayValues.current_location || ''}
                                onFocus={() => !isEditing && startEditing(shipment)}
                                onChange={(e) => handleFieldChange('current_location', e.target.value)}
                                placeholder="Location"
                                className="w-full text-xs"
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                value={displayValues.status || 'pending'}
                                onFocus={() => !isEditing && startEditing(shipment)}
                                onChange={(e) => handleFieldChange('status', e.target.value)}
                                className="w-full text-xs"
                              >
                                {statusOptions.map((status) => (
                                  <option key={status} value={status}>
                                    {status.replace('_', ' ').toUpperCase()}
                                  </option>
                                ))}
                              </Select>
                            </TableCell>
                            <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                              {formatDate(shipment.created_at)}
                            </TableCell>
                            <TableCell>
                              {isEditing ? (
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={saveChanges}
                                    disabled={saving}
                                    className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1"
                                  >
                                    <Check className="w-3 h-3 mr-1" />
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={cancelEdit}
                                    className="border-gray-300 text-gray-600 hover:bg-gray-50 text-xs px-2 py-1"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => startEditing(shipment)}
                                    className="text-xs px-2 py-1"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => deleteShipment(shipment.id, shipment.tracking_number)}
                                    className="border-red-300 text-red-600 hover:bg-red-50 text-xs px-2 py-1"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                          {isEditing && (
                            <>
                              <TableRow key={`${shipment.id}-sender`} className="bg-blue-50">
                                <TableCell colSpan={10}>
                                  <div className="space-y-2 p-2">
                                    <h4 className="text-xs font-semibold text-blue-900">Sender Information</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                                        <Input
                                          value={displayValues.sender_name || ''}
                                          onChange={(e) => handleFieldChange('sender_name', e.target.value)}
                                          placeholder="Sender name"
                                          className="text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                                        <Input
                                          value={displayValues.sender_phone || ''}
                                          onChange={(e) => handleFieldChange('sender_phone', e.target.value)}
                                          placeholder="Sender phone"
                                          className="text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                                        <Input
                                          value={displayValues.sender_email || ''}
                                          onChange={(e) => handleFieldChange('sender_email', e.target.value)}
                                          placeholder="Sender email"
                                          className="text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                                        <Input
                                          value={displayValues.sender_address || ''}
                                          onChange={(e) => handleFieldChange('sender_address', e.target.value)}
                                          placeholder="Sender address"
                                          className="text-xs"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow key={`${shipment.id}-receiver`} className="bg-green-50">
                                <TableCell colSpan={10}>
                                  <div className="space-y-2 p-2">
                                    <h4 className="text-xs font-semibold text-green-900">Receiver Information</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                                        <Input
                                          value={displayValues.receiver_name || ''}
                                          onChange={(e) => handleFieldChange('receiver_name', e.target.value)}
                                          placeholder="Receiver name"
                                          className="text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                                        <Input
                                          value={displayValues.receiver_phone || ''}
                                          onChange={(e) => handleFieldChange('receiver_phone', e.target.value)}
                                          placeholder="Receiver phone"
                                          className="text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                                        <Input
                                          value={displayValues.receiver_email || ''}
                                          onChange={(e) => handleFieldChange('receiver_email', e.target.value)}
                                          placeholder="Receiver email"
                                          className="text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                                        <Input
                                          value={displayValues.receiver_address || ''}
                                          onChange={(e) => handleFieldChange('receiver_address', e.target.value)}
                                          placeholder="Receiver address"
                                          className="text-xs"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow key={`${shipment.id}-package`} className="bg-orange-50">
                                <TableCell colSpan={10}>
                                  <div className="space-y-2 p-2">
                                    <h4 className="text-xs font-semibold text-orange-900">Package Details</h4>
                                    <div className="space-y-2">
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                          value={displayValues.package_description || ''}
                                          onChange={(e) => handleFieldChange('package_description', e.target.value)}
                                          placeholder="Describe the package contents..."
                                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-y min-h-[50px]"
                                          rows={2}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Package Image</label>
                                        <div className="flex items-center gap-2">
                                          {displayValues.package_image_url && (
                                            <div className="relative w-16 h-16 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                                              <img
                                                src={displayValues.package_image_url}
                                                alt="Package"
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                          )}
                                          <div>
                                            <input
                                              type="file"
                                              accept="image/*"
                                              onChange={handleImageUpload}
                                              className="hidden"
                                              id={`image-upload-${shipment.id}`}
                                            />
                                            <label
                                              htmlFor={`image-upload-${shipment.id}`}
                                              className="inline-flex items-center px-3 py-1 text-xs border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                            >
                                              {uploadingImage ? (
                                                <>
                                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                                  Uploading...
                                                </>
                                              ) : (
                                                <>
                                                  <Upload className="w-3 h-3 mr-1" />
                                                  {displayValues.package_image_url ? 'Change' : 'Upload'}
                                                </>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                              {showExtraInfo && (
                                <TableRow key={`${shipment.id}-extra`} className="bg-yellow-50">
                                  <TableCell colSpan={10}>
                                    <div className="space-y-2 p-2">
                                      <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                          Customs Duty Payment Request
                                          <span className="text-xs text-gray-500 font-normal ml-2">(Shown to customer)</span>
                                        </label>
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="text-xs text-gray-700 select-none">Customs duty of $</span>
                                          <Input
                                            type="number"
                                            value={displayValues.customs_amount ?? 5000}
                                            onChange={(e) => handleFieldChange('customs_amount', e.target.value)}
                                            placeholder="5000"
                                            className="w-24 text-xs"
                                            min="0"
                                            step="100"
                                          />
                                          <span className="text-xs text-gray-700 select-none">is required to continue delivery. Please contact support for payment</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                          Preview: "Customs duty of ${displayValues.customs_amount ?? 5000} is required to continue delivery. Please contact support for payment"
                                        </p>
                                      </div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </>
                          )}
                        </>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 sm:mt-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-lg sm:text-xl">Contact Messages</CardTitle>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Messages from the Contact Us page
                </p>
              </div>
              <Badge variant={contactMessages.filter(m => !m.is_read).length > 0 ? 'error' : 'default'} className="self-start sm:self-auto">
                {contactMessages.filter(m => !m.is_read).length} Unread
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            {contactMessages.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-500">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {contactMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                      message.is_read
                        ? 'border-gray-200 bg-white'
                        : 'border-orange-200 bg-orange-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 break-words">{message.name}</h3>
                          {!message.is_read && (
                            <Badge variant="error" className="text-xs">New</Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-xs sm:text-sm text-gray-600 mb-3">
                          <p className="flex items-center gap-2 break-all">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <a href={`mailto:${message.email}`} className="hover:text-orange-600">
                              {message.email}
                            </a>
                          </p>
                          {message.phone && (
                            <p className="flex items-center gap-2 break-all">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <a href={`tel:${message.phone}`} className="hover:text-orange-600">
                                {message.phone}
                              </a>
                            </p>
                          )}
                          {message.subject && (
                            <p className="text-xs text-gray-500 break-words">
                              Subject: {message.subject}
                            </p>
                          )}
                        </div>
                        <div className="bg-white p-2 sm:p-3 rounded border border-gray-200">
                          <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap break-words">{message.message}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Received: {new Date(message.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-row sm:flex-col gap-2 self-start">
                        {!message.is_read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markMessageAsRead(message.id)}
                            className="text-xs whitespace-nowrap flex-1 sm:flex-none"
                          >
                            <Eye className="w-3 h-3 sm:mr-1" />
                            <span className="hidden sm:inline">Mark Read</span>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteContactMessage(message.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50 text-xs flex-1 sm:flex-none"
                        >
                          <Trash2 className="w-3 h-3 sm:mr-1" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
