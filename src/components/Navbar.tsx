import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ['Features', 'Workflow', 'Pricing'];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md",
      isDark
        ? "bg-[#0a192f]/80 border-white/10"
        : "bg-white/80 border-slate-200"
    )}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
            ID
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            isDark ? "text-white" : "text-slate-900"
          )}>
            CardFlow
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-500",
                isDark ? "text-slate-300" : "text-slate-600"
              )}
            >
              {item}
            </a>
          ))}
          <Link
            to="/templates"
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-500",
              isDark ? "text-slate-300" : "text-slate-600"
            )}
          >
            Templates
          </Link>
          <Link
            to="/capture"
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-500",
              isDark ? "text-slate-300" : "text-slate-600"
            )}
          >
            Capture Photo
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className={cn(
            "hidden md:block text-sm font-medium transition-colors",
            isDark ? "text-white hover:text-blue-400" : "text-slate-900 hover:text-blue-600"
          )}>
            Login
          </button>
          <button className={cn(
            "px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg",
            isDark
              ? "bg-white text-blue-900 hover:bg-blue-50"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}>
            Get Started
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isDark ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t",
          isDark
            ? "bg-[#0a192f]/95 border-white/10"
            : "bg-white/95 border-slate-200",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              onClick={closeMobileMenu}
              className={cn(
                "py-3 px-4 rounded-xl text-base font-medium transition-colors",
                isDark
                  ? "text-slate-300 hover:text-white hover:bg-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {item}
            </a>
          ))}
          <Link
            to="/templates"
            onClick={closeMobileMenu}
            className={cn(
              "py-3 px-4 rounded-xl text-base font-medium transition-colors",
              isDark
                ? "text-slate-300 hover:text-white hover:bg-white/10"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            Templates
          </Link>
          <Link
            to="/capture"
            onClick={closeMobileMenu}
            className={cn(
              "py-3 px-4 rounded-xl text-base font-medium transition-colors",
              isDark
                ? "text-slate-300 hover:text-white hover:bg-white/10"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            Capture Photo
          </Link>

          <div className={cn("h-px my-2", isDark ? "bg-white/10" : "bg-slate-200")} />

          <button
            onClick={closeMobileMenu}
            className={cn(
              "py-3 px-4 rounded-xl text-base font-medium text-left transition-colors",
              isDark
                ? "text-white hover:bg-white/10"
                : "text-slate-900 hover:bg-slate-100"
            )}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
