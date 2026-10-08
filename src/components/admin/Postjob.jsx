import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: 'Full-time',
    experience: '1',
    position: '1',
    companyId: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/v1/job/post', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Job posted successfully! 🚀");
        navigate('/jobs');
      }
    } catch (err) {
      console.error("Post job error:", err);
      toast.error(err.response?.data?.message || "Server Error (500): Check backend terminal logs!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input 
          type="text" 
          placeholder="Job Title" 
          required 
          value={input.title} 
          onChange={(e) => setInput({...input, title: e.target.value})} 
          className="w-full p-2.5 border rounded-xl text-xs focus:outline-blue-600" 
        />
        <textarea 
          placeholder="Description" 
          required 
          value={input.description} 
          onChange={(e) => setInput({...input, description: e.target.value})} 
          className="w-full p-2.5 border rounded-xl text-xs focus:outline-blue-600" 
        />
        <input 
          type="text" 
          placeholder="Requirements (comma separated: React, Node, CSS)" 
          required 
          value={input.requirements} 
          onChange={(e) => setInput({...input, requirements: e.target.value})} 
          className="w-full p-2.5 border rounded-xl text-xs focus:outline-blue-600" 
        />
        <div className="grid grid-cols-2 gap-2">
          <input 
            type="number" 
            placeholder="Salary in PKR/USD" 
            required 
            value={input.salary} 
            onChange={(e) => setInput({...input, salary: e.target.value})} 
            className="p-2.5 border rounded-xl text-xs focus:outline-blue-600" 
          />
          <input 
            type="text" 
            placeholder="Location (e.g. Remote, Karachi)" 
            required 
            value={input.location} 
            onChange={(e) => setInput({...input, location: e.target.value})} 
            className="p-2.5 border rounded-xl text-xs focus:outline-blue-600" 
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input 
            type="text" 
            placeholder="Job Type (e.g. Full-time)" 
            required 
            value={input.jobType} 
            onChange={(e) => setInput({...input, jobType: e.target.value})} 
            className="p-2.5 border rounded-xl text-xs focus:outline-blue-600" 
          />
          <input 
            type="text" 
            placeholder="Experience (e.g. 1 Year)" 
            required 
            value={input.experience} 
            onChange={(e) => setInput({...input, experience: e.target.value})} 
            className="p-2.5 border rounded-xl text-xs focus:outline-blue-600" 
          />
          <input 
            type="number" 
            placeholder="No. of Openings" 
            required 
            value={input.position} 
            onChange={(e) => setInput({...input, position: e.target.value})} 
            className="p-2.5 border rounded-xl text-xs focus:outline-blue-600" 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition"
        >
          {loading ? "Posting Job..." : "Publish Job Listing"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;