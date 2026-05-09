import { TruckIcon, CheckCircle, Calculator, Search, Plane, Ship, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function Logistics() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-700/70 z-10"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Logistics Operations"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl mb-6 animate-slide-up">
            Transport & <br />
            <span className="text-orange-400">Logistics</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Take the complexity out of customs Freight Solutions <br />
            with customs brokerage services
          </p>
          <a
            href="#services"
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            DISCOVER OUR SERVICES
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <TruckIcon className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-800 mb-6">
              Reliable UK & Ireland Transport<br />
              <span className="text-orange-600">Logistics Since 1973</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Content Column */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Because we understand that your top priority is to get your goods to your customers on time and in full, we offer a full spectrum of transport logistics solutions to ensure you have the flexibility to send different sizes of consignment without having to find a new provider.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With so many options available you can rest assured that we will be able to deliver your consignment, regardless of its size. And if there's ever a time where you need some advice on choosing the right solution, our transport team, who have more than 120 years' experience.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-teal-50 rounded-lg">
                  <div className="text-3xl font-bold text-teal-700 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">120+</div>
                  <div className="text-sm text-gray-600">Expert Team</div>
                </div>
              </div>

              <div className="mt-8">
                <img
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Warehouse Operations"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Images Column */}
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Logistics Team"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Transport Fleet"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Services List */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-8">
                Fidex <br />
                <span className="text-orange-600">Services Include:</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Contract distribution</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Ad-hoc transport</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Groupage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Tail-lift deliveries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Double-deck trailers</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Reverse logistics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Curtain-sided vehicles</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Next day delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Timed deliveries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">AM deliveries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Logistics Services"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-teal-700 to-teal-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Contact us today!
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Contact us today for your airfreight <br />
            requirements
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            CLICK HERE TO CONTACT US!
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Service Highlights Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Full Load Services"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-3">
                  Full, Part, and <br />
                  Consolidated Loads
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our dedicated fleet of vehicles operates nationally throughout the UK delivering both full, part, and consolidated loads.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Equipment"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-3">
                  Fidex <br />
                  Equipment
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sending smaller consignments of less than 10 pallets used to be expensive business, but we have a solution for you.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="European Transport"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-3">
                  European Transport <br />
                  Logistics
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  In addition to our UK services, through our trusted and fully-vetted network of partners, we offer a full import and export service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-600 to-orange-600 rounded-full mb-6">
              <TruckIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-teal-800 mb-4">
              Ready to Ship with Fidex Delivery?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get started with our comprehensive logistics solutions today. Our expert team is ready to handle your shipping needs with precision and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-full transition-colors duration-200"
              >
                Get Quote
                <Calculator className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#track"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                Track Shipment
                <Search className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
