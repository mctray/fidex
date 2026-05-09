import { Plane, Ship, TruckIcon, Warehouse, Package, Network, Clock, Shield, Globe, CheckCircle } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'Professional and reliable global air-freight solutions with IATA-endorsed services for time-sensitive shipments.',
      features: [
        'Express delivery worldwide',
        'Temperature-controlled cargo',
        'Hazardous goods handling',
        'Real-time flight tracking',
      ],
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
    },
    {
      icon: Ship,
      title: 'Ocean Freight',
      description: 'International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.',
      features: [
        'Full Container Load (FCL)',
        'Less Container Load (LCL)',
        'Door-to-door delivery',
        'Customs clearance support',
      ],
      color: 'from-teal-500 to-teal-600',
      bgGradient: 'from-teal-50 to-teal-100',
    },
    {
      icon: TruckIcon,
      title: 'Road Transport',
      description: 'Highly experienced and dependable domestic road transportation with comprehensive coverage and reliable delivery.',
      features: [
        'Last-mile delivery',
        'Cross-country shipping',
        'Refrigerated transport',
        'Flexible scheduling',
      ],
      color: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      icon: Warehouse,
      title: 'Warehousing',
      description: 'Shared and dedicated warehousing solutions supported by state-of-the-art technology and security systems.',
      features: [
        'Climate-controlled facilities',
        '24/7 security monitoring',
        'Inventory management',
        'Pick and pack services',
      ],
      color: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
    },
    {
      icon: Package,
      title: 'Mail & Parcel',
      description: 'Global secure mail and equipment delivery service with complete confidence and comprehensive tracking.',
      features: [
        'Same-day delivery options',
        'Signature confirmation',
        'Package insurance',
        'Parcel tracking',
      ],
      color: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100',
    },
    {
      icon: Network,
      title: 'Supply Chain',
      description: 'Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.',
      features: [
        'End-to-end visibility',
        'Risk management',
        'Demand forecasting',
        'Distribution optimization',
      ],
      color: 'from-teal-600 to-teal-700',
      bgGradient: 'from-teal-50 to-teal-100',
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: '99.9% on-time delivery rate with real-time tracking and notifications',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Comprehensive insurance coverage and advanced security protocols',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Worldwide presence with local expertise in over 150 countries',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-orange-500 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-orange-200 font-semibold text-sm uppercase tracking-wide mb-4">Our Services</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Comprehensive Logistics Solutions
            </h1>
            <p className="text-xl md:text-2xl text-teal-50 max-w-3xl mx-auto leading-relaxed">
              Tailored shipping and logistics services designed to meet your unique business needs with professional expertise
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${service.bgGradient} p-8 text-center`}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-800 mb-2">{service.title}</h3>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 shadow-md">
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">
              Why Choose Fidex
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver excellence through innovation, reliability, and customer-focused solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-teal-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-r from-teal-700 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ship with Us?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            Contact our team today for a customized logistics solution tailored to your business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#track"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
