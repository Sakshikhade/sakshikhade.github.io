import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Linkedin, Send, Navigation, Maximize2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import darkMap from '../assets/dark_map.png';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true });
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [mapExpanded, setMapExpanded] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play functionality for carousel
  React.useEffect(() => {
    if (!isAutoPlay || mapExpanded) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2); // Toggle between 0 and 1
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, mapExpanded]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2);
  };

  const onSubmit = async (data: FormData) => {
    if (!formRef.current) return;
    
    setEmailStatus('Sending...');
    console.log('Form data:', data); // Use the data parameter
    
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );
      setEmailStatus('✅ Message sent successfully!');
      reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setEmailStatus('❌ Failed to send message. Please try again.');
    }
    
    // Clear status after 5 seconds
    setTimeout(() => setEmailStatus(''), 5000);
  };

  const handleGetDirections = () => {
    const destination = "711 W Broadway Rd, Tempe, AZ 85282";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  };

  const handleViewOnMaps = () => {
    const location = "711 W Broadway Rd, Tempe, AZ 85282";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'skhade5@asu.edu',
      link: 'mailto:skhade5@asu.edu'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (480) 919-5150',
      link: 'tel:+14809195150'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: '711 W Broadway Rd, Tempe, AZ',
      link: 'https://www.google.com/maps/dir//711+W+Broadway+Rd,+Tempe,+AZ+85282/@33.4069878,-112.0318225,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x872b09b64faa251d:0x5c32eba7135bd1e8!2m2!1d-111.9494213!2d33.407015?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/sakshikhade16/',
      link: 'https://www.linkedin.com/in/sakshikhade16/'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 w-full min-h-screen flex flex-col justify-center relative overflow-hidden bg-white dark:bg-[#06020d]">
      {/* Soft edge-blending gradients */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-[#06020d] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-[#06020d] to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 lg:mb-16">
            Get In Touch
          </h2>
          
          <div className="max-w-7xl mx-auto">
            {/* Map with Overlay Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Background Map Frame */}
              <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-purple-500/10">
                {/* Custom dark theme map image */}
                <img 
                  src={darkMap} 
                  alt="Tempe AZ Map" 
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] dark:brightness-[0.4] contrast-[1.1] saturate-[0.8] dark:saturate-[0.6] opacity-90 select-none pointer-events-none"
                />
                
                {/* Soft gradient map overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcff]/40 via-transparent to-[#fdfcff]/40 dark:from-[#06020d]/40 dark:via-transparent dark:to-[#06020d]/40 select-none pointer-events-none" />
                
                {/* Overlay Content */}
                <div className={`absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-500 ${
                  mapExpanded ? 'bg-black/10' : 'bg-black/25'
                }`}>
                  {/* Carousel Navigation */}
                  {!mapExpanded && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-2xl hover:shadow-3xl transition-all backdrop-blur-md border border-white/30 hover:scale-105"
                        aria-label="Previous contact info"
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-2xl hover:shadow-3xl transition-all backdrop-blur-md border border-white/30 hover:scale-105"
                        aria-label="Next contact info"
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                    </>
                  )}

                  {/* Carousel Container */}
                  <div 
                    className={`w-full max-w-2xl transition-all duration-500 ${
                      mapExpanded ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 pointer-events-auto scale-100'
                    }`}
                    onMouseEnter={() => setIsAutoPlay(false)}
                    onMouseLeave={() => setIsAutoPlay(true)}
                  >
                    <div className="overflow-hidden mx-4 sm:mx-8 md:mx-12">
                      <AnimatePresence mode="wait">
                        {currentSlide === 0 ? (
                          /* Contact Information Card */
                          <motion.div
                            key="contact-info"
                            initial={{ opacity: 0, x: 150 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -150 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/90 dark:bg-[#0c051a]/90 p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-white/30 dark:border-purple-500/15 max-w-xl mx-auto text-left"
                          >
                            <div className="space-y-4 md:space-y-6">
                              <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                                  Let's Connect
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                  I'm always interested in discussing new opportunities, 
                                  innovative projects, or simply connecting with fellow 
                                  professionals in the AI and robotics field.
                                </p>
                              </div>
                              
                              <div className="space-y-3 sm:space-y-4">
                                {contactInfo.map((item, index) => {
                                  const Icon = item.icon;
                                  return (
                                    <motion.div
                                      key={item.label}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.4, delay: index * 0.05 }}
                                      className="flex items-center space-x-3 sm:space-x-4"
                                    >
                                      <div className="p-2 bg-maroon-100/80 dark:bg-maroon-900/40 rounded-xl mr-1 border border-maroon-500/10 flex-shrink-0">
                                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-600 dark:text-gold-400" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                          {item.label}
                                        </p>
                                        <a
                                          href={item.link}
                                          className="text-gray-900 dark:text-white hover:text-maroon-600 dark:hover:text-gold-400 transition-colors text-sm sm:text-base font-semibold break-all"
                                          target={item.link.startsWith('http') ? '_blank' : undefined}
                                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                          {item.value}
                                        </a>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                              
                              {/* Map Action Buttons */}
                              <div className="flex flex-wrap gap-3 pt-2">
                                <button
                                  onClick={handleGetDirections}
                                  className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-maroon-600 text-white rounded-xl hover:bg-maroon-700 transition-all text-xs sm:text-sm font-semibold shadow-lg hover:shadow-maroon-600/20"
                                >
                                  <Navigation className="w-3.5 h-3.5" />
                                  <span>Get Directions</span>
                                </button>
                                <button
                                  onClick={handleViewOnMaps}
                                  className="flex items-center justify-center space-x-2 px-4 py-2.5 border-2 border-maroon-600 text-maroon-600 dark:text-gold-400 dark:border-gold-400 rounded-xl hover:bg-maroon-600 hover:text-white dark:hover:bg-gold-400 dark:hover:text-gray-900 transition-all text-xs sm:text-sm font-semibold"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>View on Maps</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          /* Contact Form Card */
                          <motion.div
                            key="contact-form"
                            initial={{ opacity: 0, x: 150 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -150 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/90 dark:bg-[#0c051a]/90 p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-white/30 dark:border-purple-500/15 max-w-xl mx-auto text-left"
                          >
                            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div>
                                <label htmlFor="from_name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="from_name"
                                  {...register('name', { required: 'Name is required' })}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                                  placeholder="Your name"
                                />
                                {errors.name && (
                                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.name.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="reply_to" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  id="reply_to"
                                  {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: 'Invalid email address'
                                    }
                                  })}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                                  placeholder="your.email@example.com"
                                />
                                {errors.email && (
                                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.email.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="message" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                                  Message
                                </label>
                                <textarea
                                  id="message"
                                  rows={3}
                                  {...register('message', { required: 'Message is required' })}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none"
                                  placeholder="Tell me about your project or just say hello!"
                                />
                                {errors.message && (
                                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                    {errors.message.message}
                                  </p>
                                )}
                              </div>

                              <button
                                type="submit"
                                disabled={emailStatus === 'Sending...'}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold shadow-lg hover:shadow-maroon-600/20"
                              >
                                <Send className="w-4 h-4" />
                                <span>{emailStatus === 'Sending...' ? 'Sending...' : 'Send Message'}</span>
                              </button>

                              {emailStatus && emailStatus !== 'Sending...' && (
                                <div className="text-center mt-2">
                                  <p className={`text-xs font-semibold ${
                                    emailStatus.includes('✅') 
                                      ? 'text-green-600 dark:text-green-400' 
                                      : 'text-red-600 dark:text-red-400'
                                  }`}>
                                    {emailStatus}
                                  </p>
                                </div>
                              )}
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Dots Indicator */}
                    {!mapExpanded && (
                      <div className="flex justify-center mt-6 space-x-2">
                        {[0, 1].map((index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentSlide
                                ? 'bg-maroon-600 dark:bg-gold-400 w-4'
                                : 'bg-white/50 dark:bg-gray-600/50'
                            }`}
                            aria-label={`Go to ${index === 0 ? 'contact info' : 'contact form'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Map Expand Button - Enhanced styling */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
                  <button
                    onClick={() => setMapExpanded(!mapExpanded)}
                    className="p-2 sm:p-2.5 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-2xl hover:shadow-3xl transition-all backdrop-blur-md border border-white/30 hover:scale-105"
                    title={mapExpanded ? "Show Contact Details" : "Focus on Map"}
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                
                {/* Location Info Badge - Enhanced styling */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 bg-white/90 dark:bg-gray-800/90 p-3 sm:p-3.5 rounded-xl shadow-2xl backdrop-blur-md border border-white/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1.5 sm:p-2 bg-maroon-100 dark:bg-maroon-900 rounded-lg">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-600 dark:text-maroon-300" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">711 W Broadway Rd</h4>
                      <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300">Tempe, AZ 85282</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;