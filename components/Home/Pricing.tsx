import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PAYMENT_FREQUENCIES: ('monthly' | 'yearly')[] = ['monthly', 'yearly'];
const TIERS = [
  {
    id: 'individuals',
    name: 'Individuals',
    price: {
      monthly: 'Free',
      yearly: 'Free',
    },
    description: 'For your hobby projects',
    features: [
      'Free email alerts',
      '3-minute checks',
      'Automatic data enrichment',
      '10 monitors',
      'Up to 3 seats',
    ],
    cta: 'Get started',
  },
  {
    id: 'teams',
    name: 'Teams',
    price: {
      monthly: 90,
      yearly: 75,
    },
    description: 'Great for small businesses',
    features: [
      'Unlimited phone calls',
      '30 second checks',
      'Single-user account',
      '20 monitors',
      'Up to 6 seats',
    ],
    cta: 'Get started',
    popular: true,
  },
  {
    id: 'organizations',
    name: 'Organizations',
    price: {
      monthly: 120,
      yearly: 100,
    },
    description: 'Great for large businesses',
    features: [
      'Unlimited phone calls',
      '15 second checks',
      'Single-user account',
      '50 monitors',
      'Up to 10 seats',
    ],
    cta: 'Get started',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'For multiple teams',
    features: [
      'Everything in Organizations',
      'Up to 5 team members',
      '100 monitors',
      '15 status pages',
      '200+ integrations',
    ],
    cta: 'Contact Us',
    highlighted: true,
  },
];

const HighlightedBackground = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:45px_45px] opacity-100 dark:opacity-30 pointer-events-none" />
);

const PopularBackground = () => (
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(254,98,29,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(254,98,29,0.3),rgba(255,255,255,0))] pointer-events-none" />
);

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  discount?: boolean;
}

const Tab: React.FC<TabProps> = ({
  text,
  selected,
  setSelected,
  discount = false,
}) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        'relative w-fit px-4 py-2 text-sm font-semibold capitalize transition-colors',
        selected ? "text-brand-black dark:text-brand-black" : "text-gray-500",
        discount && 'flex items-center justify-center gap-2.5',
      )}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-white absolute inset-0 z-0 rounded-full shadow-sm"
        ></motion.span>
      )}
      {discount && (
        <Badge
          className={cn(
            'relative z-10 bg-brand-primary/10 text-brand-primary shadow-none hover:bg-brand-primary/20',
          )}
        >
          Save 35%
        </Badge>
      )}
    </button>
  );
};

interface PricingCardProps {
  tier: (typeof TIERS)[0];
  paymentFrequency: 'monthly' | 'yearly';
}

const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  paymentFrequency,
}) => {
  const navigate = useNavigate();
  const price = tier.price[paymentFrequency];
  const isHighlighted = tier.highlighted;
  const isPopular = tier.popular;

  const handleSelectPlan = () => {
    navigate('/signin', { 
        state: { 
            plan: tier, 
            frequency: paymentFrequency,
            price: price
        } 
    });
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
      className={cn(
        'relative flex flex-col gap-8 overflow-hidden rounded-2xl border p-6 shadow-xl transition-all',
        isHighlighted
          ? 'bg-brand-black text-white border-brand-primary/50'
          : 'bg-white dark:bg-brand-surface text-brand-black dark:text-white border-gray-200 dark:border-white/10',
        isPopular && 'outline outline-2 outline-brand-primary shadow-brand-primary/20',
      )}
    >
      {isHighlighted && <HighlightedBackground />}
      {isPopular && <PopularBackground />}

      <h2 className="flex items-center gap-3 text-xl font-medium capitalize">
        {tier.name}
        {isPopular && (
          <Badge className="mt-1 bg-brand-primary px-2 py-0.5 text-white hover:bg-brand-vivid">
            🔥 Most Popular
          </Badge>
        )}
      </h2>

      <div className="relative h-12 overflow-hidden">
         <AnimatePresence mode="wait">
            <motion.div
                key={paymentFrequency}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute w-full"
            >
                {typeof price === 'number' ? (
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-medium">${price}</span>
                    <p className="-mt-2 text-xs font-medium opacity-60">Per month/user</p>
                </div>
                ) : (
                <h1 className="text-4xl font-medium">{price}</h1>
                )}
            </motion.div>
         </AnimatePresence>
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-medium opacity-80">{tier.description}</h3>
        <ul className="space-y-3 mt-4">
          {tier.features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                isHighlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-300',
              )}
            >
              <BadgeCheck strokeWidth={2} size={18} className="text-brand-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={handleSelectPlan}
        variant={isHighlighted ? 'primary' : 'outline'}
        className={cn(
          'w-full rounded-lg mt-auto',
          !isHighlighted && "dark:text-white dark:border-white/20 dark:hover:bg-white/10"
        )}
      >
        {tier.cta}
      </Button>
    </motion.div>
  );
};

export default function PricingSection() {
  const [selectedPaymentFreq, setSelectedPaymentFreq] = useState<
    'monthly' | 'yearly'
  >(PAYMENT_FREQUENCIES[0]);

  return (
    <section className="flex flex-col items-center gap-10 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-7 text-center"
      >
        <div className="space-y-4">
          <h2 className="text-brand-primary font-bold tracking-widest text-sm uppercase">Transparent Pricing</h2>
          <h1 className="text-4xl font-bold md:text-5xl text-gray-900 dark:text-white">
            Choose Your <span className="text-brand-primary">Plan</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Receive unlimited credits when you pay yearly, and save on your
            plan. No hidden fees.
          </p>
        </div>
        <div className="mx-auto flex w-fit rounded-full bg-gray-100 p-1 dark:bg-brand-surface border border-gray-200 dark:border-white/10">
          {PAYMENT_FREQUENCIES.map((freq) => (
            <Tab
              key={freq}
              text={freq}
              selected={selectedPaymentFreq === freq}
              setSelected={(text) =>
                setSelectedPaymentFreq(text as 'monthly' | 'yearly')
              }
              discount={freq === 'yearly'}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {TIERS.map((tier, i) => (
          <PricingCard
            key={i}
            tier={tier}
            paymentFrequency={selectedPaymentFreq}
          />
        ))}
      </motion.div>
    </section>
  );
}