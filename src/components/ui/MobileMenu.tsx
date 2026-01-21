import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 glass rounded-full p-3 transition-all duration-300 hover:glass-strong border border-white/10"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </div>
      </button>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-72 glass-strong z-50 transition-transform duration-300 border-l border-white/10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-start justify-center h-full px-8 py-20 gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="w-full text-left text-white/80 hover:text-white transition-colors opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards',
              }}
            >
              <div className="flex items-center gap-4">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                <span className="text-lg font-medium uppercase tracking-[0.2em]">{item.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
