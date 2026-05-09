import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'John Mitchell',
      role: 'CEO, Global Trade Corp',
      content: 'Given my past experiences with other logistics companies, I can say without exception that the services provided by Fidex greatly exceed industry standards.',
      rating: 5,
      initials: 'JM',
      color: 'blue',
    },
    {
      name: 'Steve Macholnad',
      role: 'Manager, Smart Move LTD',
      content: 'More than once, they have saved the day, delivering our cargo on time with short notice. They have won my gratitude and loyalty with their can do approach.',
      rating: 5,
      initials: 'SM',
      color: 'green',
    },
    {
      name: 'Robert Liu',
      role: 'Director, Pacific Imports',
      content: 'I am very pleased with the service provided. They find good carriers and use them regularly so we get a high level of service. Their communication is outstanding.',
      rating: 5,
      initials: 'RL',
      color: 'purple',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-orange-600 font-semibold text-sm uppercase tracking-wide mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6">
            Hear from our satisfied customers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            About their experience with our logistics solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-8 relative group hover:shadow-xl transition-all duration-300 animate-fadeInUp delay-${index * 100 + 200}`}
            >
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex items-center mb-4 mt-2">
                <div className="flex text-orange-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-500" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">5.0</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                <div className={`w-12 h-12 bg-gradient-to-br from-${testimonial.color}-100 to-${testimonial.color}-200 rounded-full flex items-center justify-center mr-4`}>
                  <span className={`text-${testimonial.color}-600 font-semibold text-lg`}>{testimonial.initials}</span>
                </div>
                <div>
                  <h6 className="font-semibold text-teal-800">{testimonial.name}</h6>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">Ready to experience exceptional logistics service?</p>
          <a href="#" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
