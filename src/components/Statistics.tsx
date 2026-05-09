import { Clock, Globe, MapPin, Users, Heart, Headphones } from 'lucide-react';

export default function Statistics() {
  const stats = [
    {
      icon: Clock,
      value: '98',
      suffix: '%',
      label: 'Industry-leading on-time delivery performance',
    },
    {
      icon: Globe,
      value: '120',
      suffix: '+',
      label: 'Countries worldwide coverage',
    },
    {
      icon: MapPin,
      value: '99',
      suffix: '%',
      label: 'Advanced tracking systems with GPS precision',
    },
    {
      icon: Users,
      value: '50',
      suffix: 'K+',
      label: 'Logistics professionals worldwide',
    },
    {
      icon: Heart,
      value: '97',
      suffix: '%',
      label: 'Outstanding client satisfaction rating',
    },
    {
      icon: Headphones,
      value: '24/7',
      suffix: '',
      label: 'Excellent online support and expert advice',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-white" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-4">Our Impact</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Delivering excellence across the globe
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            With industry-leading standards and proven track record
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center group animate-fadeInUp delay-${index * 100 + 100}`}>
              <div className="mb-4">
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}{stat.suffix && <span className={stat.suffix.includes('%') ? 'text-2xl' : 'text-lg'}>{stat.suffix}</span>}
                </div>
                <p className="text-sm text-white/70 leading-tight">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-orange-400">
            <span className="text-xl">⭐</span>
            <span className="font-semibold">Trusted by thousands of customers worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}
