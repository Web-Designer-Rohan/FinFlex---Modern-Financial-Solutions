import React from 'react';
import { motion } from 'framer-motion';
import CircularText from '../components/ui/CircularText';
import CountUp from '../components/ui/CountUp';
import TiltedCard from '../components/ui/TiltedCard';
import PricingSection from '../components/Home/Pricing';
import Spotlight from '../components/ui/Spotlight';
import { Button } from '../components/ui/Button';
import { Users, Target, Heart, Award } from 'lucide-react';

const TeamMember = ({ name, role, image, delay }: { name: string, role: string, image: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
    >
        <TiltedCard 
            containerHeight="400px" 
            captionText={role}
            rotateAmplitude={10}
            scaleOnHover={1.05}
        >
            <div className="h-full w-full rounded-2xl overflow-hidden relative group">
                <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white">{name}</h3>
                    <p className="text-brand-primary font-medium">{role}</p>
                </div>
            </div>
        </TiltedCard>
    </motion.div>
);

const ValueCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <Spotlight className="bg-white dark:bg-brand-surface p-8 rounded-2xl border border-gray-100 dark:border-white/10 h-full">
        <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-4">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{desc}</p>
    </Spotlight>
);

export default function About() {
  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      
      {/* SECTION 1: Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-brand-black text-white">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
         <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 to-brand-black" />
         
         <div className="relative z-10 flex flex-col items-center text-center px-4">
            <CircularText 
                text="FINFLEX • INNOVATION • TRUST • FUTURE • " 
                spinDuration={15} 
                className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] text-brand-primary opacity-50 mb-10"
            />
            
            <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-9xl font-black tracking-tighter mix-blend-overlay"
            >
                BUILDERS
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-300 max-w-2xl mt-4"
            >
                We are architecting the financial rails for the next generation of the internet.
            </motion.p>
         </div>
      </section>

      {/* SECTION 2: Values */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-brand-charcoal">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Our DNA</span>
                  <h2 className="text-4xl font-bold mt-2 dark:text-white">What drives us forward</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ValueCard 
                    icon={Target} 
                    title="Radical Transparency" 
                    desc="We believe in open banking, open source, and open communication. No hidden fees, ever." 
                  />
                  <ValueCard 
                    icon={Heart} 
                    title="User Obsession" 
                    desc="Every pixel, every line of code is crafted with the end-user in mind. Simplicity is our religion." 
                  />
                  <ValueCard 
                    icon={Award} 
                    title="Excellence Always" 
                    desc="We don't cut corners. We build robust, scalable systems that can handle the weight of the world." 
                  />
              </div>
          </div>
      </section>

      {/* SECTION 3: Team */}
      <section className="py-24 px-4 bg-white dark:bg-brand-black">
          <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold mb-16 text-center dark:text-white">Meet the Leadership</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                  <TeamMember 
                    name="Alex Mercer" 
                    role="Founder & CEO" 
                    image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                    delay={0}
                  />
                  <TeamMember 
                    name="Sarah Lin" 
                    role="Chief Technology Officer" 
                    image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                    delay={0.2}
                  />
                  <TeamMember 
                    name="David Okonjo" 
                    role="Head of Product" 
                    image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
                    delay={0.4}
                  />
              </div>
          </div>
      </section>

      {/* SECTION 4: Stats */}
      <section className="py-20 bg-brand-primary text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
              <div>
                  <div className="text-5xl font-black mb-2"><CountUp to={2020} /></div>
                  <div className="text-sm uppercase tracking-widest font-bold opacity-80">Founded</div>
              </div>
              <div>
                  <div className="text-5xl font-black mb-2"><CountUp to={5} /></div>
                  <div className="text-sm uppercase tracking-widest font-bold opacity-80">Global Offices</div>
              </div>
              <div>
                  <div className="text-5xl font-black mb-2"><CountUp to={200} suffix="+" /></div>
                  <div className="text-sm uppercase tracking-widest font-bold opacity-80">Employees</div>
              </div>
              <div>
                  <div className="text-5xl font-black mb-2"><CountUp to={150} suffix="K" /></div>
                  <div className="text-sm uppercase tracking-widest font-bold opacity-80">Lines of Code</div>
              </div>
          </div>
      </section>

      {/* SECTION 5: Office/Timeline */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-brand-surface relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-4xl font-bold mb-12 text-center dark:text-white">Our Journey</h2>
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                  {[
                      { year: "2020", title: "The Beginning", desc: "Started in a garage in San Francisco with a vision to simplify cross-border payments." },
                      { year: "2021", title: "Series A", desc: "Raised $15M led by top tier VCs. Launched our first mobile app." },
                      { year: "2022", title: "European Expansion", desc: "Opened offices in London and Berlin. Reached 100k active users." },
                      { year: "2023", title: "FinFlex Business", desc: "Launched B2B suite. Processed over $1B in annual transactions." },
                      { year: "2024", title: "Global Scale", desc: "Expanding to Asia and LatAm. The revolution continues." }
                  ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-100px" }}
                        className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
                      >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 dark:bg-brand-charcoal dark:border-white/10">
                             <div className="w-3 h-3 bg-brand-primary rounded-full" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-white dark:bg-brand-black border border-gray-100 dark:border-white/5 shadow-lg">
                              <span className="text-brand-primary font-bold">{item.year}</span>
                              <h3 className="text-lg font-bold dark:text-white">{item.title}</h3>
                              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* SECTION 6: Pricing */}
      <div className="bg-white dark:bg-brand-black">
         <PricingSection />
      </div>

      {/* SECTION 7: CTA */}
      <section className="py-20 text-center bg-brand-black text-white">
          <h2 className="text-4xl font-bold mb-6">Join the revolution</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-400">We are always looking for talented individuals to join our team.</p>
          <Button size="lg">View Open Positions</Button>
      </section>
    </div>
  );
}