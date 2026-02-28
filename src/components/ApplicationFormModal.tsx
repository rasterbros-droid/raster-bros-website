// components/ApplicationFormModal.tsx
"use client";
import { X, Upload, FileText, Image as ImageIcon, File, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationFormModal({ isOpen, onClose }: ApplicationFormModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
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
      const newFiles = Array.from(e.target.files).filter((file) =>
        allowedTypes.includes(file.type)
      );
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="h-5 w-5 text-red-400" />;
    if (type.includes("image")) return <ImageIcon className="h-5 w-5 text-blue-400" />;
    return <File className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="
        relative w-full max-w-lg bg-[#0a0a14] rounded-xl overflow-hidden
        border border-neutral-800/70 shadow-2xl shadow-black/70
        max-h-[90vh] flex flex-col
      ">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-800/60">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-500 hover:text-orange-400 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold uppercase tracking-wider text-center text-orange-500/90">
            APPLICATION FORM
          </h2>

          <p className="text-center text-neutral-400 text-xs mt-1.5 leading-relaxed">
            Serious students & filmmakers only — join our active production studio.
          </p>
        </div>

        {/* Form */}
 {/* <Link href="/" className="group flex items-center gap-2 text-white hover:text-white/70 transition-colors">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/thank-you");
            onClose();
          }}
          className="p-5 sm:p-6 space-y-4 flex-1 overflow-y-auto"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              FULL NAME
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-[#0f0f1a] border border-neutral-700/70 rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-orange-600/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              AGE
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 bg-[#0f0f1a] border border-neutral-700/70 rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-orange-600/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              CITY
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-[#0f0f1a] border border-neutral-700/70 rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-orange-600/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              FILM / MEDIA BACKGROUND
            </label>
            <input
              type="text"
              placeholder="e.g. Film school, self-taught, short films..."
              className="w-full px-4 py-2.5 bg-[#0f0f1a] border border-neutral-700/70 rounded-md text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-orange-600/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              INTERESTED IN
            </label>
            <select className="w-full px-4 py-2.5 bg-[#0f0f1a] border border-neutral-700/70 rounded-md text-white text-sm focus:outline-none focus:border-orange-600/50 transition-all appearance-none">
              <option>Select one</option>
              <option>Direction / AD</option>
              <option>Cinematography</option>
              <option>Editing / Post</option>
              <option>Sound Design</option>
              <option>Production</option>
              <option>Other</option>
            </select>
          </div>

          {/* Multiple File Upload - Your original design unchanged */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              RESUME / SHOWREEL / PORTFOLIO
            </label>

            {files.length === 0 ? (
              <label className="
                w-full px-4 py-5 bg-[#0f0f1a] border-2 border-dashed border-neutral-700/70
                rounded-lg text-center hover:border-orange-600/50 transition-colors cursor-pointer
                flex flex-col items-center justify-center
              ">
                <Upload className="h-7 w-7 text-neutral-500 mb-2" />
                <span className="text-sm text-neutral-400">
                  Click or drag files here
                </span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-[#0f0f1a] border border-neutral-700/70 rounded-md px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.type)}
                        <span className="text-neutral-300 truncate max-w-[180px]">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add more files */}
                <label className="
                  w-full px-4 py-3 bg-[#0f0f1a] border border-dashed border-neutral-600
                  rounded-lg text-center text-sm text-neutral-400 hover:text-orange-400
                  hover:border-orange-600/50 transition-colors cursor-pointer flex items-center justify-center gap-2
                ">
                  <Upload size={16} />
                  Add more files
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Availability */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              AVAILABILITY
            </label>
            <select className="w-full px-4 py-2.5 bg-[#0f0f1a] border border-neutral-700/70 rounded-md text-white text-sm focus:outline-none focus:border-orange-600/50 transition-all appearance-none">
              <option>Full-time</option>
              <option>Weekends only</option>
              <option>Flexible</option>
            </select>
          </div>

          {/* Submit */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="
                px-10 py-3 bg-gradient-to-r from-orange-700 to-orange-600
                hover:from-orange-600 hover:to-orange-500
                text-white font-semibold uppercase tracking-wider text-sm
                rounded-lg shadow-lg hover:shadow-orange-600/30
                transform hover:scale-[1.03] active:scale-95
                transition-all duration-300 border border-orange-600/20
              "
            >
              SUBMIT APPLICATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper function for file icons
function getFileIcon(type: string) {
  if (type.includes("pdf")) return <FileText className="h-5 w-5 text-red-400" />;
  if (type.includes("image")) return <ImageIcon className="h-5 w-5 text-blue-400" />;
  return <File className="h-5 w-5 text-gray-400" />;
}