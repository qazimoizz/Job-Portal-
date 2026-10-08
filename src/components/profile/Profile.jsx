import React from 'react';
import { Mail, Phone, Briefcase, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
  }

  // Safe fallback user object if localStorage is empty
  const userData = user || {
    fullName: 'qazi Moiz',
    email: 'qazimoiz2242@gmail.com',
    phoneNumber: '03172970044',
    role: 'student',
    profile: {
      bio: 'Full Stack MERN Developer',
      skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS']
    }
  };

  const appliedJobs = [
    { id: 1, role: 'Frontend Developer', company: 'TechSolutions Ltd', date: '02 Sep 2026', status: 'Accepted' },
    { id: 2, role: 'Full Stack Engineer', company: 'DevStudio', date: '05 Sep 2026', status: 'Pending' }
  ];

  // Safely extract skills without crashing
  const userSkills = Array.isArray(userData?.profile?.skills) && userData.profile.skills.length > 0
    ? userData.profile.skills
    : ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'];

  const displayName = userData?.fullName || userData?.fullname || 'qazi Moiz';
  const displayRole = userData?.role || 'student';
  const displayEmail = userData?.email || 'qazimoiz2242@gmail.com';
  const displayPhone = userData?.phoneNumber || '03172970044';

  return (
    <div className="max-w-5xl mx-auto my-6 sm:my-10 px-4 space-y-6">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white text-2xl sm:text-3xl font-extrabold flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
            {displayName.charAt(0).toUpperCase()}
          </div>
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{displayName}</h1>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold uppercase rounded-full">
                {displayRole}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" /> {displayEmail}
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" /> {displayPhone}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {userSkills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Role Based Views */}
      {displayRole === 'student' ? (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Applied Jobs
            </h2>
            <span className="text-xs font-semibold text-slate-500">{appliedJobs.length} Applications</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-3 sm:p-4 rounded-l-xl">Date</th>
                  <th className="p-3 sm:p-4">Job Role</th>
                  <th className="p-3 sm:p-4">Company</th>
                  <th className="p-3 sm:p-4 text-right rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appliedJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 sm:p-4 text-slate-500 font-medium whitespace-nowrap">{job.date}</td>
                    <td className="p-3 sm:p-4 font-bold text-slate-900 whitespace-nowrap">{job.role}</td>
                    <td className="p-3 sm:p-4 text-slate-600 font-semibold whitespace-nowrap">{job.company}</td>
                    <td className="p-3 sm:p-4 text-right whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        job.status === 'Accepted' 
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {job.status === 'Accepted' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-blue-600 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg shadow-blue-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold">Recruiter Portal Dashboard</h2>
            <p className="text-xs text-blue-100 mt-1">Manage posted job listings and review incoming candidates.</p>
          </div>
          <Link to="/admin/jobs/create" className="px-5 py-2.5 bg-white text-blue-600 rounded-xl text-xs font-extrabold hover:bg-blue-50 transition shrink-0">
            + Post New Job
          </Link>
        </div>
      )}

    </div>
  );
};

export default Profile;