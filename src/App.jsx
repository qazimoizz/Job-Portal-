import { useState } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import Hero from './components/hero/Hero.jsx';
import Categories from './components/categories/Categories.jsx';
import FeaturedJobs from './components/featured-jobs/FeaturedJobs.jsx';
import Footer from './components/footer/Footer.jsx';

const App = () => {
  const [searchQuery, setSearchQuery] = useState({ keyword: '', location: '' });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />
        <Hero onSearch={handleSearch} />
        <Categories />
        <FeaturedJobs searchQuery={searchQuery} />
      </div>
      <Footer />
    </div>
  );
};

export default App;