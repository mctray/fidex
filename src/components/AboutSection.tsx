import { TruckIcon, Shield, Headphones, Award, ArrowRight, Phone, Clock, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="animate-fadeInUp">
              <p className="text-orange-600 font-semibold text-sm uppercase tracking-wide mb-4">About Fidex </p>
              <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6 leading-tight">
                Worldwide Logistics, Air Freight Forwarding, Road Haulage
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We are a leading third party contract logistics company specializing in providing supply-chain warehousing and transport services throughout the world.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 animate-fadeInUp delay-100">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <TruckIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-teal-800 mb-2">Fast & Reliable Delivery</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Professional shipping solutions with unmatched reliability and speed to meet your business needs worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 animate-fadeInUp delay-200">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-teal-800 mb-2">Secure & Safe</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Advanced security systems and comprehensive insurance coverage ensure your shipments are protected every step of the way.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 animate-fadeInUp delay-300">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Headphones className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-teal-800 mb-2">24/7 Support</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Round-the-clock customer support and expert advice from our dedicated team of logistics professionals.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fadeInUp delay-400">
              <a href="#services" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
                <ArrowRight className="w-5 h-5 mr-3" />
                Discover All Solutions
              </a>
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white font-semibold rounded-full transition-all duration-200">
                <Phone className="w-5 h-5 mr-3" />
                Contact Us
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative group animate-scaleIn">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Logistics Operations"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 max-w-xs animate-fadeInUp delay-200">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-teal-800 text-lg">Industry Leader</h5>
                    <p className="text-sm text-gray-600">Over 25 years of excellence</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 animate-fadeInUp delay-300">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-teal-800 mb-1">98%</h4>
                <p className="text-sm text-gray-600">On-time delivery</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TruckIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-teal-800 mb-1">120+</h4>
                <p className="text-sm text-gray-600">Countries served</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-teal-800 mb-1">50K+</h4>
                <p className="text-sm text-gray-600">Happy customers</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TruckIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-teal-800 mb-1">1M+</h4>
                <p className="text-sm text-gray-600">Packages delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
