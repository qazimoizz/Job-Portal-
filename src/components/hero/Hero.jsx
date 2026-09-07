import { useState } from 'react';
import { Search, MapPin, ChevronRight, TrendingUp } from 'lucide-react';
import './hero.css';

const Hero = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ keyword, location });
    }
  };

  return (
    <section className="hero-wrapper pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Top Tag/Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold hero-badge mb-6 shadow-xs">
          <TrendingUp size={14} />
          <span>#1 Job Platform for Developers & Designers</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find Your Dream Job & <br className="hidden sm:inline" />
          <span className="logo-gradient">Build Your Future</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Explore thousands of job openings with top companies, competitive salaries, and remote-friendly opportunities.
        </p>

        {/* Search Bar Form */}
        <div className="mt-10 hero-search-box rounded-2xl p-2.5 sm:p-3 max-w-3xl mx-auto text-left">
          <form className="flex flex-col md:flex-row items-center gap-2" onSubmit={handleSubmit}>
            
            {/* Input 1: Job Keyword */}
            <div className="search-input-group flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl border border-transparent">
              <Search className="text-slate-400 shrink-0" size={20} />
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keywords, or company" 
                className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm font-medium"
              />
            </div>

            <div className="hidden md:block w-px h-8 bg-slate-200"></div>

            {/* Input 2: Location */}
            <div className="search-input-group flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl border border-transparent">
              <MapPin className="text-slate-400 shrink-0" size={20} />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, state, or 'Remote'" 
                className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm font-medium"
              />
            </div>

            {/* Search Submit Button */}
            <button 
              type="submit" 
              className="btn-gradient text-white font-semibold px-7 py-3.5 rounded-xl text-sm w-full md:w-auto shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Search</span>
              <ChevronRight size={16} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Hero;