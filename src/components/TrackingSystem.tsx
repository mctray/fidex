import { useState } from 'react';
import { supabase, Shipment, TrackingEvent } from '../lib/supabase';
import { Search, Package, MapPin, Calendar, CheckCircle, TruckIcon, Clock } from 'lucide-react';

export default function TrackingSystem() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [error, setError] = useState('');

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
        .order('event_time', { ascending: false });

      if (eventsError) throw eventsError;

      setEvents(eventsData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track shipment');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'out_for_delivery':
        return <TruckIcon className="w-6 h-6 text-blue-600" />;
      case 'in_transit':
        return <Package className="w-6 h-6 text-yellow-600" />;
      default:
        return <Clock className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_transit':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'picked_up':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
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
    <div className="space-y-8">
      <form onSubmit={handleTrack} className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Track Your Shipment</h3>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number (e.g., SHP12345678)"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 disabled:transform-none flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Tracking...' : 'Track'}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
      </form>

      {shipment && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-scaleIn">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-slate-900">Shipment Details</h4>
              <span className={`px-4 py-2 rounded-full border-2 font-semibold text-sm ${getStatusColor(shipment.status)}`}>
                {formatStatus(shipment.status)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-slate-500 mb-1">Tracking Number</h5>
                  <p className="text-lg font-mono font-bold text-blue-600">{shipment.tracking_number}</p>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-slate-500 mb-1">From</h5>
                  <p className="text-slate-900 font-medium">{shipment.sender_name}</p>
                  <p className="text-sm text-slate-600">{shipment.sender_address}</p>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-slate-500 mb-1">To</h5>
                  <p className="text-slate-900 font-medium">{shipment.recipient_name}</p>
                  <p className="text-sm text-slate-600">{shipment.recipient_address}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-slate-500 mb-1">Service Type</h5>
                  <p className="text-slate-900 font-medium capitalize">{shipment.service_type}</p>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-slate-500 mb-1">Package Details</h5>
                  <p className="text-slate-900">
                    <span className="capitalize">{shipment.package_type}</span>
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-slate-500 mb-1">Estimated Delivery</h5>
                  <p className="text-slate-900 font-medium">
                    {shipment.estimated_delivery ? formatDate(shipment.estimated_delivery) : 'Calculating...'}
                  </p>
                </div>

                {shipment.actual_delivery && (
                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 mb-1">Delivered On</h5>
                    <p className="text-green-600 font-semibold">{formatDate(shipment.actual_delivery)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {shipment.extra_info && shipment.status === 'in_transit' && (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl shadow-xl p-8 animate-fadeInUp delay-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-yellow-400 rounded-full p-3">
                  <Package className="w-6 h-6 text-yellow-900" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-yellow-900 mb-2">Important Notice</h4>
                  <p className="text-yellow-800 text-base leading-relaxed">{shipment.extra_info}</p>
                </div>
              </div>
            </div>
          )}

          {events.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp delay-200">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Tracking History</h4>

              <div className="space-y-6">
                {events.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex-shrink-0">
                        {getStatusIcon(event.status)}
                      </div>
                      {index < events.length - 1 && (
                        <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                      )}
                    </div>

                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-1">
                        <h5 className="font-semibold text-slate-900">{formatStatus(event.status)}</h5>
                        <span className="text-sm text-slate-500">{formatDate(event.event_time)}</span>
                      </div>
                      <p className="text-slate-600 text-sm mb-1">{event.description}</p>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
