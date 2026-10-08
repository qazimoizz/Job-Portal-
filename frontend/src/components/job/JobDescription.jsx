import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MapPin, DollarSign, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

const JobDescription = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/job/get/${jobId}`, {
          withCredentials: true
        });
        if (res.data.success) {
          setJob(res.data.job);
          // Check if current user already exists in job applications array
          const applied = res.data.job.applications?.some(app => app.applicant === user?._id || app === user?._id);
          setIsApplied(applied);
        }
      } catch (err) {
        console.error("Error fetching job details", err);
      }
    };
    if (jobId) fetchSingleJob();
  }, [jobId, user?._id]);

  const handleApplyJob = async () => {
    if (!user) {
      toast.error("Please log in to apply!");
      navigate('/login');
      return;
    }

    if (user.role === 'recruiter') {
      toast.error("Recruiters cannot apply for jobs!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/application/apply/${jobId}`, {
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message || "Application submitted! 🎉");
        setIsApplied(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Already applied for this job!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900">{job?.title}</h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">{job?.company?.name || "Company Confidential"}</p>
          </div>

          <button 
            onClick={handleApplyJob}
            disabled={loading || isApplied}
            className={`px-6 py-3 rounded-2xl text-xs font-bold text-white transition ${
              isApplied 
                ? 'bg-emerald-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200'
            }`}
          >
            {loading ? "Submitting..." : isApplied ? "Already Applied ✓" : "Apply For This Job"}
          </button>
        </div>

        {/* Job Attributes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 font-bold block mb-1">Role Type</span>
            <span className="font-extrabold text-slate-800">{job?.jobType}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block mb-1">Location</span>
            <span className="font-extrabold text-slate-800">{job?.location}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block mb-1">Salary</span>
            <span className="font-extrabold text-slate-800">{job?.salary} PKR</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block mb-1">Experience</span>
            <span className="font-extrabold text-slate-800">{job?.experienceLevel}</span>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2">Job Description</h2>
          <p className="text-xs text-slate-600 leading-relaxed">{job?.description}</p>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2">Requirements</h2>
          <div className="flex flex-wrap gap-2">
            {job?.requirements?.map((req, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl">
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;