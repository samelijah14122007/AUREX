import CTA from "./components/CTA";
import WhyAurex from "./components/WhyAurex";
import Stats from "./components/Stats";
import Workflow from "./components/Workflow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />


<Hero />
<Features />
<Workflow />
<Stats />
<WhyAurex />
<CTA />
<Footer />
    </div>
  );
}

export default App;