import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const Hero = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ keyword, location });
    }
  };

  return (
    <div className="bg-slate-50/50 py-12 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm">
          <span>📈</span> #1 Job Platform for Developers & Designers
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
          Find Your <span className="text-blue-600">Dream Job</span> & <br className="hidden sm:inline" />
          <span className="text-blue-600"> Build Your Future</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium px-2">
          Explore thousands of job openings with top companies, competitive salaries, and remote-friendly opportunities.
        </p>

        {/* Responsive Search Bar Container */}
        <form 
          onSubmit={handleSearch}
          className="bg-white p-2.5 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-6 sm:mt-8"
        >
          {/* Keyword Input */}
          <div className="flex items-center gap-3 px-3 py-2 flex-1 border-b sm:border-b-0 sm:border-r border-slate-100">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Job title, keywords, or company"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-3 px-3 py-2 flex-1">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="City, state, or 'Remote'"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Search Button */}
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 shrink-0"
          >
            <span>Search</span>
            <span className="text-xs">›</span>
          </button>
        </form>

      </div>
    </div>
  );
};

export default Hero;