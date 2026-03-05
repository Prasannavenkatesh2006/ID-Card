import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { LayoutTemplate, Palette, Shield, Download, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { 
    id: "smart-templates",
    icon: LayoutTemplate, 
    title: "Smart Templates", 
    desc: "100+ customizable templates for schools, corporate, and events." 
  },
  { 
    id: "live-design-editor",
    icon: Palette, 
    title: "Live Design Editor", 
    desc: "Drag & drop interface with real-time preview and bulk editing." 
  },
  { 
    id: "secure-data",
    icon: Shield, 
    title: "Secure Data", 
    desc: "End-to-end encryption for student and employee data protection." 
  },
  { 
    id: "bulk-export",
    icon: Download, 
    title: "Bulk Export", 
    desc: "One-click export to PDF, CSV, or direct print integration." 
  },
  { 
    id: "role-management",
    icon: Users, 
    title: "Role Management", 
    desc: "Admin, Designer, and Approver roles for team collaboration." 
  },
  { 
    id: "order-tracking",
    icon: BarChart3, 
    title: "Order Tracking", 
    desc: "Real-time status updates from production to delivery." 
  },
];

export function Features() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

  return (
    <section id="features" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link to={`/feature/${feature.id}`} key={feature.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-8 rounded-2xl border backdrop-blur-sm transition-all hover:shadow-xl hover:-translate-y-1 group h-full",
                  isDark 
                    ? "bg-white/5 border-white/10 hover:bg-white/10" 
                    : "bg-white/60 border-white/50 hover:bg-white shadow-sm"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors",
                  isDark 
                    ? "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white" 
                    : "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                )}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className={cn(
                  "text-xl font-bold mb-3",
                  isDark ? "text-white" : "text-slate-900"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "leading-relaxed",
                  isDark ? "text-slate-400" : "text-slate-600"
                )}>
                  {feature.desc}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
