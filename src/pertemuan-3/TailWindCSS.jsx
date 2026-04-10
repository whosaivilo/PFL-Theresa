import React, { useState, useEffect } from 'react';

export default function TailWindCSS() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F7] font-sans text-slate-800 selection:bg-pink-200 scroll-smooth">
      <FlexboxGrid isScrolled={isScrolled} />
      
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        {/* Hero Section */}
        <header className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <ShadowEffects />
        </header>

        {/* Horizontal Scroll Section (Memanjakan Mata) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-pink-400 uppercase">My Creations</h2>
              <p className="text-3xl font-black text-slate-800">Featured Projects</p>
            </div>
            <p className="text-pink-300 text-sm hidden md:block italic">Scroll ke kanan →</p>
          </div>
          
          {/* Container Scroll ke Kanan */}
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar">
            <ProjectCard image="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=600" title="Brand Identity" tag="Design" />
            <ProjectCard image="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600" title="Mobile App" tag="Development" />
            <ProjectCard image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600" title="Digital Art" tag="Illustration" />
            <ProjectCard image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" title="Web Portfolio" tag="UI/UX" />
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
           <Spacing />
           <BackgroundColors />
        </div>

        <Typography />
        
        <div className="flex justify-center pb-12">
          <BorderRadius />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FlexboxGrid({ isScrolled }) {
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-3 backdrop-blur-xl bg-white/60 border-b border-pink-100' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO ANIMATION */}
        <div className="relative flex items-center group cursor-pointer">
          <div className="text-2xl font-black tracking-tighter flex">
            <span className={`transition-all duration-500 ${isScrolled ? 'text-pink-500' : 'text-slate-800'}`}>Porto</span>
            <span className={`transition-all duration-500 ${isScrolled ? 'translate-x-0 text-pink-400' : 'translate-x-4 text-pink-200'}`}>folio</span>
          </div>
          <div className={`w-2 h-2 bg-pink-400 rounded-full ml-1 transition-all duration-500 ${isScrolled ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
        </div>

        <ul className="hidden md:flex space-x-10 text-[13px] font-bold uppercase tracking-widest text-slate-400">
          <li className="hover:text-pink-400 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-pink-400 transition-colors cursor-pointer">Works</li>
          <li className="hover:text-pink-400 transition-colors cursor-pointer">Contact</li>
        </ul>
        
        <button className="text-xs font-bold bg-pink-500 text-white px-6 py-2.5 rounded-full shadow-lg shadow-pink-100 hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:scale-90">
          Logout
        </button>
      </div>
    </nav>
  );
}

function ShadowEffects() {
  return (
    <div className="relative group bg-white border border-pink-50 p-8 md:p-16 rounded-[3rem] overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100/50 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-pink-200 transition-all duration-1000"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-pink-50 text-pink-500 text-[10px] font-bold tracking-widest uppercase">
            Available for freelance
          </span>
          <h3 className="text-5xl md:text-7xl font-black text-slate-800 leading-[0.9] tracking-tighter">
            Digital <br /> <span className="text-pink-400 underline decoration-pink-100 underline-offset-8">Aesthetic.</span>
          </h3>
          <p className="text-slate-500 text-lg max-w-sm">
            Menciptakan harmoni visual antara teknologi dan keindahan untuk brand Anda.
          </p>
        </div>
        
        {/* Image/Logo Placeholder */}
        <div className="w-64 h-80 rounded-[2.5rem] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-500 border-[12px] border-white shadow-2xl shadow-pink-200/50 flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=600" 
            alt="Profile" 
            className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ image, title, tag }) {
  return (
    <div className="flex-none w-72 md:w-80 snap-center group">
      <div className="relative h-96 rounded-[2rem] overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-500">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <h4 className="text-lg font-bold text-slate-800">{title}</h4>
      <p className="text-pink-400 text-sm font-medium tracking-wide">{tag}</p>
    </div>
  );
}

function Spacing() {
  return (
    <div className="group bg-white p-10 rounded-[2.5rem] hover:shadow-xl hover:shadow-pink-200/20 transition-all border border-pink-50">
      <div className="w-12 h-12 bg-pink-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-pink-500 transition-colors">
        <div className="w-2 h-2 bg-pink-500 group-hover:bg-white rounded-full animate-ping"></div>
      </div>
      <h2 className="text-2xl text-slate-800 font-black mb-3">Soft Layout</h2>
      <p className="text-slate-500 leading-relaxed text-sm">Padding dan margin yang presisi untuk kenyamanan mata pengguna saat menjelajah.</p>
    </div>
  );
}

function Typography() {
  return (
    <div className="text-center space-y-4 py-12">
      <p className="text-pink-400 text-sm font-black tracking-[0.4em] uppercase">Philosophy</p>
      <h1 className="text-4xl md:text-6xl font-serif text-slate-900 max-w-4xl mx-auto italic leading-tight">
        "Keindahan sejati muncul saat fungsionalitas bertemu kesederhanaan."
      </h1>
    </div>
  );
}

function BorderRadius() {
  return (
    <button className="group relative px-14 py-5 font-bold text-white rounded-full overflow-hidden transition-all bg-pink-500 shadow-xl shadow-pink-200 hover:bg-slate-800">
      <span className="relative z-10 flex items-center gap-3">
        Let's Work Together
        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
      </span>
    </button>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-pink-400 text-white p-10 rounded-[2.5rem] shadow-xl shadow-pink-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
      <h3 className="text-2xl font-black mb-4">Pastel Tone</h3>
      <p className="text-pink-50 opacity-90 text-sm leading-relaxed">
        Pemilihan palet warna yang tenang dan lembut untuk membangun kepercayaan dan kehangatan brand.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-pink-50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tighter text-slate-800">THERESA<span className="text-pink-400">OLIVIA.</span></h2>
          <p className="text-slate-400 max-w-xs font-medium uppercase text-[10px] tracking-widest">Digital Designer Based in Indonesia</p>
        </div>

        <div className="flex gap-12">
          <SocialLink href="https://instagram.com/theresaoliviaa" label="Instagram" handle="@theresaoliviaa" />
          <SocialLink href="https://linkedin.com/in/theresa-olivia-t" label="LinkedIn" handle="theresa-olivia-t" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-pink-50 flex justify-between text-pink-300 text-[10px] font-bold tracking-[0.2em] uppercase">
        <p>© 2026 Theresa Olivia.</p>
        <p>Created with Love & Tailwind 4</p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, handle }) {
  return (
    <a href={href} target="_blank" className="group space-y-2 block">
      <p className="text-xs font-black text-slate-800 group-hover:text-pink-500 transition-colors uppercase tracking-widest">{label}</p>
      <p className="text-[11px] text-slate-400 group-hover:text-slate-600 transition-colors">{handle}</p>
    </a>
  );
}