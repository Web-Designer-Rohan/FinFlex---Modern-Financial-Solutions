import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PricingSection from '../components/Home/Pricing';
import { Button } from '../components/ui/Button';
import { CheckCircle2, XCircle, TrendingUp, Shield, Zap, HelpCircle } from 'lucide-react';

// --- Particle Background Component ---
const ParticleField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const count = 100;
            for(let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    color: `rgba(254, 98, 29, ${Math.random() * 0.5})`
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            
            // Connect nearby particles
            for(let i = 0; i < particles.length; i++) {
                for(let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(254, 98, 29, ${0.1 * (1 - dist/100)})`;
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        createParticles();
        draw();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />;
};

// --- Components ---

const ComparisonRow = ({ label, finflex, others }: { label: string, finflex: boolean | string, others: boolean | string }) => (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-gray-100 dark:border-white/10 items-center">
        <div className="font-medium text-gray-700 dark:text-gray-300">{label}</div>
        <div className="text-center font-bold text-brand-primary">
            {typeof finflex === 'boolean' ? (finflex ? <CheckCircle2 className="inline" /> : <XCircle className="inline" />) : finflex}
        </div>
        <div className="text-center text-gray-400">
            {typeof others === 'boolean' ? (others ? <CheckCircle2 className="inline" /> : <XCircle className="inline" />) : others}
        </div>
    </div>
);

const ProConCard = ({ type, title, items }: { type: 'pro' | 'con', title: string, items: string[] }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className={`p-8 rounded-3xl border ${type === 'pro' ? 'bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/20' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10'}`}
    >
        <h3 className={`text-2xl font-bold mb-6 ${type === 'pro' ? 'text-brand-primary' : 'text-gray-500'}`}>{title}</h3>
        <ul className="space-y-4">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    {type === 'pro' ? 
                        <CheckCircle2 className="text-brand-primary shrink-0 mt-1" size={18} /> : 
                        <XCircle className="text-gray-400 shrink-0 mt-1" size={18} />
                    }
                    <span className={type === 'pro' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>{item}</span>
                </li>
            ))}
        </ul>
    </motion.div>
);

export default function Plans() {
  const scrollRef = useRef(null);
  
  return (
    <div className="min-h-screen pt-20 overflow-x-hidden bg-white dark:bg-brand-black">
      
      {/* SECTION 1: Hero with 3D Particles */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden">
          <ParticleField />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-brand-black z-0 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                  <span className="text-brand-primary font-bold tracking-widest uppercase mb-4 block">Membership</span>
                  <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
                      Invest in your <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-yellow-500">
                          Financial Future
                      </span>
                  </h1>
                  <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                      Choose a plan that scales with your ambition. Whether you're just starting out or managing a global enterprise, we have you covered.
                  </p>
              </motion.div>
          </div>
      </section>

      {/* SECTION 2: Pricing Cards */}
      <div className="bg-gray-50/50 dark:bg-brand-surface/30">
        <PricingSection />
      </div>

      {/* SECTION 3: Pros & Cons (Value Proposition) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-bold dark:text-white">Why FinFlex?</h2>
              <p className="text-gray-500 mt-4">We focus on what matters most to your wallet.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProConCard 
                type="pro" 
                title="The FinFlex Advantage" 
                items={[
                    "Real-time currency conversion at interbank rates",
                    "Instant transfers between FinFlex users globally",
                    "Dedicated IBANs in 30+ currencies",
                    "Crypto and Stock trading in one app",
                    "24/7 Priority human support"
                ]} 
              />
              <ProConCard 
                type="con" 
                title="Traditional Banks" 
                items={[
                    "Hidden FX fees and markups on exchange rates",
                    "3-5 business days for international wires",
                    "Limited to single currency accounts",
                    "Separate apps for banking and investing",
                    "Long wait times and automated phone trees"
                ]} 
              />
          </div>
      </section>

      {/* SECTION 4: Competitor Comparison */}
      <section className="py-24 px-4 bg-brand-charcoal text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <div className="max-w-4xl mx-auto relative z-10">
               <div className="text-center mb-16">
                   <h2 className="text-4xl font-bold">Market Comparison</h2>
                   <p className="text-gray-400 mt-4">See how we stack up against the competition.</p>
               </div>

               <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                   <div className="grid grid-cols-3 gap-4 mb-6 text-sm uppercase tracking-widest font-bold text-gray-500 border-b border-white/10 pb-4">
                       <div>Feature</div>
                       <div className="text-center text-brand-primary">FinFlex</div>
                       <div className="text-center">Competitors</div>
                   </div>
                   
                   <ComparisonRow label="Monthly Fee (Standard)" finflex="$0" others="$10+" />
                   <ComparisonRow label="International Transfer Fee" finflex="0.4%" others="2-5%" />
                   <ComparisonRow label="ATM Withdrawals" finflex="Free up to $1k" others="$3-5 fee" />
                   <ComparisonRow label="Crypto Fees" finflex="1.5%" others="2.5%+" />
                   <ComparisonRow label="Virtual Cards" finflex="Unlimited" others="Limited" />
               </div>
           </div>
      </section>

      {/* SECTION 5: Enterprise / FAQ */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1 space-y-6">
                   <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                       <HelpCircle size={32} />
                   </div>
                   <h2 className="text-4xl font-bold dark:text-white">Still have questions?</h2>
                   <p className="text-gray-500 text-lg">
                       Our enterprise team is ready to build a custom solution for your specific needs. From API integrations to white-labeling.
                   </p>
                   <Button size="lg" variant="outline">Schedule a Call</Button>
               </div>
               
               <div className="flex-1 grid gap-6">
                   {[
                       { q: "Can I cancel anytime?", a: "Yes, you can downgrade or cancel your plan at any time with no penalty." },
                       { q: "Is my money safe?", a: "Your funds are safeguarded in regulated bank accounts and protected by 256-bit encryption." },
                       { q: "Do you offer business accounts?", a: "Absolutely. Our Teams and Organization plans are designed specifically for businesses." }
                   ].map((item, i) => (
                       <div key={i} className="bg-gray-50 dark:bg-brand-surface p-6 rounded-xl border border-gray-100 dark:border-white/5">
                           <h4 className="font-bold dark:text-white mb-2">{item.q}</h4>
                           <p className="text-gray-500 text-sm">{item.a}</p>
                       </div>
                   ))}
               </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-brand-primary text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to start?</h2>
          <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100">Create Free Account</Button>
      </section>

    </div>
  );
}