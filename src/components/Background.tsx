import { useTheme, ThemeType } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Background() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-700">
      {theme === 'premium-tech' && <PremiumTechBackground />}
      {theme === 'clean-corporate' && <CleanCorporateBackground />}
      {theme === 'smart-digital' && <SmartDigitalBackground />}
      {theme === 'dark-mode' && <DarkModeBackground />}
      {theme === 'school' && <SchoolBackground />}
    </div>
  );
}

function PremiumTechBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#020c1b]">
      {/* Glowing streaks */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[100px]"
      />
      
      {/* Abstract wave patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Floating 3D Card Shapes */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-32 h-48 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl transform -rotate-12"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-40 h-56 border border-blue-400/10 bg-blue-500/5 backdrop-blur-sm rounded-xl transform rotate-6"
      />
    </div>
  );
}

function CleanCorporateBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50">
      {/* Geometric grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Subtle curves */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full border-[60px] border-blue-100/50 blur-3xl"></div>
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-blue-50/80 blur-3xl"></div>
      </div>
    </div>
  );
}

function SmartDigitalBackground() {
  return (
    <div className="absolute inset-0 bg-[#0f172a]">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-cyan-900/20 to-indigo-900/40"></div>
      
      {/* Digital network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M10 10h80v80h-80z" fill="none" stroke="cyan" strokeWidth="0.5" strokeDasharray="4 4"/>
          <circle cx="10" cy="10" r="2" fill="cyan" />
          <circle cx="90" cy="90" r="2" fill="cyan" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Holographic effects */}
      <motion.div 
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px]"
      />
    </div>
  );
}

function DarkModeBackground() {
  return (
    <div className="absolute inset-0 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      
      {/* Neon glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-[128px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[128px]"></div>
      
      {/* Particles */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
    </div>
  );
}

function SchoolBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Organic shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-64 text-blue-100/50 fill-current">
            <path d="M0 0 L100 0 L100 50 Q50 100 0 50 Z" />
         </svg>
         
         {/* Watermarks */}
         <div className="absolute top-20 right-20 opacity-5 text-blue-900">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
               <rect x="3" y="3" width="18" height="18" rx="2" />
               <circle cx="12" cy="10" r="3" />
               <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            </svg>
         </div>
      </div>
    </div>
  );
}
