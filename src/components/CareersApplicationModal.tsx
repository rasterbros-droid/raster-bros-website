import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface CareersApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleTitle?: string;
}

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwTcX8HSVbP5N38J-r9xVC9WmX8Pcu677KGyzSSjKdoa5XWa5NIZG9vdSsxaZi8tlMP/exec";

const PROGRESS_LABELS = [
  "About You",
  "What You Do",
  "Show Your Work",
  "Final Details",
];

const DEPARTMENTS = [
  "Editing",
  "Direction",
  "Design",
  "Production",
  "Cinematography",
  "Motion",
  "Sound",
  "Client Partnerships",
  "Other",
];

const EXPERIENCE_OPTIONS = ["Fresher", "<1 yr", "1 - 3 yrs", "3+ yrs"];

const TOOL_OPTIONS = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Photoshop",
  "Illustrator",
  "Figma",
  "Blender",
  "Final Cut Pro",
  "CapCut",
  "Notion",
];

const emptyForm = {
  fullName: "",
  age: "",
  phone: "",
  email: "",
  designation: "",
  experience: "",
  interestedIn: "",
  tools: [] as string[],
  customTools: "",
  portfolioLink: "",
  instagramProfile: "",
  city: "",
  currentLpa: "",
  whyRasterBros: "",
};

const isValidUrl = (value: string) => {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export default function CareersApplicationModal({
  isOpen,
  onClose,
  roleTitle,
}: CareersApplicationModalProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState(emptyForm);

  const totalSteps = PROGRESS_LABELS.length;

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setErrors({});
      setSubmitted(false);
      setSubmitting(false);
      setFormData(emptyForm);
    }
  }, [isOpen]);

  const canGoBack = step > 0 && !submitting;

  const selectedToolsText = useMemo(() => {
    const merged = [...formData.tools];
    if (formData.customTools.trim()) {
      merged.push(formData.customTools.trim());
    }
    return merged.join(", ");
  }, [formData.tools, formData.customTools]);

  if (!isOpen) return null;

  const setField = (name: keyof typeof emptyForm, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleTool = (tool: string) => {
    setFormData((prev) => {
      const next = prev.tools.includes(tool)
        ? prev.tools.filter((item) => item !== tool)
        : [...prev.tools, tool];
      return { ...prev, tools: next };
    });
    setErrors((prev) => ({ ...prev, tools: "" }));
  };

  const validateStep = (stepToValidate: number) => {
    const nextErrors: Record<string, string> = {};

    if (stepToValidate === 0) {
      if (!formData.fullName.trim()) nextErrors.fullName = "Full Name is required.";
      if (!formData.age.trim()) {
        nextErrors.age = "Age is required.";
      } else {
        const age = Number(formData.age);
        if (Number.isNaN(age) || age < 16 || age > 80) {
          nextErrors.age = "Enter a valid age between 16 and 80.";
        }
      }
      if (!formData.phone.trim()) {
        nextErrors.phone = "Phone Number is required.";
      } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
        nextErrors.phone = "Enter a valid phone number.";
      }
      if (!formData.email.trim()) {
        nextErrors.email = "Email Address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        nextErrors.email = "Enter a valid email address.";
      }
    }

    if (stepToValidate === 1) {
      if (!formData.designation.trim()) nextErrors.designation = "Current Designation is required.";
      if (!formData.experience.trim()) nextErrors.experience = "Please select your experience level.";
      if (!formData.interestedIn.trim()) nextErrors.interestedIn = "Please select a department.";
      if (!formData.tools.length && !formData.customTools.trim()) {
        nextErrors.tools = "Add at least one tool/software.";
      }
    }

    if (stepToValidate === 2) {
      if (!formData.portfolioLink.trim()) {
        nextErrors.portfolioLink = "Portfolio Link is required.";
      } else if (!isValidUrl(formData.portfolioLink.trim())) {
        nextErrors.portfolioLink = "Enter a valid URL (https://...).";
      }
      if (formData.instagramProfile.trim() && !isValidUrl(formData.instagramProfile.trim())) {
        nextErrors.instagramProfile = "Enter a valid Instagram URL.";
      }
    }

    if (stepToValidate === 3) {
      if (!formData.city.trim()) nextErrors.city = "Current Address (City) is required.";
      if (!formData.whyRasterBros.trim()) {
        nextErrors.whyRasterBros = "Tell us why RasterBros in one line.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const goBack = () => {
    if (!canGoBack) return;
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep(3)) return;

    setSubmitting(true);

    try {
      const payload = {
        formType: "careers",
        appliedRole: roleTitle || "General Application",
        fullName: formData.fullName.trim(),
        age: formData.age.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        designation: formData.designation.trim(),
        experience: formData.experience,
        interestedIn: formData.interestedIn,
        tools: selectedToolsText,
        portfolioLink: formData.portfolioLink.trim(),
        instagramProfile: formData.instagramProfile.trim(),
        city: formData.city.trim(),
        currentLpa: formData.currentLpa.trim(),
        whyRasterBros: formData.whyRasterBros.trim(),
        submittedAt: new Date().toISOString(),
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
      setFormData(emptyForm);
      setErrors({});
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1400);
    } catch (error) {
      console.warn("Careers form submission note:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/12 bg-[#090b13] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="absolute right-4 top-4 rounded-full border border-white/15 p-2 text-white/70 transition hover:text-white disabled:cursor-not-allowed"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-white/10 px-6 py-5 sm:px-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">Studio Entry</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl">Apply to Raster Bros</h2>
          <p className="mt-1 text-sm text-white/60">Not a job application. A studio entry.</p>
          {roleTitle && (
            <p className="mt-3 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-white/80">
              Applying for: {roleTitle}
            </p>
          )}

          <div className="mt-5 grid grid-cols-4 gap-2">
            {PROGRESS_LABELS.map((label, index) => {
              const active = index <= step;
              return (
                <div key={label} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      active ? "bg-white" : "bg-white/20"
                    }`}
                  />
                  <p className={`text-[11px] ${active ? "text-white/80" : "text-white/45"}`}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 sm:px-8 sm:py-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22 }}
              className="space-y-4"
            >
              {step === 0 && (
                <>
                  <InputField
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(value) => setField("fullName", value)}
                    placeholder="Your full name"
                    error={errors.fullName}
                    required
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                      label="Age"
                      value={formData.age}
                      onChange={(value) => setField("age", value)}
                      placeholder="e.g. 24"
                      inputMode="numeric"
                      error={errors.age}
                      required
                    />
                    <InputField
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(value) => setField("phone", value)}
                      placeholder="+91 XXXXX XXXXX"
                      error={errors.phone}
                      required
                    />
                  </div>
                  <InputField
                    label="Email Address"
                    value={formData.email}
                    onChange={(value) => setField("email", value)}
                    placeholder="you@domain.com"
                    type="email"
                    error={errors.email}
                    required
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <InputField
                    label="Current Designation"
                    value={formData.designation}
                    onChange={(value) => setField("designation", value)}
                    placeholder="Student / Freelancer / Job / Other"
                    error={errors.designation}
                    required
                  />

                  <SelectField
                    label="Experience"
                    value={formData.experience}
                    onChange={(value) => setField("experience", value)}
                    options={EXPERIENCE_OPTIONS}
                    placeholder="Select experience"
                    error={errors.experience}
                    required
                  />

                  <SelectField
                    label="Interested In"
                    value={formData.interestedIn}
                    onChange={(value) => setField("interestedIn", value)}
                    options={DEPARTMENTS}
                    placeholder="Choose department"
                    error={errors.interestedIn}
                    required
                  />

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/60">
                      Tools / Softwares
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TOOL_OPTIONS.map((tool) => {
                        const selected = formData.tools.includes(tool);
                        return (
                          <button
                            key={tool}
                            type="button"
                            onClick={() => toggleTool(tool)}
                            className={`rounded-full border px-3 py-1.5 text-xs transition ${
                              selected
                                ? "border-white bg-white text-black"
                                : "border-white/20 bg-white/[0.03] text-white/75 hover:border-white/45"
                            }`}
                          >
                            {tool}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      value={formData.customTools}
                      onChange={(e) => setField("customTools", e.target.value)}
                      placeholder="Or type tools (comma separated)"
                      className="mt-3 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-white/50 focus:outline-none"
                    />
                    {errors.tools && <p className="mt-1.5 text-xs text-red-300">{errors.tools}</p>}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <InputField
                    label="Portfolio Link"
                    value={formData.portfolioLink}
                    onChange={(value) => setField("portfolioLink", value)}
                    placeholder="https://portfolio.com"
                    error={errors.portfolioLink}
                    required
                  />
                  <InputField
                    label="Instagram Profile"
                    value={formData.instagramProfile}
                    onChange={(value) => setField("instagramProfile", value)}
                    placeholder="https://instagram.com/yourprofile"
                    error={errors.instagramProfile}
                    helper="Optional but recommended"
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <InputField
                    label="Current Address"
                    value={formData.city}
                    onChange={(value) => setField("city", value)}
                    placeholder="City only"
                    error={errors.city}
                    required
                  />
                  <InputField
                    label="Current LPA"
                    value={formData.currentLpa}
                    onChange={(value) => setField("currentLpa", value)}
                    placeholder="Optional"
                    helper="Optional"
                  />
                  <TextAreaField
                    label="Why RasterBros?"
                    value={formData.whyRasterBros}
                    onChange={(value) => setField("whyRasterBros", value)}
                    placeholder="One line on why you want to enter Raster Bros"
                    error={errors.whyRasterBros}
                    rows={3}
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              className="inline-flex items-center gap-1 rounded-xl border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white/45 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            {step < totalSteps - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-1 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </div>

      {submitted && (
        <div className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center px-4">
          <div className="rounded-2xl border border-white/15 bg-black/85 px-6 py-4 text-center backdrop-blur-md">
            <p className="font-display text-xl">Application submitted.</p>
            <p className="mt-1 text-sm text-white/70">Our team will review and get back to you.</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  error?: string;
  helper?: string;
  required?: boolean;
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  error,
  helper,
  required,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-white/60">
        {label} {required && <span className="text-white/95">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={`w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none ${
          error ? "border-red-400/80" : "border-white/15 focus:border-white/50"
        }`}
      />
      {helper && !error && <p className="mt-1.5 text-xs text-white/50">{helper}</p>}
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  required?: boolean;
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-white/60">
        {label} {required && <span className="text-white/95">*</span>}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-[#101420] px-4 py-2.5 text-sm text-white focus:outline-none ${
          error ? "border-red-400/80" : "border-white/15 focus:border-white/50"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </label>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 3,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-white/60">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none ${
          error ? "border-red-400/80" : "border-white/15 focus:border-white/50"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </label>
  );
}
