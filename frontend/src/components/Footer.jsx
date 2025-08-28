import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Heart, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-12 border-t border-cyan-400/20 bg-gray-950/40">
      {/* Futuristic background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-10 h-48 w-48 rounded-full bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 blur-2xl" />
        <div className="absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-500 to-fuchsia-600 flex items-center justify-center ring-1 ring-white/20 shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400">
                Bayes-ic
              </span>
            </div>
            <p className="text-sm text-gray-400">
              An Interactive dashboard that visualizes urban growth, green loss,
              and risks.
            </p>
          </div>

          

          <div>
            <h4 className="text-sm font-semibold text-cyan-300 mb-3">
              About Us
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a className="hover:text-white transition" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cyan-300 mb-3">Follow</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition ring-1 ring-white/10"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition ring-1 ring-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition ring-1 ring-white/10"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition ring-1 ring-white/10"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>© {new Date().getFullYear()} Bayes-ic. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-400" /> by the Bayes-ic
            Team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
