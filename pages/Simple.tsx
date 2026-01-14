import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, X, Smartphone, Zap, Link as LinkIcon, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import PricingSection from '../components/Home/Pricing';

// Comparison Component
const ComparisonRow = ({ feature, us, them }: { feature: string, us: boolean, them: boolean }) => (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-gray-100 dark:border-white/10 last:border-0">
        <div className="font-medium text-gray-700 dark:text-gray-300 flex items-center">{feature}</div>
        <div className="flex justify-center">
            {them ? <Check className="text-green-500" /> : <X className="text-red-400" />}
        </div>
        <div className="flex justify-center bg-brand-primary/5 rounded-lg">
            {us ? <Check className="text-brand-primary" strokeWidth={3} /> : <X className="text-red-400" />}
        </div>
    </div>
);

export default function Simple() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
  
  // Transform scroll progress to step index (0, 1, 2)
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
        if (latest < 0.3) setActiveStep(0);
        else if (latest < 0.6) setActiveStep(1);
        else setActiveStep(2);
    });
  }, [scrollYProgress]);

  const steps = [
      {
          title: "1. Connect",
          desc: "Link your existing bank accounts, credit cards, and digital wallets in seconds using our secure Plaid integration.",
          icon: LinkIcon,
          color: "bg-blue-500"
      },
      {
          title: "2. Automate",
          desc: "Set smart rules for savings, investments, and recurring payments. Let our AI handle the math.",
          icon: Zap,
          color: "bg-yellow-500"
      },
      {
          title: "3. Secure",
          desc: "Rest easy knowing your data is protected by military-grade AES-256 encryption and biometric locks.",
          icon: Lock,
          color: "bg-green-500"
      }
  ];

  return (
    <div className="min-h-screen pt-20">
      
      {/* SECTION 1: Minimal Hero */}
      <section className="h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-brand-black">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-primary to-brand-vivid mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-brand-primary/40 rotate-12">
                  <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-brand-black dark:text-white tracking-tighter mb-6">
                  Simply<br /><span className="text-brand-primary">Better.</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-xl mx-auto">
                  We stripped away the jargon, the paperwork, and the waiting times. 
                  This is finance, decluttered.
              </p>
          </motion.div>
      </section>

      {/* SECTION 2: Sticky Scroll Experience */}
      <div ref={scrollRef} className="h-[300vh] relative bg-gray-50 dark:bg-brand-charcoal">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
              <div className="max-w-7xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  
                  {/* Left: Phone Mockup that changes */}
                  <div className="flex justify-center md:justify-end order-2 md:order-1">
                      <motion.div 
                        layout
                        className="w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl relative overflow-hidden"
                      >
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
                          
                          {/* Screen Content - Animated Transition */}
                          <div className={`absolute inset-0 transition-colors duration-500 flex flex-col items-center justify-center p-8 ${activeStep === 0 ? 'bg-blue-600' : activeStep === 1 ? 'bg-brand-primary' : 'bg-green-600'}`}>
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ type: "spring" }}
                                    className="text-white text-9xl"
                                >
                                    {activeStep === 0 && <LinkIcon size={100} />}
                                    {activeStep === 1 && <Zap size={100} />}
                                    {activeStep === 2 && <Lock size={100} />}
                                </motion.div>
                                <h3 className="text-white font-bold text-3xl mt-8 text-center">
                                    {steps[activeStep].title.split(". ")[1]}
                                </h3>
                          </div>
                      </motion.div>
                  </div>

                  {/* Right: Text Content (Hidden on small screens, effectively handled by scroll) */}
                  <div className="hidden md:flex flex-col justify-center h-full space-y-10 order-1 md:order-2">
                      {steps.map((step, index) => (
                          <motion.div 
                            key={index}
                            animate={{ 
                                opacity: activeStep === index ? 1 : 0.2,
                                x: activeStep === index ? 0 : 20,
                                scale: activeStep === index ? 1 : 0.95
                            }}
                            className="p-8 rounded-2xl transition-all duration-500 bg-white dark:bg-brand-black shadow-lg"
                          >
                              <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center text-white mb-4`}>
                                  <step.icon />
                              </div>
                              <h3 className="text-3xl font-bold mb-2 dark:text-white">{step.title}</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                          </motion.div>
                      ))}
                  </div>

                  {/* Mobile View: Overlay Text */}
                  <div className="md:hidden absolute bottom-10 left-0 right-0 px-4">
                        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                            <h3 className="text-2xl font-bold mb-2">{steps[activeStep].title}</h3>
                            <p className="text-gray-600">{steps[activeStep].desc}</p>
                        </div>
                  </div>
              </div>
          </div>
      </div>

      {/* SECTION 3: Comparison */}
      <section className="py-24 px-4 bg-white dark:bg-brand-black">
          <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold dark:text-white">Why switch?</h2>
                  <p className="text-gray-500 mt-4">The difference is clear.</p>
              </div>

              <div className="bg-gray-50 dark:bg-brand-surface rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-white/5">
                  <div className="grid grid-cols-3 gap-4 mb-6 text-sm uppercase tracking-widest font-bold text-gray-400">
                      <div>Feature</div>
                      <div className="text-center">Traditional Banks</div>
                      <div className="text-center text-brand-primary">FinFlex</div>
                  </div>
                  
                  <ComparisonRow feature="Account Setup Time" us={true} them={false} />
                  <ComparisonRow feature="Zero Foreign Fees" us={true} them={false} />
                  <ComparisonRow feature="24/7 Support" us={true} them={false} />
                  <ComparisonRow feature="Crypto Integration" us={true} them={false} />
                  <ComparisonRow feature="Real-time Analytics" us={true} them={false} />
                  <ComparisonRow feature="API Access" us={true} them={false} />
              </div>
          </div>
      </section>

      {/* SECTION 4: Integration Marquee */}
      <section className="py-20 overflow-hidden bg-brand-charcoal text-white">
          <div className="text-center mb-10">
              <h3 className="text-xl font-bold">Works with everything you use</h3>
          </div>
          <div className="flex w-full whitespace-nowrap overflow-hidden">
             <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="flex gap-16 items-center px-4 text-2xl font-bold text-gray-500"
             >
                 {["Quickbooks", "Xero", "Slack", "Zapier", "Salesforce", "Shopify", "Stripe", "PayPal", "Wise", "Revolut", "Quickbooks", "Xero", "Slack", "Zapier", "Salesforce"].map((n, i) => (
                     <span key={i} className="hover:text-white transition-colors cursor-pointer">{n}</span>
                 ))}
             </motion.div>
          </div>
      </section>

      {/* SECTION 5: Pricing */}
      <div className="bg-white dark:bg-brand-black border-t border-gray-200 dark:border-white/10">
          <PricingSection />
      </div>

      {/* SECTION 6: Final CTA */}
      <section className="py-32 px-4 text-center">
          <h2 className="text-5xl font-black mb-8 dark:text-white">Stop overcomplicating.</h2>
          <Button size="lg" className="h-16 px-10 text-xl">Get Simple</Button>
      </section>

    </div>
  );
}