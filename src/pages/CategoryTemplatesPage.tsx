import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Navbar } from '../components/Navbar';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Search, SlidersHorizontal, Check, X, QrCode, CreditCard, ChevronRight, Home } from 'lucide-react';

// Mock Data Generator
const generateTemplates = (category: string) => {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: `${category}-${i}`,
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} Pro ${i + 1}`,
    category,
    orientation: i % 3 === 0 ? 'horizontal' : 'vertical',
    color: ['blue', 'red', 'green', 'dark'][i % 4],
    tags: ['Modern', 'Minimal', 'Enterprise'][i % 3],
    features: [
      i % 2 === 0 ? 'qr' : null,
      i % 3 === 0 ? 'barcode' : null,
    ].filter(Boolean),
    image: `https://picsum.photos/seed/${category}-${i}/400/600`
  }));
};

export function CategoryTemplatesPage() {
  const { category } = useParams<{ category: string }>();
  const { theme } = useTheme();
  const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

  const [templates] = useState(generateTemplates(category || 'general'));
  const [filters, setFilters] = useState({
    orientation: 'all',
    color: 'all',
    feature: 'all'
  });
  const [showFilters, setShowFilters] = useState(true);

  const filteredTemplates = templates.filter(t => {
    if (filters.orientation !== 'all' && t.orientation !== filters.orientation) return false;
    if (filters.color !== 'all' && t.color !== filters.color) return false;
    if (filters.feature !== 'all' && !t.features.includes(filters.feature)) return false;
    return true;
  });

  return (
    <div className={cn(
      "min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-500",
      isDark ? "bg-[#050b14] text-white" : "bg-white text-slate-900"
    )}>

      <Navbar />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <Link to="/templates" className="hover:text-blue-400 transition-colors">Templates</Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span className="text-blue-400 capitalize">{category?.replace('-', ' ')}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
              {category?.replace('-', ' ')} Templates
            </h1>
            <p className="text-slate-400">Browse and customize professional templates for your organization.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 outline-none transition-all focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder:text-slate-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-2.5 rounded-xl border border-white/10 transition-all hover:bg-white/10 flex items-center gap-2 px-4",
                showFilters ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-slate-300"
              )}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Glassmorphism Sidebar Filters */}
          <motion.aside
            initial={false}
            animate={{
              width: showFilters ? 'auto' : '0px',
              opacity: showFilters ? 1 : 0,
              display: showFilters ? 'block' : 'none'
            }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0f172a]/60 backdrop-blur-xl sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-400" /> Filters
                </h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Orientation Filter */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 block">Orientation</label>
                <div className="flex bg-black/20 p-1 rounded-lg">
                  {['all', 'vertical', 'horizontal'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFilters({ ...filters, orientation: opt })}
                      className={cn(
                        "flex-1 py-2 text-xs font-medium rounded-md capitalize transition-all",
                        filters.orientation === opt
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 block">Color Theme</label>
                <div className="grid grid-cols-4 gap-3">
                  {['all', 'blue', 'red', 'green', 'dark'].map(color => (
                    <button
                      key={color}
                      onClick={() => setFilters({ ...filters, color })}
                      className={cn(
                        "w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 flex items-center justify-center",
                        filters.color === color ? "border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "border-transparent opacity-70 hover:opacity-100",
                        color === 'all' ? "bg-slate-700" :
                          color === 'blue' ? "bg-blue-500" :
                            color === 'red' ? "bg-red-500" :
                              color === 'green' ? "bg-emerald-500" : "bg-slate-900"
                      )}
                      title={color}
                    >
                      {filters.color === color && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 block">Features</label>
                <div className="space-y-3">
                  {['all', 'qr', 'barcode'].map(opt => (
                    <label key={opt} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                          opt === 'qr' ? "bg-blue-500/20 text-blue-400" :
                            opt === 'barcode' ? "bg-purple-500/20 text-purple-400" : "bg-slate-500/20 text-slate-400"
                        )}>
                          {opt === 'qr' ? <QrCode className="w-4 h-4" /> : opt === 'barcode' ? <CreditCard className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </div>
                        <span className="capitalize text-sm font-medium text-slate-300 group-hover:text-white">
                          {opt === 'qr' ? 'QR Code' : opt === 'all' ? 'All Features' : opt}
                        </span>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                        filters.feature === opt
                          ? "bg-blue-500 border-blue-500"
                          : "border-slate-600 group-hover:border-slate-400"
                      )}>
                        {filters.feature === opt && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input
                        type="radio"
                        name="feature"
                        className="hidden"
                        checked={filters.feature === opt}
                        onChange={() => setFilters({ ...filters, feature: opt })}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className={cn(
                    "relative rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a] transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2 hover:border-blue-500/30",
                    template.orientation === 'horizontal' ? "aspect-[1.586/1]" : "aspect-[1/1.586]"
                  )}>
                    {/* Image */}
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />

                    {/* Floating Elements */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 backdrop-blur-md text-blue-300 text-[10px] uppercase font-bold rounded-md">
                        {template.tags}
                      </span>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-2">
                        Customize <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-white text-lg mb-1 truncate">{template.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <div className={cn("w-2 h-2 rounded-full",
                            template.color === 'blue' ? 'bg-blue-500' :
                              template.color === 'red' ? 'bg-red-500' :
                                template.color === 'green' ? 'bg-emerald-500' : 'bg-slate-500'
                          )} />
                          <span className="capitalize">{template.color}</span>
                        </div>
                        {template.features.includes('qr') && (
                          <div className="flex items-center gap-1">
                            <QrCode className="w-3 h-3" /> QR
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => setFilters({ orientation: 'all', color: 'all', feature: 'all' })}
                  className="text-blue-400 hover:text-blue-300 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
