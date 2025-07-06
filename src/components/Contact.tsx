import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Linkedin, Send } from 'lucide-react';

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
      value: 'linkedin.com/in/SAKSHI-KHADE',
      link: 'https://linkedin.com/in/SAKSHI-KHADE'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Get In Touch
          </h2>
          
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  I'm always interested in discussing new opportunities, 
                  innovative projects, or simply connecting with fellow 
                  professionals in the AI and robotics field.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="p-3 bg-maroon-100 dark:bg-maroon-900 rounded-lg">
                        <Icon className="w-5 h-5 text-maroon-600 dark:text-maroon-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {item.label}
                        </p>
                        <a
                          href={item.link}
                          className="text-gray-900 dark:text-white hover:text-maroon-600 dark:hover:text-gold-400 transition-colors"
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

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
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
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Tell me about your project or just say hello!"
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
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