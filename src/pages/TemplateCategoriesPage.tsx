import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Stethoscope, Ticket, ShieldCheck, School, ArrowRight, Layers } from 'lucide-react';

const categories = [
  {
    id: "school",
    title: "School ID Cards",
    subtitle: "Educational Institutions",
    icon: School,
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/20",
    delay: 0
  },
  {
    id: "corporate",
    title: "Corporate ID Cards",
    subtitle: "Enterprise Staff & Access",
    icon: Building2,
    gradient: "from-indigo-600 to-purple-500",
    shadow: "shadow-indigo-500/20",
    delay: 0.1
  },
  {
    id: "hospital",
    title: "Hospital ID Cards",
    subtitle: "Medical & Healthcare",
    icon: Stethoscope,
    gradient: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20",
    delay: 0.2
  },
  {
    id: "event",
    title: "Event Passes",
    subtitle: "Conferences & Expos",
    icon: Ticket,
    gradient: "from-pink-600 to-rose-500",
    shadow: "shadow-pink-500/20",
    delay: 0.3
  },
  {
    id: "government",
    title: "Government ID",
    subtitle: "Official Secure Docs",
    icon: ShieldCheck,
    gradient: "from-slate-700 to-slate-500",
    shadow: "shadow-slate-500/20",
    delay: 0.4
  },
  {
    id: "college",
    title: "College ID",
    subtitle: "University Campus Cards",
    icon: GraduationCap,
    gradient: "from-orange-600 to-amber-500",
    shadow: "shadow-orange-500/20",
    delay: 0.5
  }
];

export function TemplateCategoriesPage() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

  return (
    <div className={cn(
      "min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-500",
      isDark ? "bg-[#050b14] text-white" : "bg-white text-slate-900"
    )}>

      <Navbar />

      <main className="relative z-10 pt-32 pb-20 container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-200">Premium Template Library</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400"
          >
            Choose Your Identity
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Select a category to explore our enterprise-grade, secure ID card templates.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {categories.map((category) => (
            <Link to={`/templates/${category.id}`} key={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: category.delay, duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.02, rotateX: 5 }}
                className={cn(
                  "group relative h-80 rounded-3xl p-1 transition-all duration-500",
                  "hover:shadow-2xl",
                  category.shadow
                )}
              >
                {/* Gradient Border & Glow */}
                <div className={cn(
                  "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
                  category.gradient
                )} />

                {/* Card Content */}
                <div className="relative h-full bg-[#0a101f]/90 backdrop-blur-xl rounded-[22px] border border-white/10 overflow-hidden flex flex-col p-8">

                  {/* Background Gradient Blob */}
                  <div className={cn(
                    "absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl transition-transform duration-700 group-hover:scale-150",
                    "bg-gradient-to-br",
                    category.gradient
                  )} />

                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/10",
                    "bg-gradient-to-br",
                    category.gradient
                  )}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Text */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                      {category.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm tracking-wide uppercase opacity-80">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* Mockup Preview (Abstract) */}
                  <div className="mt-auto relative h-24 w-full">
                    <div className={cn(
                      "absolute bottom-[-40px] right-[-20px] w-32 h-48 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md transform rotate-[-12deg] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:translate-y-[-10px]",
                      "shadow-2xl"
                    )}>
                      <div className="p-3 space-y-2 opacity-50">
                        <div className="w-8 h-8 rounded-full bg-white/20" />
                        <div className="h-2 w-16 bg-white/20 rounded" />
                        <div className="h-2 w-10 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute bottom-8 left-8 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="flex items-center gap-2 text-sm font-bold text-white">
                      View Templates <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
