import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Linkedin, Send, Navigation, Maximize2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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
      link: 'https://www.linkedin.com/in/sakshikhade16/',
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12 lg:mb-16">
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
              {/* Background Map */}
              <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Map Background Gradient - Reduced for more map visibility */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                                     radial-gradient(circle at 70% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`,
                  }}
                />
                
                {/* Google Maps Iframe - More prominent */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.167076837946!2d-111.95220892535325!3d33.40701499996741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b09b64faa251d%3A0x5c32eba7135bd1e8!2s711%20W%20Broadway%20Rd%2C%20Tempe%2C%20AZ%2085282!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="711 W Broadway Rd, Tempe, AZ 85282"
                  className="absolute inset-0 opacity-90"
                />
                
                {/* Overlay Content - Lighter overlay for map prominence */}
                <div className={`absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-500 ${
                  mapExpanded ? 'bg-black bg-opacity-10' : 'bg-black bg-opacity-20'
                }`}>
                  {/* Carousel Navigation */}
                  {!mapExpanded && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-full shadow-2xl hover:shadow-3xl transition-all backdrop-blur-md bg-opacity-90 border border-white border-opacity-30"
                        aria-label="Previous contact info"
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-full shadow-2xl hover:shadow-3xl transition-all backdrop-blur-md bg-opacity-90 border border-white border-opacity-30"
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
                    className={`w-full max-w-7xl transition-all duration-500 ${
                      mapExpanded ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 pointer-events-auto scale-100'
                    }`}
                    onMouseEnter={() => setIsAutoPlay(false)}
                    onMouseLeave={() => setIsAutoPlay(true)}
                  >
                    <div className="overflow-hidden mx-4 sm:mx-8 md:mx-12 lg:mx-16">
                      <AnimatePresence mode="wait">
                        {currentSlide === 0 ? (
                          /* Contact Information Card */
                          <motion.div
                            key="contact-info"
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-85 dark:bg-opacity-85 border border-white border-opacity-20 max-w-2xl mx-auto"
                          >
                            <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                              <div>
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4">
                                  Let's Connect
                                </h3>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                  I'm always interested in discussing new opportunities, 
                                  innovative projects, or simply connecting with fellow 
                                  professionals in the AI and robotics field.
                                </p>
                              </div>
                              
                              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                                {contactInfo.map((item, index) => {
                                  const Icon = item.icon;
                                  return (
                                    <motion.div
                                      key={item.label}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.6, delay: index * 0.1 }}
                                      className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4"
                                    >
                                      <div className="p-1.5 sm:p-2 lg:p-3 bg-maroon-100 dark:bg-maroon-900 rounded-lg flex-shrink-0">
                                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-maroon-600 dark:text-maroon-300" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                                          {item.label}
                                        </p>
                                        <a
                                          href={item.link}
                                          className="text-xs sm:text-sm lg:text-base text-gray-900 dark:text-white hover:text-maroon-600 dark:hover:text-gold-400 transition-colors break-words"
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
                              <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:pt-4">
                                <button
                                  onClick={handleGetDirections}
                                  className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
                                >
                                  <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span>Get Directions</span>
                                </button>
                                <button
                                  onClick={handleViewOnMaps}
                                  className="flex items-center justify-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm font-medium"
                                >
                                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span>View on Maps</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          /* Contact Form Card */
                          <motion.div
                            key="contact-form"
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-900 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-85 dark:bg-opacity-85 border border-white border-opacity-20 max-w-2xl mx-auto"
                          >
                            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                              <div>
                                <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="from_name"
                                  {...register('name', { required: 'Name is required' })}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 text-gray-900 dark:text-white backdrop-blur-sm"
                                  placeholder="Your name"
                                />
                                {errors.name && (
                                  <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">
                                    {errors.name.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="reply_to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 text-gray-900 dark:text-white backdrop-blur-sm"
                                  placeholder="your.email@example.com"
                                />
                                {errors.email && (
                                  <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">
                                    {errors.email.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Message
                                </label>
                                <textarea
                                  id="message"
                                  rows={4}
                                  {...register('message', { required: 'Message is required' })}
                                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 text-gray-900 dark:text-white resize-none backdrop-blur-sm"
                                  placeholder="Tell me about your project or just say hello!"
                                />
                                {errors.message && (
                                  <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">
                                    {errors.message.message}
                                  </p>
                                )}
                              </div>

                              <button
                                type="submit"
                                disabled={emailStatus === 'Sending...'}
                                className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>{emailStatus === 'Sending...' ? 'Sending...' : 'Send Message'}</span>
                              </button>

                              {emailStatus && emailStatus !== 'Sending...' && (
                                <div className="text-center">
                                  <p className={`text-sm ${
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
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentSlide
                                ? 'bg-maroon-600 dark:bg-gold-400'
                                : 'bg-white dark:bg-gray-600 bg-opacity-50'
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
                    className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-xl shadow-2xl hover:shadow-3xl transition-all backdrop-blur-md bg-opacity-90 border border-white border-opacity-30"
                    title={mapExpanded ? "Show Contact Details" : "Focus on Map"}
                  >
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                
                {/* Location Info Badge - Enhanced styling */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-2xl backdrop-blur-md bg-opacity-90 border border-white border-opacity-30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1.5 sm:p-2 bg-maroon-100 dark:bg-maroon-900 rounded-lg">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-600 dark:text-maroon-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">711 W Broadway Rd</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Tempe, AZ 85282</p>
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