export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  required = false,
  as = "input",
  rows = 4,
}) {
  const baseClassName =
    "w-full rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/[0.06]";

  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-medium text-white/80">{label}</span>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          required={required}
          className={baseClassName}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className={baseClassName}
        />
      )}
    </label>
  );
}
