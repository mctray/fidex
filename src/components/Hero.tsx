import { Package, TruckIcon, Globe, Search, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trackSection = document.getElementById('track');
    if (trackSection) {
      trackSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[80vh] md:min-h-[700px] flex items-center">
      <div className="absolute inset-0 overflow-hidden z-0">
        <iframe
          src="https://www.youtube.com/embed/P818EHoGB_o?autoplay=1&mute=1&loop=1&playlist=P818EHoGB_o&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
          title="Hero Background Video"
          allow="autoplay; encrypted-media"
          className="absolute inset-0 w-full h-full"
          style={{
            transform: 'translate(-50%, -50%) scale(1.5)',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: '177.77777778vh',
            height: '56.25vw',
            pointerEvents: 'none'
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-white space-y-8 mt-8 md:mt-0">
            <div className="space-y-4 animate-fadeInUp">
              <p className="text-orange-400 font-medium text-lg tracking-wide">
                Leading Global Logistics Service
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Fastest & Reliable <span className="text-orange-400">Courier Service</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                We offer a full range of global freight services with unmatched reliability and speed. Professional shipping solutions tailored to meet your business needs worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-200">
              <a href="#services" className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105">
                <TruckIcon className="w-5 h-5 mr-2" />
                Our Services
              </a>
              <a href="#about" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-teal-700 font-semibold rounded-full transition-all duration-200">
                <Package className="w-5 h-5 mr-2" />
                Learn More
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm bg-white/95 animate-scaleIn">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-teal-800 mb-2">Track Your Shipment</h3>
              <p className="text-gray-600">Enter your tracking number to get real-time updates on your package</p>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number..."
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-full text-teal-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  required
                />
              </div>

              <button type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Search className="w-5 h-5 inline mr-2" />
                Track Package
              </button>
            </form>

            <div className="mt-8 md:mt-12 text-center">
              <p className="text-sm text-gray-600">
                Need help? <a href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">Contact our support team</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 hidden lg:block z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white animate-fadeInUp delay-400">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold">24/7 Support</p>
              <p className="text-sm opacity-80">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white animate-fadeInUp delay-500">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold">Global Reach</p>
              <p className="text-sm opacity-80">Worldwide delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
