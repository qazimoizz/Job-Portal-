import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User, LogOut, Plus, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setProfileOpen(false);
    setMobileMenuOpen(false);
    alert("Logged out successfully!");
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center">
            <Briefcase className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-lg sm:text-xl font-extrabold text-blue-600 tracking-tight">JobPortal</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/jobs" className="hover:text-blue-600 transition">Browse Jobs</Link>
          <a href="#categories" className="hover:text-blue-600 transition">Categories</a>
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <User className="w-4 h-4 text-slate-500" /> Log In
              </Link>
              <Link 
                to="/signup" 
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm shadow-blue-200"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 relative">
              {/* Show Post Job ONLY to Recruiter */}
              {user?.role === 'recruiter' && (
                <Link 
                  to="/admin/jobs/create" 
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm shadow-blue-200"
                >
                  <Plus className="w-4 h-4" /> Post a Job
                </Link>
              )}

              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                    {user?.fullName?.charAt(0)?.toUpperCase() || user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {user?.fullName || user?.fullname}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50">
                    <div className="p-2 bg-slate-50 rounded-xl mb-2 border border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user?.fullName || user?.fullname}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-extrabold uppercase rounded-md">
                        {user?.role}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <Link 
                        to="/profile" 
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition"
                      >
                        <User className="w-4 h-4 text-slate-500" /> My Profile
                      </Link>

                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
                      >
                        <LogOut className="w-4 h-4 text-red-500" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col gap-3 font-semibold text-sm text-slate-700 pt-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Browse Jobs</Link>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)}>Categories</a>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                <div className="p-2.5 bg-slate-50 rounded-xl mb-3">
                  <p className="text-xs font-bold text-slate-900">{user?.fullName || user?.fullname}</p>
                  <p className="text-[10px] text-slate-500">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-extrabold uppercase rounded-md">
                    {user?.role}
                  </span>
                </div>

                {user?.role === 'recruiter' && (
                  <Link 
                    to="/admin/jobs/create" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 bg-blue-600 text-white w-full py-2.5 rounded-xl text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" /> Post a Job
                  </Link>
                )}

                <Link 
                  to="/profile" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 border border-slate-200 w-full py-2.5 rounded-xl text-xs font-bold text-slate-700"
                >
                  <User className="w-4 h-4" /> My Profile
                </Link>

                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50 w-full py-2.5 rounded-xl text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center w-full py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;