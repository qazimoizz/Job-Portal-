import { Briefcase } from 'lucide-react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Briefcase size={18} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">JobPortal</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Connecting talented professionals with industry-leading companies worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">For Candidates</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="footer-link">Browse Jobs</a></li>
            <li><a href="#" className="footer-link">Browse Categories</a></li>
            <li><a href="#" className="footer-link">Saved Jobs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">For Employers</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="footer-link">Post a Job</a></li>
            <li><a href="#" className="footer-link">Talent Search</a></li>
            <li><a href="#" className="footer-link">Pricing Plans</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
          <div className="flex gap-3 text-slate-400">
            {/* Globe / Website Icon */}
            <a href="#" className="hover:text-white transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </a>
            {/* Twitter Icon */}
            <a href="#" className="hover:text-white transition">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} JobPortal Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;