import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [input, setInput] = useState({
    fullName: '', // Capital N
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send keys matching Mongoose schema exact casing
      const res = await axios.post('http://localhost:8000/api/v1/user/register', {
        fullName: input.fullName, // Capital N
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: input.password,
        role: input.role
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (res.data.success) {
        alert("🎉 Account created successfully! Redirecting to login...");
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Create Account</h2>
        <p className="text-xs text-slate-500 text-center mb-6">Join as Candidate or Recruiter</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input 
                type="radio" 
                name="role" 
                value="student" 
                checked={input.role === 'student'} 
                onChange={(e) => setInput({...input, role: e.target.value})} 
              /> Student
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input 
                type="radio" 
                name="role" 
                value="recruiter" 
                checked={input.role === 'recruiter'} 
                onChange={(e) => setInput({...input, role: e.target.value})} 
              /> Recruiter
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={input.fullName} 
              onChange={(e) => setInput({...input, fullName: e.target.value})} 
              className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-blue-600" 
              placeholder="Qazi Moiz" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={input.email} 
              onChange={(e) => setInput({...input, email: e.target.value})} 
              className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-blue-600" 
              placeholder="qazimoiz@gmail.com" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
            <input 
              type="text" 
              value={input.phoneNumber} 
              onChange={(e) => setInput({...input, phoneNumber: e.target.value})} 
              className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-blue-600" 
              placeholder="03183010136" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={input.password} 
              onChange={(e) => setInput({...input, password: e.target.value})} 
              className="w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-blue-600" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;