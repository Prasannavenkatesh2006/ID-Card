import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';
import { Background } from '../components/Background';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Search, Filter, ArrowLeft, QrCode, User, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Template Data with detailed specs
const templates = [
  {
    id: 1,
    name: "Corporate Elite",
    category: "Corporate",
    theme: "Navy & Orange",
    colors: {
      bg: "bg-slate-900",
      accent: "bg-orange-500",
      text: "text-white",
      subtext: "text-slate-400"
    },
    layout: "vertical"
  },
  {
    id: 2,
    name: "Eco Tech",
    category: "Technology",
    theme: "Green & White",
    colors: {
      bg: "bg-white",
      accent: "bg-emerald-500",
      text: "text-slate-900",
      subtext: "text-slate-500"
    },
    layout: "vertical"
  },
  {
    id: 3,
    name: "Medical Pro",
    category: "Healthcare",
    theme: "Blue & White",
    colors: {
      bg: "bg-blue-50",
      accent: "bg-blue-600",
      text: "text-slate-900",
      subtext: "text-slate-500"
    },
    layout: "horizontal"
  },
  {
    id: 4,
    name: "Creative Studio",
    category: "Creative",
    theme: "Pink & Magenta",
    colors: {
      bg: "bg-zinc-900",
      accent: "bg-pink-600",
      text: "text-white",
      subtext: "text-zinc-400"
    },
    layout: "vertical"
  },
  {
    id: 5,
    name: "Premium Gold",
    category: "VIP",
    theme: "Gold & Cream",
    colors: {
      bg: "bg-[#FDFCF5]",
      accent: "bg-yellow-600",
      text: "text-slate-900",
      subtext: "text-slate-500"
    },
    layout: "horizontal"
  },
  {
    id: 6,
    name: "StartUp Flow",
    category: "SaaS",
    theme: "Navy & Blue",
    colors: {
      bg: "bg-indigo-950",
      accent: "bg-cyan-400",
      text: "text-white",
      subtext: "text-indigo-200"
    },
    layout: "vertical"
  }
];

export function TemplatesPage() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500/30",
      isDark ? "text-slate-100" : "text-slate-900"
    )}>
      <Background />
      <Navbar />
      <ThemeSwitcher />

      <main className="pt-24 pb-20 container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <Link to="/" className={cn(
              "inline-flex items-center gap-2 text-sm font-medium mb-4 transition-colors",
              isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
            )}>
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "text-4xl md:text-5xl font-bold mb-4",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              Template Gallery
            </motion.h1>
            <p className={cn(
              "text-lg max-w-2xl",
              isDark ? "text-slate-400" : "text-slate-600"
            )}>
              Explore our collection of premium, print-ready ID card templates designed for modern organizations.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all focus:ring-2",
                  isDark 
                    ? "bg-white/5 border-white/10 focus:ring-blue-500/50" 
                    : "bg-white border-slate-200 focus:ring-blue-500/20"
                )}
              />
            </div>
            <button className={cn(
              "p-2.5 rounded-xl border transition-all hover:scale-105",
              isDark 
                ? "bg-white/5 border-white/10 hover:bg-white/10" 
                : "bg-white border-slate-200 hover:bg-slate-50"
            )}>
              <Filter className="w-5 h-5 opacity-70" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group perspective-1000"
            >
              <div className={cn(
                "relative transition-all duration-500 transform-style-3d",
                template.layout === "horizontal" ? "aspect-[1.586/1]" : "aspect-[1/1.586]",
                hoveredId === template.id ? "rotate-y-180" : ""
              )}>
                
                {/* FRONT SIDE */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl overflow-hidden shadow-xl backface-hidden border border-white/10",
                  template.colors.bg
                )}>
                  {/* Abstract Background Shapes */}
                  <div className={cn("absolute top-0 right-0 w-3/4 h-3/4 opacity-20 rounded-bl-full", template.colors.accent)} />
                  <div className={cn("absolute bottom-0 left-0 w-1/2 h-1/2 opacity-10 rounded-tr-full", template.colors.accent)} />
                  
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                  <div className="relative h-full p-6 flex flex-col z-10">
                    {/* Header: Logo */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs", template.colors.accent, "text-white")}>
                          ID
                        </div>
                        <span className={cn("text-xs font-bold tracking-widest uppercase opacity-70", template.colors.text)}>
                          {template.category}
                        </span>
                      </div>
                    </div>

                    {/* Profile Section */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="relative mb-4">
                        <div className={cn("w-24 h-24 rounded-full border-4 flex items-center justify-center overflow-hidden bg-gray-200", template.colors.accent.replace('bg-', 'border-'))}>
                           <User className="w-12 h-12 text-gray-400" />
                        </div>
                        <div className={cn("absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center", template.colors.accent)}>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      </div>
                      
                      <h3 className={cn("text-xl font-bold mb-1", template.colors.text)}>Sarah Jenkins</h3>
                      <p className={cn("text-xs font-medium uppercase tracking-wider opacity-80", template.colors.text)}>Senior Designer</p>
                    </div>

                    {/* Details Grid */}
                    <div className="mt-auto space-y-3">
                      <div className={cn("flex items-center gap-3 text-xs", template.colors.subtext)}>
                        <div className={cn("p-1.5 rounded-full bg-white/10")}>
                          <span className="font-mono font-bold">ID:</span>
                        </div>
                        <span className="font-mono">EMP-2024-8892</span>
                      </div>
                      
                      <div className={cn("flex items-center gap-3 text-xs", template.colors.subtext)}>
                         <div className={cn("p-1.5 rounded-full bg-white/10")}>
                           <Calendar className="w-3 h-3" />
                         </div>
                         <span>Joined: Mar 2024</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl overflow-hidden shadow-xl backface-hidden rotate-y-180 border border-white/10",
                  template.colors.bg
                )}>
                  <div className="relative h-full p-6 flex flex-col z-10">
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                      {/* QR Code */}
                      <div className="p-3 bg-white rounded-xl shadow-lg">
                        <QrCode className="w-24 h-24 text-slate-900" />
                      </div>
                      
                      <div className={cn("space-y-2 text-xs", template.colors.subtext)}>
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-3 h-3" />
                          <span>sarah.j@company.com</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>123 Tech Blvd, San Francisco</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer / Signature */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex justify-between items-end">
                        <div className="text-[10px] opacity-50 max-w-[60%]">
                          This card is property of the issuer and must be returned upon request.
                        </div>
                        <div className="text-right">
                          <div className={cn("font-handwriting text-lg italic opacity-80", template.colors.text)}>
                            S.Jenkins
                          </div>
                          <div className="text-[10px] uppercase tracking-wider opacity-50 border-t border-white/20 pt-1 mt-1">
                            Authorized Sig
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Template Info Below Card */}
              <div className="mt-6 text-center">
                <h3 className={cn("text-lg font-bold mb-1", isDark ? "text-white" : "text-slate-900")}>
                  {template.name}
                </h3>
                <div className="flex justify-center gap-2 text-sm opacity-60">
                  <span>{template.theme}</span>
                  <span>•</span>
                  <span>{template.layout === 'vertical' ? 'Portrait' : 'Landscape'}</span>
                </div>
                <button className={cn(
                  "mt-4 px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0",
                  isDark 
                    ? "bg-white text-slate-900 hover:bg-blue-50" 
                    : "bg-slate-900 text-white hover:bg-slate-800"
                )}>
                  Customize Template
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
