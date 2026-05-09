import { Plane, Ship, TruckIcon, Warehouse, Package, Network, ArrowRight } from 'lucide-react';

export default function Features() {
  const services = [
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'Professional and reliable global air-freight solutions with IATA-endorsed services for time-sensitive shipments.',
      color: 'blue',
    },
    {
      icon: Ship,
      title: 'Ocean Freight',
      description: 'International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.',
      color: 'teal',
    },
    {
      icon: TruckIcon,
      title: 'Road Transport',
      description: 'Highly experienced and dependable domestic road transportation with comprehensive coverage and reliable delivery.',
      color: 'green',
    },
    {
      icon: Warehouse,
      title: 'Warehousing',
      description: 'Shared and dedicated warehousing solutions supported by state-of-the-art technology and security systems.',
      color: 'purple',
    },
    {
      icon: Package,
      title: 'Mail & Parcel',
      description: 'Global secure mail and equipment delivery service with complete confidence and comprehensive tracking.',
      color: 'orange',
    },
    {
      icon: Network,
      title: 'Supply Chain',
      description: 'Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.',
      color: 'indigo',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-orange-600 font-semibold text-sm uppercase tracking-wide mb-4">Our Services</p>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6">
            Comprehensive shipping and logistics solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tailored to meet your business needs with professional expertise and cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp delay-${index * 100 + 100}`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br from-${service.color}-100 to-${service.color}-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-8 h-8 text-${service.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <a href="#" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          ))}
        </div>

        <div className="text-center animate-fadeInUp">
          <a href="#" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}
