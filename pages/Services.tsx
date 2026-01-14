import React, { useRef } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { Button } from '../components/ui/Button';
import PricingSection from '../components/Home/Pricing';
import { ArrowRight, Globe, TrendingUp, ShieldCheck, CreditCard, Building2, Code } from 'lucide-react';
import Spotlight from '../components/ui/Spotlight';

// --- Components ---

// 2. Service Card with Tilt
interface ServiceCardProps {
  title: string;
  desc: string;
  icon: any;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, icon: Icon, index }) => {
  return (
    <Spotlight className="h-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-surface p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-brand-primary transition-colors">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">{desc}</p>
        <div className="mt-6 flex items-center text-brand-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
          Learn more <ArrowRight size={16} className="ml-2" />
        </div>
      </motion.div>
    </Spotlight>
  );
};

// 3. 3D Floating Object (Phone/Card representation)
const InteractiveObject = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-300, 300], [15, -15]);
    const rotateY = useTransform(x, [-300, 300], [-15, 15]);

    const handleMouseMove = (event: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set(event.clientX - centerX);
            y.set(event.clientY - centerY);
        }
    };

    return (
        <div 
            ref={ref} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="w-full h-[400px] flex items-center justify-center perspective-1000 cursor-grab active:cursor-grabbing"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-64 h-96 rounded-[2.5rem] bg-gray-900 border-[8px] border-gray-800 shadow-2xl relative"
            >
                {/* Screen content */}
                <div className="absolute inset-0 bg-brand-black rounded-[2rem] overflow-hidden flex flex-col">
                     <div className="h-full w-full bg-gradient-to-br from-brand-charcoal to-brand-black p-6 relative">
                        {/* Abstract UI Elements */}
                        <div className="w-full h-8 flex justify-between items-center mb-8">
                            <div className="w-12 h-3 bg-gray-700 rounded-full"></div>
                            <div className="w-4 h-4 rounded-full bg-brand-primary"></div>
                        </div>
                        <div className="text-white text-3xl font-bold mb-2">$124,500.00</div>
                        <div className="text-brand-teal text-sm mb-8">+2.4% today</div>
                        
                        <div className="space-y-4">
                             {[1,2,3].map(i => (
                                 <div key={i} className="h-14 w-full bg-white/5 rounded-xl flex items-center px-4 gap-3">
                                     <div className="w-8 h-8 rounded-full bg-brand-primary/20"></div>
                                     <div className="flex-1 h-2 bg-gray-700 rounded-full"></div>
                                 </div>
                             ))}
                        </div>

                        {/* Floating Element off screen */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="absolute bottom-6 right-6 w-12 h-12 bg-brand-primary rounded-full shadow-[0_0_20px_rgba(254,98,29,0.5)] flex items-center justify-center text-white"
                        >
                            <ArrowRight />
                        </motion.div>
                     </div>
                </div>
            </motion.div>
        </div>
    )
}

// --- Main Page Component ---

export default function Services() {
  const containerRef = useRef(null);

  const services = [
    { title: "Digital Banking", desc: "Borderless accounts with IBANs in 30+ countries. Hold, convert, and spend instantly.", icon: Globe },
    { title: "Wealth Management", desc: "AI-driven portfolio balancing for stocks, crypto, and commodities.", icon: TrendingUp },
    { title: "Enterprise Payroll", desc: "Automate payouts to contractors and employees worldwide in their local currency.", icon: Building2 },
    { title: "Card Issuance", desc: "Issue virtual and physical cards for your team with custom spending limits.", icon: CreditCard },
    { title: "API Solutions", desc: "Integrate our banking infrastructure directly into your product with few lines of code.", icon: Code },
    { title: "Escrow Services", desc: "Secure high-value transactions with conditional release logic.", icon: ShieldCheck },
  ];

  return (
    <div ref={containerRef} className="min-h-screen pt-20 bg-gray-50 dark:bg-brand-black overflow-x-hidden">
      
      {/* SECTION 1: Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
         {/* Animated Background Mesh */}
         <div className="absolute inset-0 opacity-30 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-primary/20 to-purple-500/20 rounded-full blur-[100px] animate-pulse" />
         </div>

         <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-brand-primary font-bold tracking-widest text-sm uppercase bg-brand-primary/10 px-4 py-2 rounded-full border border-brand-primary/20">
                    Our Expertise
                </span>
            </motion.div>
            
            <motion.h1 
                className="text-5xl md:text-7xl font-black text-brand-black dark:text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                We bridge the gap <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-orange-500 to-yellow-500">
                    Physical & Digital
                </span>
            </motion.h1>
            
            <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Comprehensive financial infrastructure for the modern internet economy. 
                Scalable, secure, and developer-friendly.
            </motion.p>
         </div>
      </section>

      {/* SECTION 2: Service Grid with Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
                <ServiceCard key={i} {...s} index={i} />
            ))}
         </div>
      </section>

      {/* SECTION 3: Split Feature with 3D Interaction */}
      <section className="py-32 bg-white dark:bg-brand-surface border-y border-gray-100 dark:border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  {/* Left: Text */}
                  <div className="flex-1 space-y-8">
                      <h2 className="text-4xl md:text-5xl font-bold dark:text-white">
                          Your entire financial life, <br/>
                          <span className="text-brand-primary">in your pocket.</span>
                      </h2>
                      <p className="text-lg text-gray-500 dark:text-gray-400">
                          Experience the tactile feel of our mobile interface. Interact with the device to see how we blend form and function.
                      </p>
                      <ul className="space-y-4">
                          {['Real-time notifications', 'Biometric authorization', 'One-tap freeze'].map((item, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center gap-3 text-lg font-medium dark:text-white"
                              >
                                  <div className="w-2 h-2 rounded-full bg-brand-primary" />
                                  {item}
                              </motion.li>
                          ))}
                      </ul>
                      <Button size="lg">Download App</Button>
                  </div>

                  {/* Right: 3D Interactive Element */}
                  <div className="flex-1 w-full flex justify-center">
                      <InteractiveObject />
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION 4: Horizontal Process / Stats */}
      <section className="py-24 bg-brand-black text-white relative overflow-hidden">
           {/* Background noise */}
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
           
           <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="text-center mb-16">
                   <h2 className="text-3xl font-bold mb-4">By the numbers</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {[
                        { label: "Transactions", val: "2B+" },
                        { label: "Uptime", val: "99.99%" },
                        { label: "Countries", val: "140+" },
                        { label: "Currencies", val: "30+" }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                            className="p-4"
                        >
                            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2">
                                {stat.val}
                            </div>
                            <div className="text-gray-400 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
                        </motion.div>
                    ))}
               </div>
           </div>
      </section>

      {/* SECTION 5: Pricing */}
      <div className="bg-gray-50/30 dark:bg-black/20">
         <PricingSection />
      </div>

      {/* SECTION 6: CTA */}
      <section className="py-32 px-4 text-center bg-gray-50 dark:bg-brand-black relative">
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold dark:text-white">
                  Ready to upgrade?
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                  Join thousands of businesses and individuals who have already made the switch to FinFlex.
              </p>
              <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  <Button size="lg" className="h-16 px-12 text-xl shadow-[0_20px_50px_-10px_rgba(254,98,29,0.3)]">
                      Create Free Account
                  </Button>
              </motion.div>
          </div>
          
          {/* Decorative gradients */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none" />
      </section>

    </div>
  );
}