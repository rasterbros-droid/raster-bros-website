"use client";
import { X, Upload, FileText, Image as ImageIcon, File, Trash2, CheckCircle, Clapperboard } from "lucide-react";
import { useState, useEffect } from "react";

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwTcX8HSVbP5N38J-r9xVC9WmX8Pcu677KGyzSSjKdoa5XWa5NIZG9vdSsxaZi8tlMP/exec";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function ApplicationFormModal({ isOpen, onClose }: ApplicationFormModalProps) {
  const [files, setFiles]               = useState<File[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown]       = useState(5);
  const [errors, setErrors]             = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName:       "",
    phone:          "",
    age:            "",
    city:           "",
    filmBackground: "",
    interestedIn:   "Select one",
    availability:   "Full-time",
  });

  useEffect(() => {
    if (!showThankYou) return;
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(interval); setShowThankYou(false); onClose(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showThankYou]);

  if (!isOpen) return null;

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const valid = Array.from(e.target.files).filter((f) => allowedTypes.includes(f.type));
      setFiles((prev) => [...prev, ...valid]);
    }
  };

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf"))   return <FileText className="h-5 w-5 text-red-400" />;
    if (type.includes("image")) return <ImageIcon className="h-5 w-5 text-blue-400" />;
    return <File className="h-5 w-5 text-gray-400" />;
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name — letters and spaces only
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Name must contain letters only.";
    }

    // Phone — exactly 10 digits, valid Indian mobile (starts with 6-9)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9][0-9]{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    // Age — between 10 and 99
    const age = Number(formData.age);
    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (age < 10 || age > 99) {
      newErrors.age = "Age must be between 10 and 99.";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    // Interested In
    if (formData.interestedIn === "Select one") {
      newErrors.interestedIn = "Please select a role.";
    }

    // File size check
    const oversized = files.filter((f) => f.size > 3 * 1024 * 1024);
    if (oversized.length > 0) {
      newErrors.files = `"${oversized[0].name}" is over 3MB. Please remove it.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setShowThankYou(true);

    const currentFiles    = files;
    const currentFormData = { ...formData };

    setFormData({ fullName: "", phone: "", age: "", city: "", filmBackground: "", interestedIn: "Select one", availability: "Full-time" });
    setFiles([]);
    setErrors({});

    (async () => {
      try {
        const filesPayload = await Promise.all(
          currentFiles.map(async (file) => ({
            name:     file.name,
            mimeType: file.type,
            base64:   await toBase64(file),
          }))
        );

        const payload = {
          fullName:       currentFormData.fullName,
          phone:          currentFormData.phone,
          age:            currentFormData.age,
          city:           currentFormData.city,
          filmBackground: currentFormData.filmBackground,
          interestedIn:   currentFormData.interestedIn,
          availability:   currentFormData.availability,
          files:          filesPayload,
          submittedAt:    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        };

        await fetch(GOOGLE_SCRIPT_URL, {
          method:  "POST",
          headers: { "Content-Type": "text/plain" },
          body:    JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("Background upload note:", err);
      }
    })();
  };

  return (
    <>
      {!showThankYou && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div className="relative w-full max-w-lg bg-[#0a0a14] rounded-xl overflow-hidden border border-neutral-800/70 shadow-2xl shadow-black/70 max-h-[90vh] flex flex-col">

            <div className="px-6 py-5 border-b border-neutral-800/60">
              <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-orange-400 transition-colors" aria-label="Close">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold uppercase tracking-wider text-center text-orange-500/90">
                APPLICATION FORM
              </h2>
              <p className="text-center text-neutral-400 text-xs mt-1.5 leading-relaxed">
                Serious students & filmmakers only — join our active production studio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 flex-1 overflow-y-auto">

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">FULL NAME</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                  placeholder="Letters only"
                  className={`w-full px-4 py-2.5 bg-[#0f0f1a] border rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none transition-all ${errors.fullName ? "border-red-500/70" : "border-neutral-700/70 focus:border-orange-600/50"}`} />
                {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">PHONE NUMBER</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-4 py-2.5 bg-[#0f0f1a] border rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none transition-all ${errors.phone ? "border-red-500/70" : "border-neutral-700/70 focus:border-orange-600/50"}`} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">AGE</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange}
                  placeholder="Between 10 and 99"
                  min={10} max={99}
                  className={`w-full px-4 py-2.5 bg-[#0f0f1a] border rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none transition-all ${errors.age ? "border-red-500/70" : "border-neutral-700/70 focus:border-orange-600/50"}`} />
                {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">CITY</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-[#0f0f1a] border rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none transition-all ${errors.city ? "border-red-500/70" : "border-neutral-700/70 focus:border-orange-600/50"}`} />
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">FILM / MEDIA BACKGROUND</label>
                <input type="text" name="filmBackground" value={formData.filmBackground} onChange={handleChange}
                  placeholder="e.g. Film school, self-taught, short films..."
                  className="w-full px-4 py-2.5 bg-[#0f0f1a] border border-neutral-700/70 rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-orange-600/50 transition-all" />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">INTERESTED IN</label>
                <select name="interestedIn" value={formData.interestedIn} onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-[#0f0f1a] border rounded-md text-white text-sm focus:outline-none transition-all appearance-none ${errors.interestedIn ? "border-red-500/70" : "border-neutral-700/70 focus:border-orange-600/50"}`}>
                  <option>Select one</option>
                  <option>Direction / AD</option>
                  <option>Cinematography</option>
                  <option>Editing / Post</option>
                  <option>Sound Design</option>
                  <option>Production</option>
                  <option>Other</option>
                </select>
                {errors.interestedIn && <p className="text-red-400 text-xs mt-1">{errors.interestedIn}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  RESUME / SHOWREEL / PORTFOLIO
                  <span className="text-neutral-600 normal-case font-normal ml-1">(max 3MB per file)</span>
                </label>

                {files.length === 0 ? (
                  <label className="w-full px-4 py-5 bg-[#0f0f1a] border-2 border-dashed border-neutral-700/70 rounded-lg text-center hover:border-orange-600/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                    <Upload className="h-7 w-7 text-neutral-500 mb-2" />
                    <span className="text-sm text-neutral-400">Click or drag files here</span>
                    <span className="text-xs text-neutral-600 mt-1">PDF · JPG · PNG · DOC — saved to Drive</span>
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileChange} className="hidden" />
                  </label>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-[#0f0f1a] border border-neutral-700/70 rounded-md px-3 py-2 text-sm">
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <span className="text-neutral-300 truncate max-w-[160px]">{file.name}</span>
                            <span className={`text-xs ${file.size > 3 * 1024 * 1024 ? "text-red-400" : "text-neutral-600"}`}>
                              ({(file.size / 1024).toFixed(0)} KB)
                            </span>
                          </div>
                          <button type="button" onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="w-full px-4 py-3 bg-[#0f0f1a] border border-dashed border-neutral-600 rounded-lg text-center text-sm text-neutral-400 hover:text-orange-400 hover:border-orange-600/50 transition-colors cursor-pointer flex items-center justify-center gap-2">
                      <Upload size={16} /> Add more files
                      <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                )}
                {errors.files && <p className="text-red-400 text-xs mt-2 font-medium">{errors.files}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">AVAILABILITY</label>
                <select name="availability" value={formData.availability} onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#0f0f1a] border border-neutral-700/70 rounded-md text-white text-sm focus:outline-none focus:border-orange-600/50 transition-all appearance-none">
                  <option>Full-time</option>
                  <option>Weekends only</option>
                  <option>Flexible</option>
                </select>
              </div>

              <div className="mt-6 text-center">
                <button type="submit"
                  className="px-10 py-3 bg-gradient-to-r from-orange-700 to-orange-600 hover:from-orange-600 hover:to-orange-500 text-white font-semibold uppercase tracking-wider text-sm rounded-lg shadow-lg hover:shadow-orange-600/30 transform hover:scale-[1.03] active:scale-95 transition-all duration-300 border border-orange-600/20">
                  SUBMIT APPLICATION
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4">
          <div className="relative w-full max-w-sm bg-[#0a0a14] rounded-2xl overflow-hidden border border-orange-600/30 shadow-2xl shadow-orange-900/20 flex flex-col items-center text-center px-8 py-10 animate-[fadeScaleIn_0.4s_ease-out]">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700" />
            <div className="mb-5 relative">
              <div className="w-16 h-16 rounded-full bg-orange-600/10 border border-orange-600/30 flex items-center justify-center">
                <Clapperboard className="w-8 h-8 text-orange-500" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest text-orange-500 mb-2">LIGHTS. CAMERA.</h2>
            <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">Application Received.</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              We've captured your reel. Our team at{" "}
              <span className="text-orange-400 font-semibold">RasterBros</span> will
              review your application and get back to you — we only call in the best.
            </p>
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#1a1a2e" strokeWidth="4" />
                <circle cx="24" cy="24" r="20" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - countdown / 5)}`}
                  style={{ transition: "stroke-dashoffset 0.9s linear" }} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-orange-400">{countdown}</span>
            </div>
            <p className="text-neutral-600 text-[11px] mt-2 uppercase tracking-widest">closing in {countdown}s</p>
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-700" />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}