import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <--- Added Toaster Import

import Navbar from './components/navbar/Navbar.jsx';
import Hero from './components/hero/Hero.jsx';
import Categories from './components/categories/Categories.jsx';
import FeaturedJobs from './components/featured-jobs/FeaturedJobs.jsx';
import Footer from './components/footer/Footer.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import PostJob from './components/admin/PostJob.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import Profile from './components/profile/Profile.jsx';
import JobDescription from './components/job/JobDescription.jsx'; // <--- Added Job Description Component

const Home = () => {
  const [searchQuery, setSearchQuery] = useState({ keyword: '', location: '' });

  return (
    <>
      <Hero onSearch={(q) => setSearchQuery(q)} />
      <div id="categories">
        <Categories />
      </div>
      <FeaturedJobs searchQuery={searchQuery} />
    </>
  );
};

const App = () => {
  return (
    <Router>
      {/* Toast notifications handler */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<FeaturedJobs searchQuery={{ keyword: '', location: '' }} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Job Details Page Route */}
            <Route path="/description/:id" element={<JobDescription />} />

            {/* Recruiter Route */}
            <Route 
              path="/admin/jobs/create" 
              element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;