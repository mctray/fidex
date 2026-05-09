import { Phone, Mail, MapPin, Clock, Send, TruckIcon, Globe, Shield, Package, CheckCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const subject = formData.serviceType
        ? `${formData.serviceType.replace('_', ' ')} - ${formData.company || 'Inquiry'}`
        : formData.company || 'General Inquiry';

      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: fullName,
          email: formData.email,
          phone: formData.phone || null,
          subject: subject,
          message: formData.message,
        });

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        serviceType: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const quickContactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'fidexcourier.support@gmail.com',
      color: 'bg-orange-500',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Always here to help',
      color: 'bg-orange-500',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Indio, CA 92201',
      color: 'bg-orange-500',
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Address',
      subtitle: 'Send us your inquiry anytime',
      details: 'fidexcourier.support@gmail.com',
      color: 'from-blue-100 to-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      icon: MapPin,
      title: 'Head Office',
      subtitle: 'Visit our main location',
      details: '885 E. Fawn St.\nIndio, CA 92201\nUnited States',
      color: 'from-green-100 to-green-200',
      iconColor: 'text-green-600',
    },
    {
      icon: Phone,
      title: 'Customer Support',
      subtitle: '24/7 support available',
      details: 'Monday - Sunday, All day',
      color: 'from-purple-100 to-purple-200',
      iconColor: 'text-purple-600',
    },
  ];

  const serviceAreas = [
    {
      icon: MapPin,
      title: 'Domestic Shipping',
      description: 'Comprehensive coverage across the united states with next-day delivery options.',
    },
    {
      icon: Globe,
      title: 'International',
      description: 'Global shipping network covering 120+ countries with reliable delivery times.',
    },
    {
      icon: TruckIcon,
      title: 'Express Services',
      description: 'Urgent and time-sensitive deliveries with guaranteed arrival times.',
    },
    {
      icon: Shield,
      title: 'Specialized Cargo',
      description: 'Handling of fragile, hazardous, and high-value shipments with extra care.',
    },
  ];

  const faqs = [
    {
      question: 'How do I track my shipment?',
      answer: 'You can track your shipment using our online tracking system. Simply visit our tracking page and enter your tracking number to get real-time updates on your shipment\'s location and status.',
    },
    {
      question: 'What shipping services do you offer?',
      answer: 'We offer air freight, ocean freight, road transport, warehousing, and complete supply chain management solutions.',
    },
    {
      question: 'How do I get a shipping quote?',
      answer: 'Fill out our contact form or use our pricing calculator to get an instant quote for your shipment.',
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 to-teal-700/75"></div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              <div className="space-y-3 sm:space-y-6 md:space-y-8">
                <p className="text-orange-400 font-semibold text-sm sm:text-base md:text-lg tracking-wide animate-fade-in">
                  Get In Touch
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-slide-up break-words">
                  Contact <span className="text-orange-400">Us</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto text-white/90 px-2">
                  We'd love to hear from you. Get in touch with our logistics experts today and discover how we can help your business grow.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 animate-slide-up">
                {quickContactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 hover:bg-white/20 transition-colors duration-300 border border-white/10"
                  >
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 ${info.color} rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4`}>
                      <info.icon className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1">{info.title}</h3>
                    <p className="text-xs text-gray-300 line-clamp-2">{info.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-8 sm:py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10 w-full">
              <div>
                <p className="text-orange-600 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">Contact Information</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-800 mb-3 sm:mb-4 md:mb-6 leading-tight">
                  Let's Start a <span className="text-orange-600">Conversation</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Our team of logistics experts is ready to help you find the perfect shipping solution. Get in touch and experience world-class service.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-start">
                    <div className={`w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br ${method.color} rounded-lg md:rounded-2xl flex items-center justify-center flex-shrink-0 mt-1`}>
                      <method.icon className={`${method.iconColor} w-5 h-5 sm:w-6 sm:h-6`} />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <h4 className="text-base sm:text-lg md:text-lg font-semibold text-teal-800 mb-1">{method.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{method.subtitle}</p>
                      <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-line mb-2 md:mb-3 break-words">{method.details}</p>
                      {method.title === 'Customer Support' && (
                        <a
                          href="https://wa.link/jbwyyw"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Chat on WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg md:rounded-2xl p-4 sm:p-6 md:p-8 w-full">
                <h3 className="text-lg sm:text-xl md:text-xl font-bold text-teal-800 mb-3 sm:mb-4 md:mb-6">Why Choose Fidelity Express?</h3>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      <CheckCircle className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-gray-700">Free consultation and quote</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      <CheckCircle className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-gray-700">24-hour response guarantee</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      <CheckCircle className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-gray-700">Expert logistics advice</span>
                  </div>
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      <CheckCircle className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-gray-700">Global shipping network</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg w-full">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-teal-800 mb-1 sm:mb-2">Send us a Message</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold text-teal-800 mb-1 sm:mb-2">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-xs sm:text-sm md:text-base"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold text-teal-800 mb-1 sm:mb-2">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-xs sm:text-sm md:text-base"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="w-full">
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-teal-800 mb-1 sm:mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-xs sm:text-sm md:text-base"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-teal-800 mb-1 sm:mb-2">WhatsApp Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-xs sm:text-sm md:text-base"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="w-full">
                    <label htmlFor="company" className="block text-xs sm:text-sm font-semibold text-teal-800 mb-1 sm:mb-2">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-xs sm:text-sm md:text-base"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="serviceType" className="block text-xs sm:text-sm font-semibold text-teal-800 mb-1 sm:mb-2">Service Interest</label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 text-xs sm:text-sm md:text-base"
                    >
                      <option value="">Select a service</option>
                      <option value="air_freight">Air Freight</option>
                      <option value="ocean_freight">Ocean Freight</option>
                      <option value="road_transport">Road Transport</option>
                      <option value="warehousing">Warehousing</option>
                      <option value="supply_chain">Supply Chain Management</option>
                      <option value="consultation">Free Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-teal-800 mb-1 sm:mb-2">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-vertical text-xs sm:text-sm md:text-base"
                    placeholder="Tell us about your shipping needs, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-xs sm:text-sm md:text-base rounded-lg md:rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="w-full py-8 sm:py-12 md:py-20 bg-gradient-to-br from-teal-700 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <p className="text-orange-400 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">Global Reach</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
              Our Service <span className="text-orange-400">Areas</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto px-2">
              We provide comprehensive logistics services across multiple regions and industries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {serviceAreas.map((area, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-orange-500/20 rounded-lg md:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 group-hover:bg-orange-500/30 transition-colors duration-300">
                  <area.icon className="text-orange-400 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3">{area.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed px-2">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.8376!2d-116.2165!3d33.7204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db1d7c3d7c7c7d%3A0x7c7c7c7c7c7c7c7d!2s885%20E%20Fawn%20St%2C%20Indio%2C%20CA%2092201!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
          title="Fidelity Express Location"
        />

        <div className="absolute top-3 sm:top-4 md:top-6 lg:top-8 left-3 sm:left-4 md:left-6 lg:left-8 bg-white rounded-lg md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl z-20 max-w-xs">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-teal-800 text-xs sm:text-sm md:text-lg">Visit Our Office</h3>
              </div>
            </div>
            <address className="text-gray-600 not-italic text-xs md:text-sm leading-relaxed">
              885 E. Fawn St.<br />
              Indio, CA 92201<br />
              United States
            </address>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-xs">
              <span className="flex items-center text-green-600">
                <Clock className="w-3 h-3 mr-1" />
                24/7 Support
              </span>
              <span className="flex items-center text-blue-600">
                <Phone className="w-3 h-3 mr-1" />
                Available Now
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 right-3 sm:right-4 md:right-6 lg:right-8 z-20">
          <a
            href="https://www.google.com/maps/search/?api=1&query=885+E.+Fawn+St.+Indio+CA+92201"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm md:text-base rounded-lg md:rounded-xl transition-all duration-200 shadow-lg whitespace-nowrap"
          >
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
            Get Directions
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-8 sm:py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <p className="text-orange-600 font-semibold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">Support</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-800 mb-3 sm:mb-4 md:mb-6">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              Quick answers to common questions about our logistics services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 w-full">
              {faqs.map((faq, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg md:rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <button 
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
                    className="flex justify-between items-center gap-2 w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 text-left text-teal-800 font-semibold hover:bg-gray-50 focus:outline-none transition-colors duration-200"
                  >
                    <span className="text-xs sm:text-sm md:text-base flex-1 break-words">{faq.question}</span>
                    <ChevronDown className={`text-orange-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 ${expandedFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-4 bg-gray-50 text-gray-700 border-t border-gray-200 text-xs sm:text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-lg md:rounded-2xl p-4 sm:p-6 md:p-8 text-white w-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">Quick Links</h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <a href="#track" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-white/10 rounded-lg md:rounded-xl hover:bg-white/20 transition-colors duration-200">
                  <Package className="text-orange-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Track Your Shipment</span>
                </a>
                <a href="/services" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-white/10 rounded-lg md:rounded-xl hover:bg-white/20 transition-colors duration-200">
                  <TruckIcon className="text-orange-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Our Services</span>
                </a>
                <a href="#pricing" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-white/10 rounded-lg md:rounded-xl hover:bg-white/20 transition-colors duration-200">
                  <Mail className="text-orange-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">Get Quote</span>
                </a>
                <a href="/about" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-white/10 rounded-lg md:rounded-xl hover:bg-white/20 transition-colors duration-200">
                  <Globe className="text-orange-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">About Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-8 sm:py-12 md:py-20 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 break-words">
                Ready to Ship with <span className="text-orange-400">Fidelity Express</span>?
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed px-2">
                Get started today with our comprehensive logistics solutions. Our team is ready to help you with all your shipping needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center flex-wrap">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-xs sm:text-sm md:text-base rounded-lg md:rounded-xl transition-all duration-200 transform hover:scale-105 shadow-2xl whitespace-nowrap"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get Free Quote
              </a>
              <a
                href="#track"
                className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 border-2 border-white text-white hover:bg-white hover:text-teal-800 font-semibold text-xs sm:text-sm md:text-base rounded-lg md:rounded-xl transition-all duration-200 whitespace-nowrap"
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Track Shipment
              </a>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-4 sm:pt-6 md:pt-8 border-t border-white/20 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-white/90 break-all">fidexcourier.support@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-white/90">24/7 Support Available</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-white/90">Indio, CA 92201</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
