import Navbar from './components/navbar/Navbar.jsx';
import Hero from './components/hero/Hero.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;