import { useId } from "react";
import type { InputHTMLAttributes } from "react";

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  label: string;
  error?: string | null;
  containerClassName?: string;
};

const INPUT_BASE =
  "w-full rounded-[10px] border bg-glass-strong px-4 py-3.5 text-sm leading-[normal] font-normal text-primary outline-none transition-colors placeholder:!font-light focus:bg-glass-hover";

/** Shared labeled input primitive (FR-015) for the subscribe form. */
export default function FormField({
  label,
  error,
  containerClassName,
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
        className={[INPUT_BASE, error ? "border-error" : "border-border-strong"].join(" ")}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-semibold text-error">
          {error}
        </p>
      )}
    </div>
  );
}
