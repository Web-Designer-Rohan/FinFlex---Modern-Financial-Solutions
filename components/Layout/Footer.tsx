import React from 'react';
import { Facebook, Github, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

export default function Footer() {
  const socials = [
    { icon: Github, href: "#", color: "hover:text-gray-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Youtube, href: "#", color: "hover:text-red-600" },
  ];

  return (
    <footer className="bg-white dark:bg-brand-charcoal border-t border-gray-200 dark:border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-dark to-brand-primary flex items-center justify-center text-white font-bold text-lg">
                F
              </div>
              <span className="font-bold text-xl dark:text-white">FinFlex</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Simplify your financial life. Connect all your accounts, transfer freely, and manage your wealth with military-grade security.
            </p>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors ${social.color}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="font-bold text-lg mb-6 dark:text-white">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Press', 'Partners'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="font-bold text-lg mb-6 dark:text-white">Resources</h3>
            <ul className="space-y-4">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Security', 'Sitemap'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 dark:text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 dark:text-gray-400">
                <MapPin className="text-brand-primary shrink-0" size={20} />
                <span>123 Finance St, Suite 100<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <Phone className="text-brand-primary shrink-0" size={20} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <Mail className="text-brand-primary shrink-0" size={20} />
                <span>support@finflex.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} FinFlex Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
             <a href="#" className="hover:text-brand-primary">Privacy</a>
             <a href="#" className="hover:text-brand-primary">Terms</a>
             <a href="#" className="hover:text-brand-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}