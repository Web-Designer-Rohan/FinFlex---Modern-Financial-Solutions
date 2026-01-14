import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { Apple, Chrome, ArrowRight, ShieldCheck, CreditCard, Lock, Smartphone, Check, User, Mail, Key, ShoppingCart } from 'lucide-react';
import CircularText from '../components/ui/CircularText';

// --- Components ---

// 1. Interactive 3D Card for Payment
const CreditCardVisual = ({ focused }: { focused: 'number' | 'name' | 'expiry' | 'cvc' | null }) => {
    return (
        <div className="w-full aspect-[1.586] rounded-2xl bg-gradient-to-br from-brand-charcoal to-brand-black p-6 relative overflow-hidden shadow-2xl border border-white/10 text-white transition-all duration-500 hover:scale-105 perspective-1000">
             {/* Shine effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none" />
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl"></div>
             
             <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className="flex justify-between items-start">
                     <div className="w-12 h-8 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-md opacity-80" /> {/* Chip */}
                     <div className="italic font-serif text-2xl font-bold tracking-widest opacity-50">VISA</div>
                 </div>

                 <div className="space-y-6">
                     <div className={`transition-opacity duration-300 ${focused === 'number' ? 'opacity-100' : 'opacity-80'}`}>
                         <label className="text-xs uppercase tracking-widest opacity-60">Card Number</label>
                         <div className="text-xl md:text-2xl font-mono tracking-wider">4242 4242 4242 4242</div>
                     </div>

                     <div className="flex justify-between">
                         <div className={`transition-opacity duration-300 ${focused === 'name' ? 'opacity-100' : 'opacity-80'}`}>
                            <label className="text-[10px] uppercase tracking-widest opacity-60">Card Holder</label>
                            <div className="text-sm font-medium uppercase">John Doe</div>
                         </div>
                         <div className={`transition-opacity duration-300 ${focused === 'expiry' ? 'opacity-100' : 'opacity-80'}`}>
                            <label className="text-[10px] uppercase tracking-widest opacity-60">Expires</label>
                            <div className="text-sm font-medium">12/28</div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    )
}

// 2. Auth Form Component
const AuthForm: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md space-y-6"
        >
            <div className="text-center lg:text-left space-y-2">
                <motion.h1 
                    layout
                    className="text-4xl font-bold dark:text-white"
                >
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </motion.h1>
                <motion.p layout className="text-gray-500">
                    {isSignUp ? 'Start your financial journey today.' : 'Enter your credentials to access your dashboard.'}
                </motion.p>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
                <AnimatePresence>
                    {isSignUp && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    required={isSignUp}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-brand-surface dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                    placeholder="Full Name"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        type="email" 
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-brand-surface dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                        placeholder="name@company.com"
                    />
                </div>
                
                <div className="relative">
                    <Key className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input 
                        type="password" 
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-brand-surface dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>

                {!isSignUp && (
                     <div className="flex justify-end">
                        <a href="#" className="text-xs text-brand-primary hover:underline">Forgot password?</a>
                    </div>
                )}

                <Button className="w-full py-6 text-lg shadow-xl shadow-brand-primary/20">
                    {isSignUp ? 'Sign Up & Continue' : 'Sign In'}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/10"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-brand-black text-gray-500">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors dark:text-white group">
                    <Chrome size={20} className="group-hover:text-blue-500 transition-colors" /> Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors dark:text-white group">
                    <Apple size={20} className="group-hover:text-gray-400 transition-colors" /> Apple
                </button>
            </div>
            
            <p className="text-center text-sm text-gray-500">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button onClick={() => setIsSignUp(!isSignUp)} className="ml-1 text-brand-primary font-bold hover:underline">
                    {isSignUp ? 'Sign In' : 'Sign Up free'}
                </button>
            </p>
        </motion.div>
    );
};

// 3. Payment Gateway Component
const PaymentGateway: React.FC<{ onBack: () => void, selectedPlan?: any }> = ({ onBack, selectedPlan }) => {
    const [method, setMethod] = useState<'card' | 'paypal' | 'apple' | 'google'>('card');
    const [focusedField, setFocusedField] = useState<'number' | 'name' | 'expiry' | 'cvc' | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const planPrice = selectedPlan?.price || "0.00";
    const planName = selectedPlan?.plan?.name || "Trial";
    const isCustomPrice = typeof planPrice === 'string' && planPrice !== '0.00' && isNaN(Number(planPrice));
    
    // If navigating from plans, 'selectedPlan' is { plan: tier, frequency: string, price: number|string }

    const displayPrice = isCustomPrice ? "Custom" : `$${planPrice}`;

    const handlePay = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md text-center space-y-6 bg-white dark:bg-brand-surface p-8 rounded-3xl shadow-2xl border border-green-500/20"
            >
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
                    <Check size={48} className="text-white" strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-bold dark:text-white">Payment Successful!</h2>
                <p className="text-gray-500">Your subscription to <strong>{planName}</strong> is now active.</p>
                <Button className="w-full" onClick={() => window.location.href = '/'}>Go to Dashboard</Button>
            </motion.div>
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md space-y-6"
        >
            <div className="flex items-center gap-4 mb-4">
                 <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
                     <ArrowRight className="rotate-180" />
                 </button>
                 <h1 className="text-2xl font-bold dark:text-white">Secure Payment</h1>
            </div>

            {/* Plan Summary */}
            <div className="bg-gray-100 dark:bg-brand-charcoal/50 p-4 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center text-brand-primary">
                        <ShoppingCart size={20} />
                    </div>
                    <div>
                        <div className="text-sm font-bold dark:text-white">{planName} Plan</div>
                        <div className="text-xs text-gray-500 capitalize">{selectedPlan?.frequency || 'Monthly'} Billing</div>
                    </div>
                </div>
                <div className="text-xl font-bold dark:text-white">{displayPrice}</div>
            </div>
            
            {/* Visual Card */}
            <div className="mb-8">
                <CreditCardVisual focused={focusedField} />
            </div>

            {/* Payment Methods */}
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
                 {[
                     { id: 'card', icon: CreditCard, label: 'Card' },
                     { id: 'paypal', icon: ShieldCheck, label: 'PayPal' },
                     { id: 'apple', icon: Apple, label: 'Pay' },
                     { id: 'google', icon: Chrome, label: 'Pay' },
                 ].map((m) => (
                     <button
                        key={m.id}
                        onClick={() => setMethod(m.id as any)}
                        className={`flex-1 flex flex-col items-center justify-center py-3 rounded-lg text-xs font-medium transition-all ${method === m.id ? 'bg-white dark:bg-brand-surface shadow-md text-brand-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                     >
                         <m.icon size={18} className="mb-1" />
                         {m.label}
                     </button>
                 ))}
            </div>

            {method === 'card' ? (
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 ml-1">Card Number</label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-brand-surface dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                placeholder="0000 0000 0000 0000"
                                onFocus={() => setFocusedField('number')}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500 ml-1">Card Holder</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-brand-surface dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                placeholder="Name on card"
                                onFocus={() => setFocusedField('name')}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500 ml-1">Expiry Date</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-brand-surface dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                placeholder="MM/YY"
                                onFocus={() => setFocusedField('expiry')}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500 ml-1">CVC</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-brand-surface dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                                    placeholder="123"
                                    onFocus={() => setFocusedField('cvc')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-40 flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-300 dark:border-white/10">
                    <p className="text-gray-500 text-sm mb-4">Redirecting to secure provider...</p>
                    <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <Button onClick={handlePay} disabled={isProcessing} className="w-full py-6 text-lg shadow-xl shadow-brand-primary/20">
                {isProcessing ? 'Processing...' : `Pay ${displayPrice}`}
            </Button>
            
            <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
                <Lock size={12} />
                <span>256-bit SSL Encrypted Payment</span>
            </div>
        </motion.div>
    );
};

// --- Main Page ---

export default function SignIn() {
  const location = useLocation();
  const [step, setStep] = useState<'auth' | 'payment'>('auth');
  const selectedPlan = location.state;
  
  // Mouse movement for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(x, [0, window.innerWidth], [-10, 10]);

  useEffect(() => {
    // If we have a plan from navigation state, skip to auth then payment
    // Actually, usually users need to auth first.
    // If the user already came from a plan selection, we might want to highlight that.
  }, [selectedPlan]);

  const handleMouseMove = (e: React.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
  };

  return (
    <div 
        className="min-h-screen bg-white dark:bg-brand-black flex flex-col overflow-hidden"
        onMouseMove={handleMouseMove}
    >
      
      <section className="flex flex-col lg:flex-row min-h-screen">
          {/* Left: 3D Visuals & Storytelling */}
          <div className="hidden lg:flex lg:w-1/2 bg-brand-charcoal relative overflow-hidden items-center justify-center perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-charcoal z-0"></div>
              
              {/* Floating Animated Shapes */}
              <motion.div 
                style={{ rotateX, rotateY, z: 100 }}
                className="relative z-10 w-full h-full flex items-center justify-center preserve-3d"
              >
                 {/* Main Sphere */}
                 <motion.div 
                    animate={{ y: [-20, 20, -20] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="absolute w-96 h-96 bg-gradient-to-tr from-brand-primary to-purple-600 rounded-full blur-2xl opacity-40 mix-blend-screen"
                 />
                 
                 {/* Glass Card */}
                 <motion.div 
                    style={{ rotateX: useTransform(y, [0, 1000], [5, -5]), rotateY: useTransform(x, [0, 1000], [-5, 5]) }}
                    className="w-[400px] h-[500px] bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-10 relative overflow-hidden"
                 >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                      
                      <CircularText text="FINFLEX SECURE • GATEWAY • " className="w-64 h-64 text-white opacity-20 animate-spin-slow mb-10" />
                      
                      <h2 className="text-4xl font-bold text-white text-center mb-4">
                          {step === 'auth' ? 'Access Control' : 'Secure Transaction'}
                      </h2>
                      <p className="text-center text-gray-400">
                          {step === 'auth' 
                            ? "Join 10M+ users managing their financial life with FinFlex." 
                            : "Your payment data is tokenized and never stored on our servers."}
                      </p>
                 </motion.div>

                 {/* Floating Elements */}
                 <motion.div 
                    animate={{ x: [-10, 10, -10], y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-20 h-20 bg-brand-teal/20 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center"
                 >
                     <ShieldCheck className="text-brand-teal" size={32} />
                 </motion.div>

                 <motion.div 
                    animate={{ x: [10, -10, 10], y: [10, -10, 10] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-brand-primary/20 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center"
                 >
                     <Smartphone className="text-brand-primary" size={32} />
                 </motion.div>
              </motion.div>

              {/* Grid Background */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" style={{ backgroundSize: '40px' }}></div>
          </div>

          {/* Right: Interaction Area */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative bg-white dark:bg-brand-black">
               {/* Background pattern */}
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent pointer-events-none"></div>

               <AnimatePresence mode="wait">
                   {step === 'auth' ? (
                       <AuthForm key="auth" onComplete={() => setStep('payment')} />
                   ) : (
                       <PaymentGateway key="payment" onBack={() => setStep('auth')} selectedPlan={selectedPlan} />
                   )}
               </AnimatePresence>
          </div>
      </section>
    </div>
  );
}