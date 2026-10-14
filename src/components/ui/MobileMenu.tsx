import { useEffect, useRef, useState } from 'react';
import type { NavItem } from '@/data/types';

interface Props {
  items: NavItem[];
}

export default function MobileMenu({ items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="glass fixed top-4 right-4 z-70 rounded-full p-3 transition-colors duration-300 hover:glass-strong"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className="flex size-6 flex-col items-center justify-center gap-1.5" aria-hidden="true">
          <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </span>
      </button>

      <div
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* visibility transitions with translate so the panel leaves the tab order only after sliding out */}
      <nav
        id="mobile-menu"
        aria-label="Primary"
        className={`glass-strong fixed top-0 right-0 z-60 h-full w-72 border-y-0 border-r-0 transition-[translate,visibility] duration-300 ${
          isOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <ul className="flex h-full flex-col justify-center gap-6 px-8 py-20">
          {items.map((item, i) => (
            <li key={item.href}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={close}
                className="block text-lg font-medium tracking-caps text-white/80 uppercase transition-colors hover:text-white"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
