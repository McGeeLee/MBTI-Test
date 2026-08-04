import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Menu, User, X } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuPath, setMobileMenuPath] = React.useState<string | null>(null);
  const mobileOpen = mobileMenuPath === location.pathname;

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--clay-border)] bg-[rgba(250,249,247,0.92)] backdrop-blur-sm transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3"
            onClick={() => setMobileMenuPath(null)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black clay-swatch-lemon text-xl font-black text-black shadow-[var(--clay-shadow)] transition-all duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:shadow-[var(--clay-shadow-hard)]">
              M
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-[var(--clay-muted)]">
                Personality Lab
              </span>
              <span className="text-xl font-extrabold uppercase tracking-[0.08em] text-[var(--clay-text)]">
                MBTI Master
              </span>
            </div>
          </Link>

          <nav className="hidden items-center space-x-4 md:flex">
            <NavLink to="/" icon={Home} label="Home" isActive={location.pathname === '/'} />
            <NavLink to="/types" icon={BookOpen} label="Types" isActive={location.pathname === '/types'} />
            <NavLink to="/profile" icon={User} label="Profile" isActive={location.pathname === '/profile'} />
          </nav>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--clay-border)] bg-white text-[var(--clay-text)] shadow-[var(--clay-shadow)] transition-all hover:-translate-y-1 hover:-rotate-3 hover:shadow-[var(--clay-shadow-hard)]"
              onClick={() => setMobileMenuPath(mobileOpen ? null : location.pathname)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--clay-border)] bg-[rgba(255,253,248,0.96)] md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
              <div className="flex flex-col gap-2">
                <MobileNavLink
                  to="/"
                  icon={Home}
                  label="Home"
                  isActive={location.pathname === '/'}
                  onClick={() => setMobileMenuPath(null)}
                />
                <MobileNavLink
                  to="/types"
                  icon={BookOpen}
                  label="Types"
                  isActive={location.pathname === '/types'}
                  onClick={() => setMobileMenuPath(null)}
                />
                <MobileNavLink
                  to="/profile"
                  icon={User}
                  label="Profile"
                  isActive={location.pathname === '/profile'}
                  onClick={() => setMobileMenuPath(null)}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>

      <footer className="mt-auto px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] clay-shell px-6 py-8 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="text-center md:text-left">
              <span className="text-lg font-bold text-[var(--clay-text)]">MBTI Master</span>
              <p className="mt-1 text-sm clay-muted">Know yourself. Spot the pattern.</p>
            </div>
            <div className="flex space-x-6 text-sm clay-muted">
              <Link to="/about" className="transition-colors hover:text-[var(--clay-text)]">
                Language
              </Link>
              <Link to="/types" className="transition-colors hover:text-[var(--clay-text)]">
                Types
              </Link>
              <Link to="/privacy" className="transition-colors hover:text-[var(--clay-text)]">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-xs clay-muted">
            © {new Date().getFullYear()} MBTI Master. Based on Jungian Psychology.
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
    className={`flex items-center space-x-1.5 rounded-full border px-4 py-2.5 transition-all duration-200 ${
      isActive
        ? 'border-black bg-[var(--clay-matcha)] font-semibold text-[var(--clay-text)] shadow-[var(--clay-shadow)]'
        : 'border-transparent text-[var(--clay-muted)] hover:-translate-y-1 hover:-rotate-3 hover:border-[var(--clay-border)] hover:bg-white hover:text-[var(--clay-text)] hover:shadow-[var(--clay-shadow-hard)]'
    }`}
  >
    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
    <span>{label}</span>
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
