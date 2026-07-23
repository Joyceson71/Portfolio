export function Footer() {
  return (
    <footer className="w-full border-t border-titan-bronze/20 bg-obsidian pt-12 pb-8 mt-auto relative z-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Logo/Brand */}
        <div>
          <div className="font-heading font-bold text-3xl uppercase tracking-widest text-white">
            JD<span className="text-titan-bronze">.</span>
          </div>
          <p className="font-sans text-xs text-parchment-dim mt-2 max-w-[200px] mx-auto md:mx-0">
            Tactical ODM Interface designed for optimal web performance.
          </p>
        </div>
        
        {/* Quote */}
        <div className="flex justify-center">
          <p className="font-cinzel text-[10px] text-titan-bronze uppercase tracking-[0.3em] max-w-xs text-center border-l border-r border-titan-bronze/30 px-6">
            "Dedicate your heart to the code."
          </p>
        </div>
        
        {/* Social Links via SVG */}
        <div className="flex justify-center md:justify-end gap-6">
          <a href="https://github.com/Joyceson71" target="_blank" rel="noreferrer" className="text-parchment-dim hover:text-titan-bronze transition-colors" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="https://linkedin.com/in/joyceson-danielraj" target="_blank" rel="noreferrer" className="text-parchment-dim hover:text-titan-bronze transition-colors" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
