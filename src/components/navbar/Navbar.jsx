import { useState } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-container sticky top-0 z-50 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            <Briefcase size={20} />
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight logo-gradient">
            JobPortal
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">Find Jobs</a></li>
          <li><a href="#" className="nav-link">Companies</a></li>
          <li><a href="#" className="nav-link">Resources</a></li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-glass px-4 py-2 rounded-lg text-sm font-semibold">
            Log In
          </button>
          <button className="btn-gradient text-white px-5 py-2 rounded-lg text-sm font-semibold">
            Post a Job
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-800 hover:text-blue-600 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-4 border-t border-slate-200/60 flex flex-col gap-3 bg-white/95 backdrop-blur-md rounded-b-xl p-4 shadow-lg">
          <a href="#" className="text-slate-700 hover:text-blue-600 font-medium py-1">Home</a>
          <a href="#" className="text-slate-700 hover:text-blue-600 font-medium py-1">Find Jobs</a>
          <a href="#" className="text-slate-700 hover:text-blue-600 font-medium py-1">Companies</a>
          <a href="#" className="text-slate-700 hover:text-blue-600 font-medium py-1">Resources</a>
          <div className="pt-2 flex flex-col gap-2">
            <button className="btn-glass w-full py-2 rounded-lg text-sm font-semibold">
              Log In
            </button>
            <button className="btn-gradient text-white w-full py-2.5 rounded-lg text-sm font-semibold">
              Post a Job
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;