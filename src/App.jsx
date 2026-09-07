import Navbar from './components/navbar/Navbar.jsx';
import Hero from './components/hero/Hero.jsx';
import Categories from './components/categories/Categories.jsx';
import FeaturedJobs from './components/featured-jobs/FeaturedJobs.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedJobs />
    </div>
  );
};

export default App;