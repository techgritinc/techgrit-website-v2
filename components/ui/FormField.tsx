import { useId } from "react";
import type { InputHTMLAttributes } from "react";

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  label: string;
  error?: string | null;
  containerClassName?: string;
  inputClassName?: string;
};

const INPUT_BASE =
  "w-full rounded-[10px] border bg-glass-strong px-4 py-3.5 text-sm leading-[normal] font-normal text-primary outline-none transition-colors placeholder:!font-light focus:bg-glass-hover";

/** Shared labeled input primitive (FR-015) for the subscribe form. */
export default function FormField({
  label,
  error,
  containerClassName,
  inputClassName,
  type = "text",
  ...rest
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={[INPUT_BASE, "border-border-strong", inputClassName].filter(Boolean).join(" ")}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-2xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
