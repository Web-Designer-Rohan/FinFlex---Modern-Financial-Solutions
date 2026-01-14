import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Button } from '../components/ui/Button';
import PricingSection from '../components/Home/Pricing';
import { Shield, Zap, Globe, Wallet, PieChart, Lock, ArrowRight, Check, Activity, Smartphone } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
      className="bg-white dark:bg-brand-surface p-8 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 group perspective-1000"
    >
      <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const ComparisonRow = ({ feature, tiers }: { feature: string, tiers: boolean[] }) => (
  <div className="grid grid-cols-5 gap-4 py-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors px-4 rounded-lg">
    <div className="col-span-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
      {feature}
    </div>
    {tiers.map((hasIt, i) => (
      <div key={i} className="flex justify-center text-brand-primary">
        {hasIt ? <Check size={18} strokeWidth={3} /> : <span className="text-gray-300 dark:text-gray-700">-</span>}
      </div>
    ))}
  </div>
);

// Floating Image Component
const FloatingImage = ({ src, className, speed = 1 }: { src: string, className?: string, speed?: number }) => {
    return (
        <motion.div 
            className={`absolute rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 ${className}`}
            animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
            }}
            transition={{ 
                repeat: Infinity, 
                duration: 5 / speed,
                ease: "easeInOut"
            }}
        >
            <img src={src} alt="Decoration" className="w-full h-full object-cover" />
        </motion.div>
    )
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 30 });
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 30 });


  return (
    <div ref={containerRef} className="min-h-screen pt-24 overflow-hidden" onMouseMove={handleMouseMove}>
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute top-20 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
         <motion.div style={{ x: useTransform(parallaxX, v => -v), y: useTransform(parallaxY, v => -v) }} className="absolute bottom-20 right-10 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl" />
      </div>

      {/* SECTION 1: Hero with Image */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
         <div className="relative rounded-[2.5rem] overflow-hidden border-[8px] border-brand-charcoal/5 dark:border-white/10 shadow-2xl group">
            {/* The Image */}
            <motion.div 
                className="relative aspect-video w-full overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
            >
                <img 
                    src="https://i.ibb.co/PvV4xBbh/1000503950.png" 
                    alt="FinFlex Dashboard" 
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:bg-black/50" />
            </motion.div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.2, duration: 1 }}
                            className="inline-block"
                        >
                            Complete Control
                        </motion.span>
                        <br />
                        <motion.span 
                            className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-cyan"
                            animate={{ backgroundPosition: ['0% center', '100% center'] }}
                            transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                        >
                             Over Your Assets
                        </motion.span>
                    </h1>
                    <p className="text-lg text-gray-200 max-w-xl mx-auto">
                        Experience the dashboard that powers thousands of global businesses. Real-time analytics, instant transfers, and zero friction.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Button size="lg" className="border-2 border-white/20 backdrop-blur-md">Start Free Trial</Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">Watch Demo</Button>
                    </div>
                </motion.div>
            </div>
         </div>

         {/* Floating Decoration Squares */}
         <FloatingImage src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200" className="w-20 h-20 top-10 -left-4 md:left-10 z-20" speed={1.2} />
         <FloatingImage src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200" className="w-16 h-16 bottom-20 -right-2 md:right-10 z-20" speed={0.8} />
      </section>

      {/* SECTION 2: Popular Features Grid */}
      <section className="py-20 bg-gray-50/50 dark:bg-brand-black/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
              >
                  <h2 className="text-brand-primary font-bold tracking-widest text-sm uppercase mb-3">Core Capabilities</h2>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Everything you need to scale</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FeatureCard 
                      icon={Globe} 
                      title="Global Accounts" 
                      description="Open local accounts in 10 currencies. Receive money like a local, no matter where you are."
                      delay={0}
                  />
                  <FeatureCard 
                      icon={Shield} 
                      title="Bank-Grade Security" 
                      description="AES-256 encryption and biometric authentication ensure your assets are always protected."
                      delay={0.1}
                  />
                  <FeatureCard 
                      icon={Zap} 
                      title="Instant Transfers" 
                      description="Move money between accounts in seconds, not days. Zero fees for internal transfers."
                      delay={0.2}
                  />
                  <FeatureCard 
                      icon={PieChart} 
                      title="Smart Analytics" 
                      description="Visualize your spending habits with AI-powered insights and forecasting tools."
                      delay={0.3}
                  />
                   <FeatureCard 
                      icon={Wallet} 
                      title="Multi-Asset Wallet" 
                      description="Hold Fiat, Crypto, and Commodities in a single unified dashboard."
                      delay={0.4}
                  />
                  <FeatureCard 
                      icon={Smartphone} 
                      title="Mobile First" 
                      description="Manage everything from your phone with our award-winning iOS and Android apps."
                      delay={0.5}
                  />
              </div>
          </div>
      </section>

      {/* SECTION 3: Feature Breakdown */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bg-white dark:bg-brand-surface rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/5"
        >
            <div className="p-8 md:p-12 text-center border-b border-gray-100 dark:border-white/5 bg-gradient-to-b from-brand-primary/5 to-transparent">
                <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
                <p className="text-gray-500">Find the perfect fit for your financial needs.</p>
            </div>
            
            <div className="p-6 md:p-8">
                {/* Header Row */}
                <div className="grid grid-cols-5 gap-4 mb-6 px-4">
                    <div className="col-span-2"></div>
                    <div className="text-center font-bold text-gray-900 dark:text-white">Basic</div>
                    <div className="text-center font-bold text-brand-primary">Pro</div>
                    <div className="text-center font-bold text-gray-900 dark:text-white">Elite</div>
                </div>

                <div className="space-y-1">
                    <ComparisonRow feature="International Transfers" tiers={[true, true, true]} />
                    <ComparisonRow feature="Virtual Cards" tiers={[true, true, true]} />
                    <ComparisonRow feature="Crypto Trading" tiers={[false, true, true]} />
                    <ComparisonRow feature="Priority Support" tiers={[false, true, true]} />
                    <ComparisonRow feature="Metal Card" tiers={[false, false, true]} />
                    <ComparisonRow feature="Concierge Service" tiers={[false, false, true]} />
                    <ComparisonRow feature="API Access" tiers={[false, true, true]} />
                    <ComparisonRow feature="Team Seats" tiers={[false, true, true]} />
                    <ComparisonRow feature="Custom Limits" tiers={[false, false, true]} />
                </div>
            </div>
        </motion.div>
      </section>

      {/* SECTION 4: Pricing */}
      <div className="bg-gray-50/30 dark:bg-black/20">
         <PricingSection />
      </div>

    </div>
  );
}