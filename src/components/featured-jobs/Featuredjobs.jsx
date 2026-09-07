import { useState } from 'react';
import { MapPin, DollarSign, Clock, Bookmark, ArrowUpRight, Building2 } from 'lucide-react';
import './featured-jobs.css';

const jobsData = [
  {
    id: 1,
    title: 'Senior Full Stack Engineer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA (Remote)',
    salary: '$130k - $160k',
    type: 'Full-time',
    posted: '2 hours ago',
    logoBg: 'bg-blue-600',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
  },
  {
    id: 2,
    title: 'Lead UI/UX Product Designer',
    company: 'PixelCraft Studio',
    location: 'New York, NY (Hybrid)',
    salary: '$110k - $140k',
    type: 'Full-time',
    posted: '5 hours ago',
    logoBg: 'bg-purple-600',
    tags: ['Figma', 'Design Systems', 'User Research'],
  },
  {
    id: 3,
    title: 'Backend Node.js Developer',
    company: 'CloudScale Inc.',
    location: 'Remote',
    salary: '$100k - $125k',
    type: 'Contract',
    posted: '1 day ago',
    logoBg: 'bg-emerald-600',
    tags: ['Node.js', 'Express', 'MongoDB', 'Redis'],
  },
  {
    id: 4,
    title: 'Frontend React Specialist',
    company: 'Innovate Labs',
    location: 'Austin, TX (On-site)',
    salary: '$95k - $115k',
    type: 'Full-time',
    posted: '2 days ago',
    logoBg: 'bg-indigo-600',
    tags: ['React', 'TypeScript', 'Vite', 'CSS Modules'],
  },
  {
    id: 5,
    title: 'DevOps & Cloud Engineer',
    company: 'DataStream Global',
    location: 'Remote',
    salary: '$120k - $150k',
    type: 'Full-time',
    posted: '3 days ago',
    logoBg: 'bg-amber-600',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    id: 6,
    title: 'Growth Marketing Manager',
    company: 'VenturePulse',
    location: 'Remote',
    salary: '$85k - $105k',
    type: 'Part-time',
    posted: '3 days ago',
    logoBg: 'bg-rose-600',
    tags: ['SEO', 'Google Analytics', 'Content Strategy'],
  },
];

const FeaturedJobs = () => {
  const [bookmarked, setBookmarked] = useState({});

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
              Discover top-rated positions from verified technology companies.
            </p>
          </div>
          <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
            <span>Explore All Jobs</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Jobs List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobsData.map((job) => (
            <div key={job.id} className="job-card p-6 rounded-2xl flex flex-col justify-between gap-5 group">
              
              {/* Card Top Header */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className={`w-12 h-12 rounded-xl ${job.logoBg} text-white flex items-center justify-center font-bold text-lg shadow-sm company-badge shrink-0`}>
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 mt-0.5">
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleBookmark(job.id)}
                    className="bookmark-btn p-2 rounded-lg border border-slate-200/80 hover:border-red-200 shrink-0 cursor-pointer"
                    title="Save Job"
                  >
                    <Bookmark 
                      size={18} 
                      className={bookmarked[job.id] ? "fill-red-500 text-red-500" : ""} 
                    />
                  </button>
                </div>

                {/* Job Details Meta Pills */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-slate-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign size={15} className="text-emerald-600" />
                    <span className="text-slate-700 font-semibold">{job.salary}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} className="text-slate-400" />
                    {job.posted}
                  </span>
                </div>

                {/* Skill Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="job-tag-type text-xs font-semibold px-2.5 py-1 rounded-md">
                    {job.type}
                  </span>
                  {job.tags.map((tag, idx) => (
                    <span key={idx} className="job-tag text-xs font-medium px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Verified Employer
                </span>
                <button className="btn-primary text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer">
                  <span>Apply Now</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedJobs;