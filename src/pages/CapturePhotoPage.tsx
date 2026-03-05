import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { Navbar } from '../components/Navbar';
import {
    Search,
    Camera,
    RefreshCw,
    Download,
    User,
    Check,
    ChevronRight,
    Image as ImageIcon,
    ArrowLeft,
    Smartphone,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Types ---
interface Student {
    admissionNumber: string;
    name: string;
    department: string;
    organization: string;
    gender: 'Male' | 'Female';
}

interface Template {
    id: string;
    name: string;
    previewUrl: string;
    colors: {
        bg: string;
        accent: string;
        text: string;
        subtext: string;
    };
}

// --- Mock Data ---
const MOCK_TEMPLATES: Template[] = [
    {
        id: 'school-1',
        name: 'Academic Blue',
        previewUrl: 'https://images.unsplash.com/photo-1544648151-12c49080b06b?auto=format&fit=crop&q=80&w=300',
        colors: { bg: 'bg-blue-900', accent: 'bg-blue-500', text: 'text-white', subtext: 'text-blue-200' }
    },
    {
        id: 'corp-1',
        name: 'Enterprise Dark',
        previewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300',
        colors: { bg: 'bg-slate-900', accent: 'bg-indigo-500', text: 'text-white', subtext: 'text-slate-400' }
    },
    {
        id: 'hosp-1',
        name: 'Medical Clean',
        previewUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300',
        colors: { bg: 'bg-emerald-50', accent: 'bg-emerald-600', text: 'text-slate-900', subtext: 'text-slate-500' }
    }
];

export function CapturePhotoPage() {
    const { theme } = useTheme();
    const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);

    const [step, setStep] = useState(1);
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [fetchedStudent, setFetchedStudent] = useState<Student | null>(null);
    const [selectedGender, setSelectedGender] = useState<'Male' | 'Female' | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cardPreviewRef = useRef<HTMLDivElement>(null);

    // --- Handlers ---
    const handleFetchStudent = () => {
        if (!admissionNumber) return;
        // Mocking fetch logic
        const student: Student = {
            admissionNumber,
            name: "Alex Johnson",
            department: "Computer Science",
            organization: "Global University",
            gender: "Male"
        };
        setFetchedStudent(student);
        setSelectedGender(student.gender);
    };

    const startCamera = async () => {
        setIsCapturing(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { aspectRatio: 16 / 9, facingMode: 'user' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Please ensure you have granted camera permissions.");
            setIsCapturing(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
        }
        setIsCapturing(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const dataUrl = canvasRef.current.toDataURL('image/png');
                setCapturedImage(dataUrl);
                stopCamera();
            }
        }
    };

    const handleRetake = () => {
        setCapturedImage(null);
        startCamera();
    };

    const generatePDF = async () => {
        if (!cardPreviewRef.current) return;

        const canvas = await html2canvas(cardPreviewRef.current, {
            scale: 3, // Higher quality
            useCORS: true,
            backgroundColor: null
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        // Center the ID card (standard CR80 size is approx 85.6 x 53.98 mm)
        const cardWidth = 85;
        const cardHeight = (canvas.height * cardWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', (pdfWidth - cardWidth) / 2, 20, cardWidth, cardHeight);
        pdf.save(`ID_Card_${fetchedStudent?.admissionNumber || 'CardFlow'}.pdf`);
    };

    // --- Steps Logic ---
    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const steps = [
        { number: 1, label: 'Template' },
        { number: 2, label: 'Details' },
        { number: 3, label: 'Camera' },
        { number: 4, label: 'Preview' }
    ];

    return (
        <div className={cn(
            "min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500/30 overflow-x-hidden",
            isDark ? "text-white" : "text-slate-900"
        )}>
            <Navbar />

            <main className="relative z-10 pt-28 pb-12 container mx-auto px-4 sm:px-6">
                {/* Step Indicator */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0 hidden sm:block"></div>
                        {steps.map((s) => (
                            <div key={s.number} className="relative z-10 flex flex-col items-center gap-2">
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2",
                                        step >= s.number
                                            ? "bg-blue-600 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                            : "bg-slate-900 border-white/20 text-slate-500"
                                    )}
                                >
                                    {step > s.number ? <CheckCircle2 className="w-6 h-6" /> : s.number}
                                </div>
                                <span className={cn(
                                    "text-xs font-semibold uppercase tracking-wider",
                                    step >= s.number ? "text-blue-400" : "text-slate-500"
                                )}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 1: Template Selection */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-6xl mx-auto"
                        >
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold mb-4">Choose ID Template</h2>
                                <p className="text-slate-400">Select a layout for the identity card.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {MOCK_TEMPLATES.map((tmpl) => (
                                    <motion.div
                                        key={tmpl.id}
                                        whileHover={{ y: -10 }}
                                        className={cn(
                                            "relative bg-white/5 border rounded-3xl overflow-hidden cursor-pointer transition-all",
                                            selectedTemplate?.id === tmpl.id
                                                ? "border-blue-500 ring-4 ring-blue-500/20"
                                                : "border-white/10"
                                        )}
                                        onClick={() => setSelectedTemplate(tmpl)}
                                    >
                                        <div className="aspect-[1.586/1] w-full overflow-hidden relative group">
                                            <img
                                                src={tmpl.previewUrl}
                                                alt={tmpl.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-4 left-6">
                                                <h3 className="text-xl font-bold">{tmpl.name}</h3>
                                            </div>
                                            {selectedTemplate?.id === tmpl.id && (
                                                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex gap-2">
                                            <div className={cn("w-4 h-4 rounded-full", tmpl.colors.bg)}></div>
                                            <div className={cn("w-4 h-4 rounded-full", tmpl.colors.accent)}></div>
                                            <span className="text-xs text-slate-500 ml-auto uppercase font-bold tracking-widest">Premium</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 flex justify-end">
                                <button
                                    onClick={nextStep}
                                    disabled={!selectedTemplate}
                                    className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-xl shadow-blue-500/20"
                                >
                                    Proceed to Details <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Student Identification & Details */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    Student Identification
                                </h2>

                                <div className="space-y-6">
                                    {/* Admission Input */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                            <input
                                                type="text"
                                                placeholder="Enter Admission Number"
                                                value={admissionNumber}
                                                onChange={(e) => setAdmissionNumber(e.target.value)}
                                                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                            />
                                        </div>
                                        <button
                                            onClick={handleFetchStudent}
                                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
                                        >
                                            Fetch Details
                                        </button>
                                    </div>

                                    {/* Fetched Card */}
                                    <AnimatePresence>
                                        {fetchedStudent && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-6 rounded-2xl border border-white/10 bg-white/5 glass-morphism space-y-4"
                                            >
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Name</p>
                                                        <p className="text-lg font-bold">{fetchedStudent.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Organization</p>
                                                        <p className="text-lg font-bold">{fetchedStudent.organization}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Dept / Class</p>
                                                        <p className="text-lg font-bold">{fetchedStudent.department}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Admission #</p>
                                                        <p className="text-lg font-bold text-blue-400">{fetchedStudent.admissionNumber}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Gender</p>
                                                        <p className="text-lg font-bold">{fetchedStudent.gender}</p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 mt-6">
                                                    <button
                                                        onClick={prevStep}
                                                        className="px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
                                                    >
                                                        <ArrowLeft className="w-5 h-5" /> Back
                                                    </button>
                                                    <button
                                                        onClick={() => { nextStep(); startCamera(); }}
                                                        className="flex-1 py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                                                    >
                                                        Proceed to Camera <Camera className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Camera Mode */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="bg-slate-900 rounded-[2.5rem] border border-white/10 p-4 shadow-3xl overflow-hidden">
                                <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden group">
                                    {!capturedImage ? (
                                        <>
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                className="w-full h-full object-cover mirror"
                                            />
                                            <div className="absolute inset-0 border-[40px] border-black/20 pointer-events-none ring-1 ring-white/20 ring-inset"></div>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-blue-400/50 rounded-full flex items-center justify-center">
                                                <User className="w-12 h-12 text-blue-400/30" />
                                            </div>
                                        </>
                                    ) : (
                                        <img
                                            src={capturedImage}
                                            alt="Captured"
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    {/* Camera Status Overlay */}
                                    <div className="absolute top-6 left-6 flex items-center gap-3">
                                        <div className="px-3 py-1 bg-red-600 rounded-full flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Live Preview</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {!capturedImage ? (
                                        <>
                                            <button
                                                onClick={stopCamera}
                                                className="px-8 py-4 bg-slate-800 rounded-2xl font-bold hover:bg-slate-700 transition-all text-slate-300"
                                            >
                                                Skip For Now
                                            </button>
                                            <button
                                                onClick={capturePhoto}
                                                className="px-8 py-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl font-bold flex flex-col items-center justify-center gap-2 transform -translate-y-12 shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all text-xl"
                                            >
                                                <Camera className="w-8 h-8" /> Capture
                                            </button>
                                            <div className="hidden sm:block"></div>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleRetake}
                                                className="px-8 py-4 bg-slate-800 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                                            >
                                                <RefreshCw className="w-5 h-5" /> Retake
                                            </button>
                                            <button
                                                onClick={() => { setIsPreviewMode(true); nextStep(); }}
                                                className="px-8 py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 col-span-1 sm:col-span-2 shadow-xl shadow-blue-500/20"
                                            >
                                                Keep & Preview <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <canvas ref={canvasRef} className="hidden" />
                        </motion.div>
                    )}

                    {/* STEP 4: Final Preview & Export */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Card Rendering Area */}
                            <div className="flex justify-center">
                                <div
                                    ref={cardPreviewRef}
                                    className={cn(
                                        "w-[350px] aspect-[1/1.586] rounded-[24px] overflow-hidden shadow-2xl border border-white/10 relative",
                                        selectedTemplate?.colors.bg || 'bg-slate-900'
                                    )}
                                >
                                    {/* Background Decor */}
                                    <div className={cn("absolute top-0 right-0 w-3/4 h-3/4 opacity-20 rounded-bl-full", selectedTemplate?.colors.accent)} />
                                    <div className={cn("absolute bottom-0 left-0 w-1/2 h-1/2 opacity-10 rounded-tr-full", selectedTemplate?.colors.accent)} />

                                    <div className="relative z-10 p-8 h-full flex flex-col items-center">
                                        <div className="w-full flex justify-between items-center mb-8">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-lg", selectedTemplate?.colors.accent)}>ID</div>
                                                <span className={cn("text-xs font-black tracking-widest uppercase", selectedTemplate?.colors.text)}>CardFlow</span>
                                            </div>
                                            <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center">
                                                <Smartphone className="w-6 h-6 text-white/40" />
                                            </div>
                                        </div>

                                        <div className="relative mb-6">
                                            <div className={cn("w-36 h-36 rounded-2xl border-4 overflow-hidden bg-slate-800 shadow-xl", selectedTemplate?.colors.accent.replace('bg-', 'border-'))}>
                                                {capturedImage ? (
                                                    <img src={capturedImage} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <User className="w-16 h-16 text-slate-700" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={cn("absolute -bottom-3 -right-3 w-10 h-10 rounded-full border-4 border-[#020817] flex items-center justify-center", selectedTemplate?.colors.accent)}>
                                                <Check className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                        <div className="text-center space-y-2 mb-10">
                                            <h3 className={cn("text-2xl font-black tracking-tight", selectedTemplate?.colors.text)}>
                                                {fetchedStudent?.name || "John Doe"}
                                            </h3>
                                            <p className={cn("text-sm font-bold uppercase tracking-[0.2em]", selectedTemplate?.colors.subtext)}>
                                                {fetchedStudent?.department || "General Member"}
                                            </p>
                                        </div>

                                        <div className="w-full mt-auto bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/5 grid grid-cols-2 gap-4">
                                            <div>
                                                <p className={cn("text-[9px] uppercase font-black tracking-wider opacity-60", selectedTemplate?.colors.text)}>ID Number</p>
                                                <p className={cn("text-sm font-mono font-bold", selectedTemplate?.colors.text)}>{fetchedStudent?.admissionNumber}</p>
                                            </div>
                                            <div>
                                                <p className={cn("text-[9px] uppercase font-black tracking-wider opacity-60", selectedTemplate?.colors.text)}>Valid Thru</p>
                                                <p className={cn("text-sm font-mono font-bold", selectedTemplate?.colors.text)}>2024 - 2028</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className={cn("text-[9px] uppercase font-black tracking-wider opacity-60", selectedTemplate?.colors.text)}>Organization</p>
                                                <p className={cn("text-sm font-bold", selectedTemplate?.colors.text)}>{fetchedStudent?.organization}</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 opacity-20">
                                            <ImageIcon className="w-12 h-12 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Controls */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-4xl font-black mb-4">Identity Ready.</h2>
                                    <p className="text-xl text-slate-400">Your enterprise ID card has been generated with all verified details.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-6">
                                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Verification Successful</h4>
                                            <p className="text-sm text-slate-500">All data elements matched and verified with institution records.</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                        <button
                                            onClick={() => setStep(3)}
                                            className="px-10 py-5 bg-slate-900 border border-white/10 text-white rounded-2xl font-bold flex-1 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw className="w-5 h-5" /> Retake Photo
                                        </button>
                                        <button
                                            onClick={generatePDF}
                                            className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black flex-[1.5] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/40 text-lg"
                                        >
                                            <Download className="w-6 h-6" /> Generate Official PDF
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setStep(1);
                                            setFetchedStudent(null);
                                            setCapturedImage(null);
                                            setAdmissionNumber('');
                                            setSelectedGender(null);
                                        }}
                                        className="w-full py-4 text-slate-500 font-bold hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        Start New Capture
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* CSS Utility for Camera Mirror */}
            <style>{`
        .mirror {
          transform: scaleX(-1);
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
        </div>
    );
}
