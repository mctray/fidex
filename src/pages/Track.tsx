import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Package, MapPin, CheckCircle, TruckIcon, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Timeline, TimelineItem } from '../components/ui/Timeline';
import toast, { Toaster } from 'react-hot-toast';

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
  sender_email: string | null;
  sender_phone: string | null;
  sender_address: string;
  receiver_name: string | null;
  receiver_email: string | null;
  receiver_phone: string | null;
  receiver_address: string | null;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string;
  recipient_address: string;
  package_description: string | null;
  package_image_url: string | null;
  status: string;
  package_type: string;
  package_weight: number;
  service_type: string;
  estimated_delivery: string | null;
  actual_delivery: string | null;
  extra_info: string | null;
  created_at: string;
}

interface TrackingEvent {
  id: string;
  shipment_id: string;
  status: string;
  location: string;
  description: string;
  event_time: string;
  created_at: string;
}

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [error, setError] = useState('');

  const deduplicateEvents = (events: TrackingEvent[]): TrackingEvent[] => {
    if (events.length === 0) return [];

    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    const deduplicated: TrackingEvent[] = [];
    let lastStatus = '';

    for (const event of sortedEvents) {
      if (event.status !== lastStatus) {
        deduplicated.push(event);
        lastStatus = event.status;
      }
    }

    return deduplicated;
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShipment(null);
    setEvents([]);

    try {
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber.trim().toUpperCase())
        .maybeSingle();

      if (shipmentError) throw shipmentError;

      if (!shipmentData) {
        setError('No shipment found with this tracking number');
        return;
      }

      setShipment(shipmentData);

      const { data: eventsData, error: eventsError } = await supabase
        .from('tracking_events')
        .select('*')
        .eq('shipment_id', shipmentData.id)
        .order('created_at', { ascending: true });

      if (eventsError) throw eventsError;

      setEvents(deduplicateEvents(eventsData || []));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track shipment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!shipment) return;

    const channel = supabase
      .channel(`tracking-${shipment.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tracking_events',
          filter: `shipment_id=eq.${shipment.id}`,
        },
        (payload) => {
          const newEvent = payload.new as TrackingEvent;
          setEvents((prev) => {
            const updated = [...prev, newEvent];
            return deduplicateEvents(updated);
          });
          toast.success('New tracking update available!', {
            duration: 4000,
            icon: '📦',
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'shipments',
          filter: `id=eq.${shipment.id}`,
        },
        (payload) => {
          const newShipment = payload.new as Shipment;
          const oldShipment = shipment;

          setShipment(newShipment);

          if (oldShipment.status !== newShipment.status) {
            toast.success(`Status updated to: ${formatStatus(newShipment.status)}`, {
              duration: 4000,
              icon: '🔄',
            });
          } else if (oldShipment.current_location !== newShipment.current_location) {
            toast.info(`Location updated: ${newShipment.current_location}`, {
              duration: 4000,
              icon: '📍',
            });
          } else {
            toast.info('Shipment information updated', {
              duration: 3000,
              icon: '✨',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [shipment]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'out_for_delivery':
        return <TruckIcon className="w-6 h-6 text-blue-600" />;
      case 'in_transit':
        return <Package className="w-6 h-6 text-yellow-600" />;
      case 'picked_up':
        return <Package className="w-6 h-6 text-orange-600" />;
      case 'failed':
      case 'returned':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'out_for_delivery':
        return 'info';
      case 'in_transit':
        return 'warning';
      case 'picked_up':
        return 'secondary';
      case 'failed':
      case 'returned':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Track Your Shipment</h1>
          <p className="text-base sm:text-lg text-gray-600">Enter your tracking number to see real-time updates</p>
        </div>

        <Card className="mb-6 sm:mb-8 shadow-lg">
          <CardContent className="pt-4 sm:pt-6">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g., SHIPAK7G9M4P2)"
                  required
                  className="text-base sm:text-lg"
                />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                {loading ? 'Tracking...' : 'Track'}
              </Button>
            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {shipment && (
          <div className="space-y-4 sm:space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-white text-xl sm:text-2xl mb-2">Shipment Details</CardTitle>
                    <p className="text-teal-50 font-mono text-sm sm:text-lg break-all">{shipment.tracking_number}</p>
                  </div>
                  <Badge variant={getStatusColor(shipment.status)} className="text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2 self-start sm:self-auto">
                    {formatStatus(shipment.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                      <h5 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2 sm:mb-3">Sender Information</h5>
                      <div className="space-y-1.5 sm:space-y-2">
                        <p className="text-base sm:text-lg font-medium text-gray-900 break-words">
                          {shipment.sender_name || shipment.customer_name || 'N/A'}
                        </p>
                        {(shipment.sender_phone || shipment.customer_phone) && (
                          <p className="text-xs sm:text-sm text-gray-600 break-all">
                            Phone: {shipment.sender_phone || shipment.customer_phone}
                          </p>
                        )}
                        {(shipment.sender_email || shipment.customer_email) && (
                          <p className="text-xs sm:text-sm text-gray-600 break-all">
                            Email: {shipment.sender_email || shipment.customer_email}
                          </p>
                        )}
                        {(shipment.sender_address || shipment.origin) && (
                          <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-1 mt-2">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-words">{shipment.sender_address || shipment.origin}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                      <h5 className="text-xs sm:text-sm font-semibold text-green-900 mb-2 sm:mb-3">Receiver Information</h5>
                      <div className="space-y-1.5 sm:space-y-2">
                        <p className="text-base sm:text-lg font-medium text-gray-900 break-words">
                          {shipment.receiver_name || shipment.recipient_name || 'N/A'}
                        </p>
                        {(shipment.receiver_phone || shipment.recipient_phone) && (
                          <p className="text-xs sm:text-sm text-gray-600 break-all">
                            Phone: {shipment.receiver_phone || shipment.recipient_phone}
                          </p>
                        )}
                        {(shipment.receiver_email || shipment.recipient_email) && (
                          <p className="text-xs sm:text-sm text-gray-600 break-all">
                            Email: {shipment.receiver_email || shipment.recipient_email}
                          </p>
                        )}
                        {(shipment.receiver_address || shipment.destination || shipment.recipient_address) && (
                          <p className="text-xs sm:text-sm text-gray-600 flex items-start gap-1 mt-2">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-words">{shipment.receiver_address || shipment.destination || shipment.recipient_address}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {shipment.current_location && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                        <h5 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> Current Location
                        </h5>
                        <p className="text-base sm:text-lg font-medium text-blue-700 break-words">{shipment.current_location}</p>
                      </div>
                    )}

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
                      <h5 className="text-xs sm:text-sm font-semibold text-orange-900 mb-2">Package Details</h5>
                      <p className="text-sm sm:text-base text-gray-900">
                        <span className="capitalize font-medium">{shipment.package_type}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 capitalize mt-1">
                        Service: {shipment.service_type}
                      </p>
                      {shipment.package_description && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Description:</p>
                          <p className="text-xs sm:text-sm text-gray-700 p-2 sm:p-3 bg-white rounded-lg border border-gray-200 break-words">
                            {shipment.package_description}
                          </p>
                        </div>
                      )}
                      {shipment.package_image_url && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Package Image:</p>
                          <div className="relative w-full rounded-lg overflow-hidden border-2 border-gray-200 bg-white">
                            <img
                              src={shipment.package_image_url}
                              alt="Package"
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {shipment.estimated_delivery && (
                      <div>
                        <h5 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Estimated Delivery</h5>
                        <p className="text-sm sm:text-base text-gray-900">{formatDate(shipment.estimated_delivery)}</p>
                      </div>
                    )}

                    {shipment.actual_delivery && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                        <h5 className="text-xs sm:text-sm font-semibold text-green-900 mb-2">Delivered On</h5>
                        <p className="text-base sm:text-lg font-medium text-green-700">
                          {formatDate(shipment.actual_delivery)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {shipment.extra_info && shipment.status === 'in_transit' && (
              <Card className="shadow-lg border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-orange-500 rounded-full p-2 sm:p-3">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-orange-900 mb-2">Important Notice</h3>
                      <p className="text-sm sm:text-base text-gray-800 whitespace-pre-wrap leading-relaxed break-words">
                        {shipment.extra_info}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Tracking Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline>
                  {events.length > 0 ? (
                    events.map((event, index) => (
                      <TimelineItem
                        key={event.id}
                        status={formatStatus(event.status)}
                        statusColor={getStatusColor(event.status)}
                        timestamp={formatDate(event.event_time || event.created_at)}
                        location={event.location}
                        description={event.description}
                        icon={getStatusIcon(event.status)}
                        isLast={index === events.length - 1}
                      />
                    ))
                  ) : (
                    <TimelineItem
                      status="Shipment Created"
                      statusColor="default"
                      timestamp={formatDate(shipment.created_at)}
                      location={shipment.origin || shipment.sender_address || 'Origin'}
                      description="Your shipment has been registered in our system and is being prepared for pickup."
                      icon={<Package className="w-6 h-6 text-gray-400" />}
                      isLast={true}
                    />
                  )}
                </Timeline>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
