import React from 'react';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import { BookOpen, Home, Languages, Menu, User, X } from 'lucide-react';

import { useLocale } from '../context/LocaleContext';
import { getLanguageName, getLanguageShortName, getStrings } from '../i18n/strings';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { locale } = useLocale();
  const strings = getStrings(locale);
  const nav = strings.navigation;
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useLayoutEffect(() => {
    if (navigationType === 'POP') return;

    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      target?.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo({ left: 0, top: 0, behavior: 'auto' });
    }

    window.requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  }, [location.hash, location.key, navigationType]);

  const closeMobileMenu = React.useCallback(() => {
    const menu = mobileMenuRef.current;
    if (menu?.matches(':popover-open')) menu.hidePopover();
  }, []);

  React.useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const handleViewportChange = () => {
      if (desktopQuery.matches) closeMobileMenu();
    };

    desktopQuery.addEventListener('change', handleViewportChange);
    return () => desktopQuery.removeEventListener('change', handleViewportChange);
  }, [closeMobileMenu]);

  const toggleMobileMenu = () => {
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (menu.matches(':popover-open')) menu.hidePopover();
    else menu.showPopover();
  };

  return (
    <div className="site-root flex flex-col bg-transparent">
      <a href="#main-content" className="skip-link">{nav.skipToContent}</a>
      <header className="site-header fixed left-0 right-0 top-0 z-50 border-b border-[var(--clay-border)] bg-[rgba(250,249,247,0.92)] backdrop-blur-sm transition-all duration-300">
        <div className="site-header-inner safe-inline mx-auto flex max-w-7xl items-center justify-between sm:px-6 lg:px-8">
          <Link
            to="/"
            viewTransition
            className="group flex items-center gap-3"
            onClick={closeMobileMenu}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black clay-swatch-lemon text-xl font-black text-black shadow-[var(--clay-shadow)] transition-all duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:shadow-[var(--clay-shadow-hard)]">
              M
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[var(--clay-muted)]">
                {nav.brandEyebrow}
              </span>
              <span className="text-xl font-extrabold uppercase tracking-[0.08em] text-[var(--clay-text)]">
                MBTI Master
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex lg:gap-3" aria-label={nav.home}>
            <NavLink to="/" icon={Home} label={nav.home} isActive={location.pathname === '/'} />
            <NavLink to="/types" icon={BookOpen} label={nav.types} isActive={location.pathname.startsWith('/type')} />
            <NavLink to="/profile" icon={User} label={nav.profile} isActive={location.pathname === '/profile'} />
            <Link
              to="/about"
              viewTransition
              aria-label={`${nav.language}: ${getLanguageName(locale)}`}
              title={`${nav.language}: ${getLanguageName(locale)}`}
              className={`flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border px-3 font-black transition-all ${
                location.pathname === '/about'
                  ? 'border-black bg-[var(--clay-lemon)] text-[var(--clay-text)] shadow-[var(--clay-shadow)]'
                  : 'border-[var(--clay-border)] bg-white text-[var(--clay-muted)] hover:-translate-y-1 hover:shadow-[var(--clay-shadow-hard)]'
              }`}
            >
              <Languages size={18} />
              <span className="text-xs tracking-[0.08em]">{getLanguageShortName(locale)}</span>
            </Link>
          </nav>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label={mobileOpen ? nav.closeMenu : nav.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-white text-[var(--clay-text)] shadow-[var(--clay-shadow)] transition-all hover:-translate-y-1 hover:-rotate-3 hover:shadow-[var(--clay-shadow-hard)]"
              onClick={toggleMobileMenu}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          popover="auto"
          className="mobile-navigation-popover md:hidden"
          onToggle={(event) => setMobileOpen(event.currentTarget.matches(':popover-open'))}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeMobileMenu();
          }}
        >
          <div className="mobile-navigation-panel">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
              <div className="flex flex-col gap-2">
                <MobileNavLink
                  to="/"
                  icon={Home}
                  label={nav.home}
                  isActive={location.pathname === '/'}
                  onClick={closeMobileMenu}
                />
                <MobileNavLink
                  to="/types"
                  icon={BookOpen}
                  label={nav.types}
                  isActive={location.pathname.startsWith('/type')}
                  onClick={closeMobileMenu}
                />
                <MobileNavLink
                  to="/profile"
                  icon={User}
                  label={nav.profile}
                  isActive={location.pathname === '/profile'}
                  onClick={closeMobileMenu}
                />
                <MobileNavLink
                  to="/about"
                  icon={Languages}
                  label={`${nav.language} · ${getLanguageName(locale)}`}
                  isActive={location.pathname === '/about'}
                  onClick={closeMobileMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="site-main flex-grow outline-none">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>

      <footer className="site-footer mt-auto sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] clay-shell px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="text-center md:text-left">
              <span className="text-lg font-bold text-[var(--clay-text)]">MBTI Master</span>
              <p className="mt-1 text-sm clay-muted">{nav.tagline}</p>
            </div>
            <div className="flex space-x-6 text-sm clay-muted">
              <Link to="/about" viewTransition className="transition-colors hover:text-[var(--clay-text)]">
                {nav.language}
              </Link>
              <Link to="/types" viewTransition className="transition-colors hover:text-[var(--clay-text)]">
                {nav.types}
              </Link>
              <Link to="/privacy" viewTransition className="transition-colors hover:text-[var(--clay-text)]">
                {nav.privacy}
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-xs clay-muted">
            © {new Date().getFullYear()} MBTI Master. {nav.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({
  to,
  icon: Icon,
  label,
  isActive,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}) => (
  <Link
    to={to}
    viewTransition
    aria-label={label}
    className={`flex items-center space-x-1.5 rounded-full border px-4 py-2.5 transition-all duration-200 ${
      isActive
        ? 'border-black bg-[var(--clay-matcha)] font-semibold text-[var(--clay-text)] shadow-[var(--clay-shadow)]'
        : 'border-transparent text-[var(--clay-muted)] hover:-translate-y-1 hover:-rotate-3 hover:border-[var(--clay-border)] hover:bg-white hover:text-[var(--clay-text)] hover:shadow-[var(--clay-shadow-hard)]'
    }`}
  >
    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
    <span className="hidden lg:inline">{label}</span>
  </Link>
);

const MobileNavLink = ({
  to,
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <Link
    to={to}
    viewTransition
    onClick={onClick}
    className={`flex items-center space-x-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 ${
      isActive
        ? 'border-black bg-[var(--clay-slushie)] font-bold text-[var(--clay-text)] shadow-[var(--clay-shadow)]'
        : 'border-[var(--clay-border)] bg-white text-[var(--clay-muted)] hover:-translate-y-1 hover:-rotate-2 hover:text-[var(--clay-text)] hover:shadow-[var(--clay-shadow-hard)]'
    }`}
  >
    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
    <span className="text-lg">{label}</span>
  </Link>
);
