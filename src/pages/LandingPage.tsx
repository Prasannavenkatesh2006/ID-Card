import { ThemeProvider } from '../context/ThemeContext';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Workflow } from '../components/Workflow';
import { TemplateShowcase } from '../components/TemplateShowcase';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export function LandingPage() {
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500/30",
      isDark ? "text-slate-100" : "text-slate-900"
    )}>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <TemplateShowcase />

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className={cn(
              "rounded-3xl p-12 md:p-20 text-center relative overflow-hidden border",
              isDark
                ? "bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border-white/10"
                : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-transparent"
            )}>
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Streamline Your ID Card Process?
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-10">
                  Join 500+ institutions and companies using CardFlow for secure, automated identity management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-xl">
                    Start Free Trial
                  </button>
                  <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                    Schedule Demo
                  </button>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className={cn(
        "py-12 border-t",
        isDark
          ? "bg-[#020c1b] border-white/10 text-slate-400"
          : "bg-slate-50 border-slate-200 text-slate-600"
      )}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                  ID
                </div>
                <span className={cn("text-xl font-bold", isDark ? "text-white" : "text-slate-900")}>
                  CardFlow
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                The enterprise standard for secure identity card management and production.
              </p>
            </div>

            <div>
              <h4 className={cn("font-bold mb-4", isDark ? "text-white" : "text-slate-900")}>Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className={cn("font-bold mb-4", isDark ? "text-white" : "text-slate-900")}>Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className={cn("font-bold mb-4", isDark ? "text-white" : "text-slate-900")}>Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>&copy; 2024 CardFlow Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-500">Twitter</a>
              <a href="#" className="hover:text-blue-500">LinkedIn</a>
              <a href="#" className="hover:text-blue-500">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
