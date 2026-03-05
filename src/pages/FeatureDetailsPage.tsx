import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Navbar } from '../components/Navbar';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { ArrowLeft, LayoutTemplate, Palette, Shield, Download, Users, BarChart3, CheckCircle2 } from 'lucide-react';

const featuresData = {
  "smart-templates": {
    title: "Smart Templates",
    icon: LayoutTemplate,
    description: "100+ customizable templates for schools, corporate, and events.",
    details: [
      "Access a vast library of professionally designed templates.",
      "Automatically adapt designs to your brand colors and logo.",
      "Filter templates by industry, style, and card type.",
      "Save your own custom templates for future use."
    ],
    image: "https://picsum.photos/seed/templates/800/600"
  },
  "live-design-editor": {
    title: "Live Design Editor",
    icon: Palette,
    description: "Drag & drop interface with real-time preview and bulk editing.",
    details: [
      "Intuitive drag-and-drop interface for easy customization.",
      "Real-time preview of your design changes.",
      "Bulk editing capabilities to update multiple cards at once.",
      "Advanced typography and color tools."
    ],
    image: "https://picsum.photos/seed/editor/800/600"
  },
  "secure-data": {
    title: "Secure Data",
    icon: Shield,
    description: "End-to-end encryption for student and employee data protection.",
    details: [
      "Enterprise-grade encryption for all stored data.",
      "GDPR and CCPA compliant data handling.",
      "Secure data transmission via SSL/TLS.",
      "Regular security audits and vulnerability assessments."
    ],
    image: "https://picsum.photos/seed/security/800/600"
  },
  "bulk-export": {
    title: "Bulk Export",
    icon: Download,
    description: "One-click export to PDF, CSV, or direct print integration.",
    details: [
      "Export thousands of cards in a single click.",
      "Support for high-resolution PDF, PNG, and JPG formats.",
      "CSV export for data integration with other systems.",
      "Direct integration with professional card printers."
    ],
    image: "https://picsum.photos/seed/export/800/600"
  },
  "role-management": {
    title: "Role Management",
    icon: Users,
    description: "Admin, Designer, and Approver roles for team collaboration.",
    details: [
      "Granular permission settings for different team members.",
      "Assign roles like Admin, Editor, and Viewer.",
      "Track user activity and changes with audit logs.",
      "Streamline approval workflows for card designs."
    ],
    image: "https://picsum.photos/seed/team/800/600"
  },
  "order-tracking": {
    title: "Order Tracking",
    icon: BarChart3,
    description: "Real-time status updates from production to delivery.",
    details: [
      "Track your order status in real-time.",
      "Receive automated notifications for production milestones.",
      "View detailed shipping information and tracking numbers.",
      "Access order history and reorder with ease."
    ],
    image: "https://picsum.photos/seed/tracking/800/600"
  }
};

export function FeatureDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

  const feature = featuresData[slug as keyof typeof featuresData];

  if (!feature) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", isDark ? "text-white" : "text-slate-900")}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Feature Not Found</h1>
          <Link to="/" className="text-blue-500 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500/30",
      isDark ? "text-slate-100" : "text-slate-900"
    )}>
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6">
        <Link to="/#features" className={cn(
          "inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors",
          isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
        )}>
          <ArrowLeft className="w-4 h-4" /> Back to Features
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-8",
              isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
            )}>
              <Icon className="w-8 h-8" />
            </div>

            <h1 className={cn(
              "text-4xl md:text-5xl font-bold mb-6",
              isDark ? "text-white" : "text-slate-900"
            )}>
              {feature.title}
            </h1>

            <p className={cn(
              "text-xl mb-8 leading-relaxed",
              isDark ? "text-slate-300" : "text-slate-600"
            )}>
              {feature.description}
            </p>

            <div className="space-y-4 mb-10">
              {feature.details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className={cn("text-lg", isDark ? "text-slate-400" : "text-slate-600")}>
                    {detail}
                  </span>
                </motion.div>
              ))}
            </div>

            <button className={cn(
              "px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg",
              isDark
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}>
              Try {feature.title} Now
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className={cn(
              "aspect-video rounded-3xl overflow-hidden shadow-2xl border",
              isDark ? "border-white/10" : "border-slate-200"
            )}>
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Overlay Gradient */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t",
                isDark ? "from-[#0a192f]/80 to-transparent" : "from-white/50 to-transparent"
              )} />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
