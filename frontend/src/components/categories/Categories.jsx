import { Code, Layout, BarChart3, Megaphone, ShieldCheck, DollarSign, Cpu, ArrowUpRight } from 'lucide-react';
import './categories.css';

const categoriesData = [
  {
    id: 1,
    title: 'Software & Tech',
    jobsCount: '1,420+ Openings',
    icon: Code,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 2,
    title: 'UI/UX & Product Design',
    jobsCount: '860+ Openings',
    icon: Layout,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    id: 3,
    title: 'Data & Analytics',
    jobsCount: '540+ Openings',
    icon: BarChart3,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 4,
    title: 'Digital Marketing',
    jobsCount: '410+ Openings',
    icon: Megaphone,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    id: 5,
    title: 'Cybersecurity',
    jobsCount: '290+ Openings',
    icon: ShieldCheck,
    color: 'bg-rose-50 text-rose-600',
  },
  {
    id: 6,
    title: 'Finance & Accounting',
    jobsCount: '630+ Openings',
    icon: DollarSign,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    id: 7,
    title: 'AI & Machine Learning',
    jobsCount: '950+ Openings',
    icon: Cpu,
    color: 'bg-cyan-50 text-cyan-600',
  },
];

const Categories = () => {
  return (
    <section className="categories-container py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore Popular Categories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Find opportunities tailored to your specific field and expertise.
            </p>
          </div>
          <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
            <span>View All Categories</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {categoriesData.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div key={cat.id} className="category-card p-5 rounded-2xl cursor-pointer group flex items-start justify-between">
                <div className="flex flex-col gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center category-icon-wrapper ${cat.color}`}>
                    <IconComponent size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {cat.jobsCount}
                    </p>
                  </div>
                </div>
                <div className="text-slate-300 group-hover:text-blue-600 transition">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Categories;