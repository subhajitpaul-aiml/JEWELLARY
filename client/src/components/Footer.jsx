import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageSquare,
  Mail,
  QrCode,
  ShieldCheck,
  Truck,
  RotateCcw,
  Gem,
  Award,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0D1117] text-stone-300 font-sans border-t border-stone-800">
      {/* 1. Value Proposition Banner */}
      <div className="border-b border-stone-800 bg-[#121824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="w-11 h-11 rounded-full bg-[#1E2738] flex items-center justify-center text-[#E2C799]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">100% Certified</p>
              <p className="text-xs text-stone-400">BIS Hallmarked & IGI Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="w-11 h-11 rounded-full bg-[#1E2738] flex items-center justify-center text-[#E2C799]">
              <RotateCcw size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">15-Day Free Returns</p>
              <p className="text-xs text-stone-400">100% Money Back Guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="w-11 h-11 rounded-full bg-[#1E2738] flex items-center justify-center text-[#E2C799]">
              <Truck size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Free Insured Shipping</p>
              <p className="text-xs text-stone-400">Transit Insurance Included</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="w-11 h-11 rounded-full bg-[#1E2738] flex items-center justify-center text-[#E2C799]">
              <Award size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Lifetime Exchange</p>
              <p className="text-xs text-stone-400">Guaranteed buyback policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Grid (Matches Screenshot 1 Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & App Download (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9B1139] to-[#C99757] flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-5 h-5 fill-none stroke-white" strokeWidth="6">
                  <polygon points="50,5 95,35 78,90 22,90 5,35" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="10" fill="#E2C799" />
                </svg>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl tracking-[0.2em] font-bold text-white block">
                  AURELIA
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C99757]">
                  A Heritage Fine Jewellery Atelier
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Aurelia Fine Jewellery Pvt. Ltd.<br />
              9th Floor, Sovereign Tower, Crescent Boulevard, Bandra-Kurla Complex,<br />
              Mumbai, Maharashtra - 400051<br />
              CIN: U52393MH2024PTC084210
            </p>

            {/* Mobile App Download Card (Matching Screenshot 1) */}
            <div className="bg-[#18202F] p-4 rounded-2xl border border-stone-800 flex items-center justify-between max-w-xs shadow-lg">
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 bg-[#9B1139] text-[10px] text-white font-semibold rounded-md">
                  Aurelia Luxe App
                </span>
                <p className="text-xs text-stone-200 font-medium">For a better shopping experience & exclusive deals</p>
                <button
                  onClick={() => alert('Aurelia mobile app available soon on iOS App Store & Android Play Store!')}
                  className="mt-2 text-xs bg-stone-700 hover:bg-[#9B1139] text-white px-3 py-1 rounded-md transition font-medium"
                >
                  Get App
                </button>
              </div>
              <div className="bg-white p-2 rounded-xl flex flex-col items-center shadow-xs">
                <QrCode size={52} className="text-stone-900" />
                <span className="text-[9px] text-stone-600 font-semibold mt-1">Scan QR</span>
              </div>
            </div>
          </div>

          {/* Know Your Jewellery */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Know Your Jewellery
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/jewellery?search=diamond" className="hover:text-[#E2C799] transition">Diamond guide</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Jewellery guide</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Gemstones guide</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Daily gold rate</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Gold Vault 10+1</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Glossary</Link></li>
            </ul>
          </div>

          {/* Aurelia Advantage */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Aurelia Advantage
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">15-day returns</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Free insured shipping</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Postcards & gift cards</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Gold exchange</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Gift cards</Link></li>
              <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Digital gold 24K</Link></li>
            </ul>
          </div>

          {/* Customer Service & About Us */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Customer Service
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Return policy</Link></li>
                <li><Link to="/account" className="hover:text-[#E2C799] transition">Order status & tracking</Link></li>
                <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Frequently Asked Questions</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white tracking-wide">
                About Us
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Our story & heritage</Link></li>
                <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Press & media</Link></li>
                <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Fine jewellery blog</Link></li>
                <li><Link to="/jewellery" className="hover:text-[#E2C799] transition">Careers at Aurelia</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Us (Matching Screenshot 1) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p className="font-medium text-stone-200">24x7 Enquiry Support (All Days)</p>
              <p>General: <a href="mailto:concierge@aureliajewels.com" className="text-[#E2C799] hover:underline">concierge@aureliajewels.com</a></p>
              <p>Corporate: <a href="mailto:corporate@aureliajewels.com" className="text-[#E2C799] hover:underline">corporate@aureliajewels.com</a></p>
              <p>Bespoke: <a href="mailto:bridal@aureliajewels.com" className="text-[#E2C799] hover:underline">bridal@aureliajewels.com</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Strip: Call, Chat, WhatsApp, Email & Social (Matching Screenshot 1) */}
      <div className="border-t border-stone-800 bg-[#090D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Quick contact buttons */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300">
            <a href="tel:+911800287354" className="flex items-center gap-2 hover:text-[#E2C799] transition">
              <Phone size={14} className="text-[#E2C799]" />
              <span>Call: +91 1800-287-354</span>
            </a>
            <span className="hidden sm:inline text-stone-700">|</span>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#E2C799] transition">
              <MessageSquare size={14} className="text-emerald-500" />
              <span>WhatsApp: +91 98765 43210</span>
            </a>
            <span className="hidden sm:inline text-stone-700">|</span>
            <a href="mailto:concierge@aureliajewels.com" className="flex items-center gap-2 hover:text-[#E2C799] transition">
              <Mail size={14} className="text-[#E2C799]" />
              <span>Email: concierge@aureliajewels.com</span>
            </a>
          </div>

          {/* Social Icons & Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-3 text-stone-400">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-white transition" title="Instagram">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-white transition" title="Facebook">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-white transition" title="LinkedIn">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-white transition" title="X">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <span className="text-[11px] text-stone-500">
              © {new Date().getFullYear()} AURELIA JEWELLERY LTD. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
