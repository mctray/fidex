import { TruckIcon, Shield, Headphones, Award, Target, Globe, Users, Clock, CheckCircle, Phone, ArrowRight } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide exceptional logistics solutions that enable businesses to grow and thrive in the global marketplace through innovation, reliability, and customer-focused service.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Operating in over 120 countries with a network of trusted partners, we deliver your packages anywhere in the world with unmatched efficiency and care.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your cargo is protected by comprehensive insurance, advanced tracking systems, and our commitment to the highest security standards in the industry.',
    },
  ];

  const features = [
    {
      icon: TruckIcon,
      title: 'Fast & Reliable',
      description: 'Professional shipping solutions with unmatched reliability and speed to meet your business needs worldwide.',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Advanced security systems and comprehensive insurance coverage ensure your shipments are protected every step of the way.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support and expert advice from our dedicated team of logistics professionals.',
    },
  ];

  const stats = [
    { number: '25+', label: 'Years Experience' },
    { number: '120+', label: 'Countries Served' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '1M+', label: 'Packages Delivered' },
  ];

  const timeline = [
    { year: '1998', title: 'Company Founded', description: 'Started as a small local shipping company with a vision to go global' },
    { year: '2005', title: 'Global Expansion', description: 'Expanded operations to over 50 countries across 5 continents' },
    { year: '2015', title: 'Technology Integration', description: 'Launched advanced tracking system and digital logistics platform' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as one of the top logistics companies worldwide' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-orange-500 text-white py-12 sm:py-16 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-orange-200 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-3 sm:mb-4">About Us</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Worldwide Logistics Excellence
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-teal-50 max-w-3xl mx-auto leading-relaxed">
              Leading the way in air freight forwarding, road haulage, and supply chain solutions for over 25 years
            </p>
          </div>
        </div>
      </div>

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-orange-600 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-3 sm:mb-4">Who We Are</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-800 mb-4 sm:mb-6 leading-tight">
                  A Leading Third-Party Contract Logistics Company
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                  Fidex specializes in providing comprehensive supply-chain warehousing and transport services throughout the world. Our commitment to excellence has made us a trusted partner for businesses of all sizes.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  With state-of-the-art technology, a global network, and a team of experienced professionals, we deliver solutions that drive efficiency, reduce costs, and ensure your cargo arrives safely and on time.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-teal-800 mb-1">{feature.title}</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-lg sm:rounded-2xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Logistics Operations"
                    className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white rounded-lg sm:rounded-2xl shadow-2xl p-4 sm:p-6 max-w-xs w-auto">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 sm:w-8 sm:h-8 text-orange-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-teal-800 text-base sm:text-lg">Industry Leader</h5>
                      <p className="text-xs sm:text-sm text-gray-600">Excellence since 1998</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-teal-50 to-orange-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center">
                    <h4 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-1">{stat.number}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-orange-600 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-3 sm:mb-4">Our Values</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-800 mb-3 sm:mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision we make and every service we provide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-teal-800 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-orange-600 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-3 sm:mb-4">Our Journey</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-800 mb-3 sm:mb-4">
              A Legacy of Excellence
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200"></div>

            <div className="space-y-8 sm:space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-right pr-4 sm:pr-8' : 'text-left pl-4 sm:pl-8'}`}>
                    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
                      <span className="inline-block px-3 sm:px-4 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full text-xs sm:text-sm mb-2 sm:mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-teal-800 mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-700 to-orange-600 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-12 lg:px-16 lg:py-16 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Partner With Us Today
              </h2>
              <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
                Experience the difference that 25+ years of logistics expertise can make for your business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#track"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get Started
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
