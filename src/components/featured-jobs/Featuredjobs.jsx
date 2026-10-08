import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, DollarSign, Clock, Bookmark, ArrowUpRight, Building2, X, CheckCircle2 } from 'lucide-react';
import './featured-jobs.css';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log("Fetching jobs from backend...");
      try {
        const res = await axios.get('http://localhost:8000/api/v1/job/get', {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        if (res.data && res.data.jobs) {
          setJobs(res.data.jobs);
        }
      } catch (error) {
        console.error("API Call Failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
    }, 2000);
  };

  if (loading) {
    return (
      <section className="featured-jobs-container py-16 text-center text-slate-500 font-medium">
        Connecting to MongoDB database...
      </section>
    );
  }

  return (
    <section className="featured-jobs-container py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              Handpicked Opportunities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Job Listings
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Live listings fetched directly from backend database.
            </p>
          </div>
        </div>

        {/* Jobs List Grid */}
        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
            No active jobs found in MongoDB. Database mein entries insert karo!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {jobs.map((job) => (
              <div key={job._id} className="job-card p-6 rounded-2xl flex flex-col justify-between gap-5 group">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm company-badge shrink-0">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">
                          {job.company?.name || job.companyName || 'Verified Employer'}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => toggleBookmark(job._id)}
                      className="bookmark-btn p-2 rounded-lg border border-slate-200/80 hover:border-red-200 shrink-0 cursor-pointer"
                    >
                      <Bookmark 
                        size={18} 
                        className={bookmarked[job._id] ? "fill-red-500 text-red-500" : ""} 
                      />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} className="text-slate-400" />
                      {job.location || 'Remote'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign size={15} className="text-emerald-600" />
                      <span className="text-slate-700 font-semibold">${job.salary}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={15} className="text-slate-400" />
                      {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="job-tag-type text-xs font-semibold px-2.5 py-1 rounded-md">
                      {job.jobType || 'Full-time'}
                    </span>
                    <span className="job-tag text-xs font-medium px-2.5 py-1 rounded-md">
                      {job.position || 1} Position(s)
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    Verified Job
                  </span>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="btn-primary text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Apply Job Interactive Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>

              {applied ? (
                <div className="py-8 text-center flex flex-col items-center gap-3">
                  <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
                  <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
                  <p className="text-sm text-slate-500">Your application has been received for {selectedJob.title}.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Apply for {selectedJob.title}</h3>
                  <p className="text-xs text-slate-500 mb-6">{selectedJob.company?.name || 'Company'} • {selectedJob.location || 'Remote'}</p>

                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <input type="text" required placeholder="Enter your full name" className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-blue-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input type="email" required placeholder="name@example.com" className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-blue-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Resume / Intro</label>
                      <textarea rows="3" required placeholder="Portfolio link or cover note..." className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-blue-600"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition">
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedJobs;