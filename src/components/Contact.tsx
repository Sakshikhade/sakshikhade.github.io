import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Linkedin, Send } from 'lucide-react';
import darkMap from '../assets/dark_map.png';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! I\'ll get back to you soon.');
    reset();
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
      value: 'Tempe, AZ',
      link: '#'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/sakshikhade16',
      link: 'https://www.linkedin.com/in/sakshikhade16/'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 w-full min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Map Background for the entire section */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={darkMap} 
          alt="Tempe AZ Map" 
          className="w-full h-full object-cover filter brightness-[0.7] dark:brightness-[0.35] contrast-115 saturate-[0.8] dark:saturate-[0.5] opacity-90"
        />
        {/* Soft edge-blending gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcff] via-transparent to-[#fdfcff] dark:from-[#06020d] dark:via-transparent dark:to-[#06020d]" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl text-center my-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
            Get In Touch
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 text-left items-stretch mt-4 sm:mt-8">
            {/* Left Column (Let's Connect details on transparent glass card) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/30 dark:border-purple-500/15 shadow-lg space-y-6 bg-white/85 dark:bg-[#0c051a]/85 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  I'm always interested in discussing new opportunities, 
                  innovative projects, or simply connecting with fellow 
                  professionals in the AI and robotics field.
                </p>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3 sm:space-x-4"
                    >
                      <div className="p-2.5 bg-maroon-100/80 dark:bg-maroon-900/40 rounded-xl mr-3 border border-maroon-500/10 flex-shrink-0">
                        <Icon className="w-5 h-5 text-maroon-600 dark:text-gold-400" />
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
            </motion.div>

            {/* Right Column (Contact Form on transparent glass card) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl shadow-lg border border-white/30 dark:border-purple-500/15 bg-white/85 dark:bg-[#0c051a]/85 backdrop-blur-md flex flex-col justify-between"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm sm:text-base resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                  {errors.message && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-colors text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;