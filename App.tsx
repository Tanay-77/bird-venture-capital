
import React, { useState, useEffect, useRef } from 'react';
import { Bird, ChevronRight, Menu, X, ArrowUpRight, Plus, Minus } from 'lucide-react';

/**
 * Hook for intersection observer reveal
 */
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return { isVisible, domRef };
};

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { isVisible, domRef } = useIntersectionObserver();
  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 ${isVisible ? 'reveal' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  );
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:-rotate-12">
            <Bird className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">bird</span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-pink-500 transition-colors">Programs</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Connect</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Legal</a>
          <button className="ml-4 px-6 py-2 bg-black text-white rounded-full text-[10px] hover:bg-neutral-800 transition-colors">Apply Now</button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 md:hidden flex flex-col items-center justify-center gap-8 text-3xl font-serif italic ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <button className="absolute top-8 right-6" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
        <a href="#" onClick={() => setMobileMenuOpen(false)}>Programs</a>
        <a href="#" onClick={() => setMobileMenuOpen(false)}>Connect</a>
        <a href="#" onClick={() => setMobileMenuOpen(false)}>Legal</a>
        <button className="mt-8 px-10 py-4 bg-black text-white rounded-full text-lg font-sans not-italic font-medium">Apply now</button>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.4] -z-10"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <Reveal className="space-y-10">
          <h1 className="text-6xl md:text-[5.5rem] font-serif leading-[1.1] tracking-tight">
            We fund the <br />next generation of <span className="rainbow-text italic">founders.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-light">
            Bird backs ambitious teams at the earliest stage — with capital, mentorship, and a network built to help you move fast and build something that matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="px-10 py-5 bg-black text-white rounded-full font-medium hover:scale-105 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group">
              Apply now <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="px-10 py-5 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-colors flex items-center justify-center">
              How it works
            </button>
          </div>

          <div className="grid grid-cols-3 gap-12 pt-12 border-t border-neutral-100">
            <div>
              <p className="text-4xl font-bold tracking-tighter">36M+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">Raised</p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tighter">35+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">Founders</p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tighter">100+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">Mentors</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="relative group">
          <div className="relative h-[700px] w-full rounded-[2.5rem] overflow-hidden  shadow-2xl">
            <img
              src="/Hero.png"
              alt="Futuristic Data Visualization"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80"></div>


          </div>
        </Reveal>
      </div>
    </section>
  );
};

const ValueProposition: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-6 italic leading-[1.2] tracking-tighter">Early belief changes everything.</h2>
          <p className="text-xl text-gray-500 leading-relaxed font-light">
            We invest before it’s obvious. Before the traction. Before the hype. Because the best companies don’t look safe at the start, they look interesting.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Ambitious Founders (Spans 2 columns) */}
          <Reveal className="md:col-span-2 bg-neutral-50 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between hover:shadow-xl transition-shadow duration-500 group">
            <div className="mb-8">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Ambitious Founders</h3>
              <p className="text-gray-500 font-light">People who think long-term and move with urgency.</p>
            </div>
            <div className="w-full h-[400px] rounded-[1.5rem] overflow-hidden relative">
              <img
                src="/image.png"
                alt="Ambitious Founders"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>

          {/* Card 2: Big Problems (Spans 1 column) */}
          <Reveal className="md:col-span-1 bg-neutral-50 rounded-[2.5rem] p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-500 group">
            <div className="mb-8">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Big Problems</h3>
              <p className="text-gray-500 font-light text-sm">Ideas that matter, not just incremental improvements.</p>
            </div>
            <div className="w-full h-[300px] md:h-[400px] rounded-[1.5rem] overflow-hidden relative">
              <img
                src="https://i.pinimg.com/1200x/f3/98/71/f39871cf3c3915a0b75f818eb39f1ea1.jpg"
                alt="Big Problems"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>

          {/* Card 3: Technical Leverage (Full width) */}
          <Reveal className="md:col-span-3 bg-neutral-50 rounded-[2.5rem] p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center hover:shadow-xl transition-shadow duration-500 group">
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-4">Technical Leverage</h3>
              <p className="text-gray-500 font-light text-lg leading-relaxed">
                We invest before it's obvious. Before the traction. Before the hype. Because the best companies don't look safe at the start, they look interesting.
              </p>
            </div>
            <div className="w-full h-[400px] rounded-[1.5rem] overflow-hidden relative">
              <img
                src="https://i.pinimg.com/1200x/2d/35/4b/2d354b904ff070a5c5930217aaca41c3.jpg"
                alt="Technical Leverage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Philosophy: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">

        {/* Top Decorative Bar */}
        <div className="relative mb-20">
          <div className="w-full h-24 bg-neutral-100/80"></div>
          {/* Yellow Square */}
          <div className="absolute -top-8 right-[1%] w-28 h-28 bg-[#EBB343] rotate-[15deg] shadow-sm"></div>
        </div>

        <Reveal className="text-center relative z-10 max-w-4xl mx-auto mb-20">
          <h2 className="text-5xl md:text-[5rem] font-serif leading-[1] mb-8 tracking-tighter text-neutral-900">
            We don’t just write checks. We build with you.
          </h2>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
            Bird is hands-on. We work closely with founders on product,
            hiring, strategy, and fundraising, every step of the way.
          </p>
        </Reveal>

        {/* Bottom Decorative Bar */}
        <div className="relative">
          <div className="w-full h-24 bg-neutral-100/80"></div>
          {/* Red Square */}
          <div className="absolute -bottom-8 left-[1%] w-28 h-28 bg-[#D65239] -rotate-[15deg] shadow-sm"></div>
        </div>

      </div>
    </section>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-20">
          <h2 className="text-5xl font-serif mb-4 tracking-tighter">How it works</h2>
          <p className="text-gray-400 font-light">How to get this opportunity and apply ?</p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Steps 1 & 2 Combined Card */}
          <Reveal className="lg:col-span-2 bg-neutral-50 rounded-[2rem] overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-500 group">
            <div className="md:w-1/2 min-h-[400px] relative overflow-hidden">
              <img
                src="https://i.pinimg.com/1200x/2d/35/4b/2d354b904ff070a5c5930217aaca41c3.jpg"
                alt="Runner"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="md:w-1/2 p-12 flex flex-col justify-center bg-neutral-50">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-10">Steps ...</p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">Step 01 : Apply</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">
                    Tell us what you're building, why now, and why you.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">Step 02 : Build</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">
                    If we invest, you join a small cohort and start building immediately with our support.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Step 3 Card */}
          <Reveal className="bg-neutral-50 rounded-[2rem] overflow-hidden hover:shadow-xl transition-shadow duration-500 group flex flex-col">
            <div className="h-[300px] relative overflow-hidden">
              <img
                src="https://i.pinimg.com/1200x/f3/98/71/f39871cf3c3915a0b75f818eb39f1ea1.jpg"
                alt="Scale"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-10 flex-grow">
              <h3 className="text-2xl font-bold tracking-tight mb-3">Step 03 : Scale</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                We help you refine your product, finde early users, and prepare for the next round.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ q: string; a: string; isOpen: boolean; toggle: () => void }> = ({ q, a, isOpen, toggle }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-500 ${isOpen ? 'shadow-2xl' : 'bg-neutral-50 hover:bg-neutral-100'}`}
    >
      <div className="relative">
        {isOpen && (
          <div className="absolute inset-0 z-0">

            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        )}

        <button
          className={`relative z-10 w-full flex justify-between items-center text-left p-8 md:p-10 ${isOpen ? 'text-black' : 'text-neutral-900'}`}
          onClick={toggle}
        >
          <span className={`text-xl md:text-2xl font-serif tracking-tight ${isOpen ? '' : 'font-light'}`}>{q}</span>
          <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
            {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6 text-neutral-400" />}
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out relative z-10 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {/* If open, we need the background to extend or be visible here too. 
             But the design shows the question and answer sharing the card background.
             So we'll put the background on the parent container if valid, or just keep the structure simple.
             For the open state, the image covers the whole card.
         */}
        {isOpen && (
          <div className="absolute inset-0 -z-10">
            <img src="/background image.jpg" alt="bg" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        )}

        <div className="p-8 md:p-10 pt-0">
          <p className={`font-light leading-relaxed max-w-3xl ${isOpen ? 'text-white/90' : 'text-gray-500'}`}>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    { q: "What stage do you invest in?", a: "We typically invest pre-seed and seed. We love being the first check in." },
    { q: "How much do you invest?", a: "We typically invest initial checks of $100k - $500k in pre-seed and seed rounds, with substantial capacity for follow-on investments as you scale." },
    { q: "Do you require traction?", a: "No. We often invest in founders with nothing more than a prototype and a compelling vision. We value unique insights and technical excellence over early revenue." },
    { q: "Where are you based?", a: "We are headquartered in San Francisco but invest globally. We have portfolio companies in New York, London, Tel Aviv, and Bangalore." },
    { q: "What is your requirement?", a: "We look for technical founders solving hard problems. We like outliers." }
  ];

  return (
    <section className="py-40 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <Reveal className="mb-20 text-center">
          <h2 className="text-5xl font-serif italic tracking-tight mb-4">FAQ</h2>
          <p className="text-gray-400 font-light">Everything you need to know before applying.</p>
        </Reveal>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <Reveal key={i}>
              <FAQItem
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src="/background image.jpg" alt="Footer Background" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Bird className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl text-white font-bold tracking-tighter">bird</span>
            </div>
            <p className="text-white font-light max-w-sm leading-relaxed text-lg">
              Investing in the bold, the curious, and the technical. We help you build the future from the ground up.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Programs</h4>
            <ul className="space-y-5 text-white text-sm font-light">
              <li><a href="#" className="hover:text-black transition-colors">Residency Program</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Startup Mentorship</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Funding Track</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Founder Resources</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Connect</h4>
            <ul className="space-y-5 text-white text-sm font-light">
              <li><a href="#" className="hover:text-black transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-black transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Newsletter</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Legal</h4>
            <ul className="space-y-5 text-white text-sm font-light">
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-40 pt-10 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white text-[10px] uppercase tracking-widest">© {new Date().getFullYear()} Bird Capital Management. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="text-white hover:text-black transition-colors"><ChevronRight className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <main className="selection:bg-pink-100 selection:text-pink-900 scroll-smooth">
      <Header />
      <Hero />
      <ValueProposition />
      <Philosophy />
      <HowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
};

export default App;
