import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "Google", "SpaceX", "Microsoft", "OpenAI", "PayPal", "Payoneer", "Visa", "MasterCard", "Stripe", "Amazon Pay"
];

export default function LogoCarousel() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="py-12 bg-white dark:bg-brand-black border-y border-gray-200 dark:border-white/5 overflow-hidden"
    >
      <div className="flex w-full">
        <div className="flex animate-scroll min-w-full gap-16 px-8 items-center">
          {/* First set */}
          {logos.map((logo, i) => (
            <span key={i} className="text-2xl font-bold text-gray-400 dark:text-gray-600 whitespace-nowrap hover:text-brand-primary transition-colors cursor-default">
              {logo}
            </span>
          ))}
          {/* Second set for infinite effect */}
          {logos.map((logo, i) => (
            <span key={`dup-${i}`} className="text-2xl font-bold text-gray-400 dark:text-gray-600 whitespace-nowrap hover:text-brand-primary transition-colors cursor-default">
              {logo}
            </span>
          ))}
           {/* Third set to ensure smoothness on huge screens */}
          {logos.map((logo, i) => (
            <span key={`dup2-${i}`} className="text-2xl font-bold text-gray-400 dark:text-gray-600 whitespace-nowrap hover:text-brand-primary transition-colors cursor-default">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}