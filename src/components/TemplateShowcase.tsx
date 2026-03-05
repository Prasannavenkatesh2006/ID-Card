import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { User, QrCode, Fingerprint } from 'lucide-react';

const templates = [
  {
    id: 1,
    name: "Corporate Pro",
    category: "Business",
    color: "bg-slate-900",
    accent: "bg-blue-500",
    layout: "vertical"
  },
  {
    id: 2,
    name: "Tech Summit",
    category: "Event",
    color: "bg-indigo-600",
    accent: "bg-pink-500",
    layout: "horizontal"
  },
  {
    id: 3,
    name: "University ID",
    category: "Education",
    color: "bg-emerald-700",
    accent: "bg-yellow-400",
    layout: "vertical"
  },
  {
    id: 4,
    name: "Medical Staff",
    category: "Healthcare",
    color: "bg-cyan-600",
    accent: "bg-white",
    layout: "horizontal"
  }
];

export function TemplateShowcase() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

  return (
    <section id="templates" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "text-3xl md:text-5xl font-bold mb-6",
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            Premium Templates
          </motion.h2>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            isDark ? "text-slate-400" : "text-slate-600"
          )}>
            Choose from our library of professionally designed templates or create your own from scratch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={cn(
                "relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-blue-500/20",
                template.layout === "horizontal" ? "aspect-[4/3]" : "aspect-[3/4]"
              )}>
                {/* Card Mockup */}
                <div className={cn("absolute inset-0 p-6 flex flex-col", template.color)}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 rounded bg-white/20 backdrop-blur-sm" />
                    <div className={cn("w-2 h-2 rounded-full", template.accent)} />
                  </div>
                  
                  {/* Photo Placeholder */}
                  <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 backdrop-blur-sm flex items-center justify-center">
                    <User className="text-white/50 w-10 h-10" />
                  </div>
                  
                  {/* Text Lines */}
                  <div className="space-y-2 text-center">
                    <div className="h-3 w-3/4 bg-white/20 rounded mx-auto" />
                    <div className="h-2 w-1/2 bg-white/10 rounded mx-auto" />
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="h-1 w-12 bg-white/20 rounded" />
                      <div className="h-1 w-8 bg-white/20 rounded" />
                    </div>
                    <QrCode className="text-white/30 w-8 h-8" />
                  </div>
                  
                  {/* Holographic Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: 'skewX(-20deg) translateX(-100%)', animation: 'shimmer 2s infinite' }} />
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className={cn("font-semibold", isDark ? "text-white" : "text-slate-900")}>{template.name}</h3>
                <p className={cn("text-sm", isDark ? "text-slate-400" : "text-slate-500")}>{template.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
