import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

const Job = ({ job }) => {
  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const navigate = useNavigate();

  const handleApplyJob = async (jobId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // 1. Guard check if user is logged in
    if (!user) {
      toast.error("Please log in to apply for jobs!");
      navigate('/login');
      return;
    }

    // 2. Guard check if user is recruiter
    if (user.role === 'recruiter') {
      toast.error("Recruiters cannot apply for jobs!");
      return;
    }

    setLoading(true);
    try {
      // Backend apply controller hit (post or get matching your routes setup)
      const res = await axios.get(`http://localhost:8000/api/v1/application/apply/${jobId}`, {
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message || "Applied successfully! 🎉");
        setIsApplied(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply or already applied!");
    } font-semibold {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">{job?.title || "Frontend Developer"}</h3>
            <p className="text-xs text-slate-500 font-medium">{job?.company?.name || "Tech Company"}</p>
          </div>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase rounded-full">
            {job?.jobType || "Full-Time"}
          </span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4">
          {job?.description || "Looking for an experienced developer proficient in React.js, Tailwind CSS, and REST APIs."}
        </p>

        <div className="flex flex-wrap gap-3 text-xs text-slate-500 font-semibold mb-4">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {job?.location || "Remote"}</span>
          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-blue-600" /> {job?.salary ? `${job.salary} PKR` : "Negotiable"}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-600" /> {job?.experienceLevel || "1 Year"}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-slate-100">
        <button 
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
        >
          Details
        </button>

        <button 
          onClick={() => handleApplyJob(job?._id)}
          disabled={loading || isApplied}
          className={`flex-1 py-2 rounded-xl text-xs font-bold text-white transition ${
            isApplied 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200'
          }`}
        >
          {loading ? "Applying..." : isApplied ? "Applied ✓" : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default Job;