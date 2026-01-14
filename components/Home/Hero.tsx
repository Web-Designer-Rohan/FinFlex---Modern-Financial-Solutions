import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import CountUp from '../ui/CountUp';

const headlines = [
  "Seamless Transactions",
  "Global Payments",
  "Secure Banking",
  "Digital Assets",
  "Instant Transfers"
];

export default function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    // Cycle every 3 seconds (0.8s transition + reading time)
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const currentHeadline = headlines[headlineIndex].split(" ");

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-white/95 dark:bg-brand-black/95 backdrop-blur-sm"></div>
      
      {/* Background Spinning Card - Thick & Shiny */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none -z-0">
        <div className="perspective-1000">
           <motion.div
            animate={{ rotateY: 360, rotateX: 15 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="w-72 h-44 md:w-[400px] md:h-[250px] relative preserve-3d"
           >
              {/* Back Layers for Thickness */}
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 rounded-2xl bg-gray-300 dark:bg-gray-800 border border-gray-400 dark:border-gray-700"
                  style={{ transform: `translateZ(-${(i + 1) * 2}px)` }}
                />
              ))}

              {/* Front Main Layer */}
              <div className="absolute inset-0 rounded-2xl bg-white/40 dark:bg-brand-black/40 border border-white/40 dark:border-white/20 shadow-2xl backdrop-blur-md overflow-hidden">
                 
                 {/* Shiny Reflection */}
                 <motion.div 
                    animate={{ x: ['-150%', '150%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20 pointer-events-none"
                    style={{ width: '200%' }}
                 />

                 {/* Card Elements */}
                 <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-white/20 dark:to-white/5 shadow-inner"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-white/20 dark:to-white/5 shadow-inner -ml-5"></div>
                 </div>
                 <div className="absolute top-6 right-6 w-14 h-9 rounded bg-gradient-to-r from-yellow-200 to-yellow-400/50 dark:from-yellow-500/20 dark:to-yellow-600/20 border border-yellow-500/30 z-10"></div>
                 
                 {/* Card Noise/Texture */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Animated blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-3xl animate-float -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-3xl animate-float -z-10" style={{ animationDelay: '2s' }}></div>

      {/* Main Content - Centered */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 flex flex-col items-center w-full"
        >
          <div className="space-y-6 w-full flex flex-col items-center">
            <h2 className="text-brand-primary font-bold tracking-widest text-sm uppercase">Next Gen Finance</h2>
            
            <div className="h-32 md:h-48 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                    <motion.h1 
                        key={headlineIndex}
                        className="text-6xl md:text-8xl font-black leading-tight text-gray-900 dark:text-white flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="block">{currentHeadline[0]}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-vivid to-brand-dark">
                            {currentHeadline.slice(1).join(" ")}
                        </span>
                    </motion.h1>
                </AnimatePresence>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
              Connect unlimited accounts. From PayPal to Stripe, manage your digital wealth in one unified, secure ecosystem.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="text-lg h-16 px-10">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg h-16 px-10">
              Explore Features
            </Button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex items-center gap-8 pt-12"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                 <CountUp to={10} suffix="M+" />
              </p>
              <p className="text-sm text-gray-500">Trusted Users</p>
            </div>
            <div className="w-px h-10 bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                 <CountUp to={50} prefix="$" suffix="B+" />
              </p>
              <p className="text-sm text-gray-500">Transacted</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}