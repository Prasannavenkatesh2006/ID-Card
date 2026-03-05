import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  School, PenTool, Eye, ShoppingCart, CreditCard, 
  FileCheck, Factory, Truck, CheckCircle 
} from 'lucide-react';

const steps = [
  { id: 1, title: "School Registration", icon: School, desc: "Create your institution profile and set up branding guidelines." },
  { id: 2, title: "Design Creation", icon: PenTool, desc: "Use our drag-and-drop editor or choose from premium templates." },
  { id: 3, title: "Preview Generation", icon: Eye, desc: "Instant AI-generated previews of bulk ID cards with real data." },
  { id: 4, title: "Order Placement", icon: ShoppingCart, desc: "Select quantities, lanyard types, and card holders." },
  { id: 5, title: "Payment Verification", icon: CreditCard, desc: "Secure payment processing with automated invoicing." },
  { id: 6, title: "Production File Generation", icon: FileCheck, desc: "System auto-generates print-ready high-res PDF/CMYK files." },
  { id: 7, title: "Internal Production", icon: Factory, desc: "Automated routing to our high-speed printing facility." },
  { id: 8, title: "Dispatch & Tracking", icon: Truck, desc: "Real-time shipment tracking with automated notifications." },
  { id: 9, title: "Order Completion", icon: CheckCircle, desc: "Delivery confirmation and feedback collection." },
];

export function Workflow() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "text-3xl md:text-5xl font-bold mb-6",
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            Seamless Production Workflow
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-slate-400" : "text-slate-600"
            )}
          >
            From registration to delivery, our automated 9-step process ensures quality and speed.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className={cn(
            "absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full",
            isDark ? "bg-white/10" : "bg-slate-200"
          )} />

          {/* Moving Gradient on Line */}
          <motion.div 
            className="absolute left-1/2 top-0 w-1 -translate-x-1/2 h-40 bg-gradient-to-b from-transparent via-blue-500 to-transparent z-10"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative flex items-center gap-8 md:gap-16",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Content Card */}
                <div className="flex-1 hidden md:block text-right">
                  {index % 2 === 0 && (
                    <StepCard step={step} isDark={isDark} align="right" />
                  )}
                </div>

                {/* Center Node */}
                <div className="relative z-20 flex-shrink-0">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]",
                    isDark 
                      ? "bg-[#0a192f] border-blue-500 text-white" 
                      : "bg-white border-blue-500 text-blue-600"
                  )}>
                    <span className="font-bold">{step.id}</span>
                  </div>
                </div>

                {/* Content Card (Mobile or Alternating) */}
                <div className="flex-1">
                  <div className="md:hidden">
                     <StepCard step={step} isDark={isDark} align="left" />
                  </div>
                  <div className="hidden md:block">
                    {index % 2 !== 0 && (
                      <StepCard step={step} isDark={isDark} align="left" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, isDark, align }: { step: any, isDark: boolean, align: 'left' | 'right' }) {
  const Icon = step.icon;
  return (
    <div className={cn(
      "p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group",
      isDark 
        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30" 
        : "bg-white/80 border-slate-200 hover:bg-white hover:border-blue-300 shadow-lg",
      align === 'right' ? "text-right" : "text-left"
    )}>
      <div className={cn(
        "inline-flex p-3 rounded-xl mb-4 transition-colors",
        isDark ? "bg-blue-500/20 text-blue-300 group-hover:bg-blue-500 group-hover:text-white" : "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        align === 'right' ? "ml-auto" : ""
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className={cn(
        "text-xl font-bold mb-2",
        isDark ? "text-white" : "text-slate-900"
      )}>
        {step.title}
      </h3>
      <p className={cn(
        "text-sm leading-relaxed",
        isDark ? "text-slate-400" : "text-slate-600"
      )}>
        {step.desc}
      </p>
    </div>
  );
}
