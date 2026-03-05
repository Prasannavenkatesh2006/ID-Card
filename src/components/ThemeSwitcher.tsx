import { ReactNode } from 'react';
import { useTheme, ThemeType } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Palette, Building2, Cpu, Moon, GraduationCap } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { id: ThemeType; label: string; icon: ReactNode; color: string }[] = [
    { id: 'premium-tech', label: 'Premium Tech', icon: <Cpu className="w-4 h-4" />, color: 'bg-blue-900' },
    { id: 'clean-corporate', label: 'Corporate', icon: <Building2 className="w-4 h-4" />, color: 'bg-slate-200 text-slate-900' },
    { id: 'smart-digital', label: 'Digital', icon: <Palette className="w-4 h-4" />, color: 'bg-cyan-900' },
    { id: 'dark-mode', label: 'Dark Mode', icon: <Moon className="w-4 h-4" />, color: 'bg-black' },
    { id: 'school', label: 'School', icon: <GraduationCap className="w-4 h-4" />, color: 'bg-blue-100 text-blue-900' },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">
      <div className="text-[10px] uppercase tracking-wider text-center font-bold mb-1 opacity-70 text-current">Theme</div>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            "group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110",
            theme === t.id ? "ring-2 ring-offset-2 ring-blue-500 shadow-lg scale-110" : "opacity-70 hover:opacity-100",
            t.color
          )}
          title={t.label}
        >
          {t.icon}
          <span className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}
