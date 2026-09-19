import { useCallback, useEffect, useRef, useState } from 'react';
import '@/styles/mobile-menu.css';

const navItems = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const RESUME_URL = 'https://euaell.me/cv';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to the trigger so keyboard position is not lost.
    triggerRef.current?.focus();
  }, []);

  // Escape closes, and Tab is kept inside the panel while it is open.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  // Prevent the page behind the drawer from scrolling while it is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (!isOpen) return;
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a[href], button');
    firstLink?.focus();
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="menu-trigger"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
      >
        <span className={`menu-bars${isOpen ? ' is-open' : ''}`} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <div
        className={`menu-scrim${isOpen ? ' is-open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        id="mobile-menu-panel"
        ref={panelRef}
        className={`menu-panel${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        // Keeps the panel out of the tab order entirely while closed.
        inert={isOpen ? undefined : true}
      >
        <nav>
          <ul className="menu-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <a className="menu-link" href={item.href} onClick={close}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu-footer">
          <a
            className="btn btn-secondary menu-resume"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
