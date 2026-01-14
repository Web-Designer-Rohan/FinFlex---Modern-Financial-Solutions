import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, User } from 'lucide-react';

const testimonials = [
  {
    text: "FinFlex completely revolutionized how I manage my freelance income across Wise and PayPal. The conversion rates are unbeatable.",
    author: "Sarah Jenkins",
    role: "Digital Nomad"
  },
  {
    text: "The security features gave me peace of mind. Connecting my Amex and Crypto wallets in one dashboard is a game changer.",
    author: "Michael Chen",
    role: "Tech Entrepreneur"
  },
  {
    text: "I was skeptical at first, but the 'Teams' plan saved my small business thousands in international transaction fees.",
    author: "Elena Rodriguez",
    role: "CEO, StartUp Inc"
  },
  {
    text: "Finally, a dashboard that actually understands multi-currency cash flow. I can track my investments in real-time.",
    author: "David Kim",
    role: "Investment Analyst"
  },
  {
    text: "The API integration is flawless. We connected our internal billing system in less than a day.",
    author: "Jessica T.",
    role: "CTO, FinTech Sol"
  },
  {
    text: "Customer support is top-notch. They resolved my verification issue within minutes, not days.",
    author: "Ahmed Hassan",
    role: "E-commerce Seller"
  },
  {
    text: "I love the mobile app. Managing expenses on the go has never been smoother or looked better.",
    author: "Maria Garcia",
    role: "Travel Blogger"
  },
  {
    text: "The transparency in pricing is refreshing. No hidden fees, just great service.",
    author: "Robert Stone",
    role: "Small Business Owner"
  },
  {
    text: "Switching to FinFlex was the best financial decision I made this year. Highly recommended.",
    author: "Emily Clark",
    role: "Freelance Designer"
  },
  {
    text: "Secure, fast, and reliable. Exactly what I need for my international transactions.",
    author: "Tom Baker",
    role: "Global Consultant"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Increased interval to 8 seconds for better readability
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-brand-charcoal">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
       
       <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-brand-primary font-bold tracking-widest text-sm uppercase mb-4">Testimonials</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-16">What our users say</h1>
          </motion.div>
          
          <div className="relative h-80 flex items-center justify-center">
            {/* Hovering Quadrilateral Container - Slowed down animation */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0], // Reduced movement range
                rotate: [0.5, -0.5, 0.5] // Reduced rotation range
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10, // Increased duration for slower swing
                ease: "easeInOut" 
              }}
              className="w-full max-w-2xl transform -skew-x-2 bg-gradient-to-br from-brand-surface to-black border border-brand-primary/30 p-10 rounded-3xl shadow-[0_0_50px_-12px_rgba(253,82,0,0.3)]"
            >
              {/* Reset skew for content */}
              <div className="transform skew-x-2 h-full flex flex-col justify-center">
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                  >
                    <Quote className="text-brand-primary w-12 h-12 mb-2 opacity-50" />
                    <p className="text-xl md:text-2xl text-gray-200 font-light italic leading-relaxed">
                      "{testimonials[index].text}"
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                        <User />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white">{testimonials[index].author}</h4>
                        <p className="text-sm text-brand-primary">{testimonials[index].role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-10 flex-wrap px-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-brand-primary w-8' : 'bg-gray-600 w-2 hover:bg-gray-500'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
       </div>
    </section>
  );
}