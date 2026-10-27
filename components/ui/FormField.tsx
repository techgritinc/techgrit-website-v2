import { useId } from "react";
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  label: ReactNode;
  hideLabel?: boolean;
  error?: string | null;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  reserveErrorSpace?: boolean;
  multiline?: boolean;
  rows?: TextareaHTMLAttributes<HTMLTextAreaElement>["rows"];
  inputClassName?: string;
  /** When provided, completely replaces the default INPUT_BASE styles instead of appending. */
  inputBaseClassName?: string;
};

export const INPUT_BASE =
  "w-full rounded-[10px] border bg-glass-strong px-4 py-3.5 text-base sm:text-sm leading-[normal] font-normal text-primary outline-none transition-colors placeholder:!font-light focus:bg-glass-hover focus:border-border-orange-strong";

export const REQUIRED_ASTERISK = <span className="text-orange"> *</span>;

/** Shared labeled input primitive (FR-015) for the subscribe form; `multiline` renders a textarea instead. */
export default function FormField({
  label,
  hideLabel = true,
  error,
  containerClassName,
  labelClassName,
  errorClassName,
  reserveErrorSpace = false,
  inputClassName,
  inputBaseClassName,
  type = "text",
  multiline = false,
  rows = 4,
  required = false,
  ...rest
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  const base = inputBaseClassName ?? INPUT_BASE;

  return (
    <div className={containerClassName}>
      <label
        htmlFor={id}
        className={
          hideLabel
            ? "sr-only"
            : labelClassName || "mb-2 block text-[13.5px] font-bold text-text-60"
        }
      >
        {label}
        {required && !hideLabel && REQUIRED_ASTERISK}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={[
            base,
            inputBaseClassName ? undefined : "border-border-strong resize-none",
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={[base, inputBaseClassName ? undefined : "border-border-strong", inputClassName]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
      )}
      {reserveErrorSpace ? (
        <div className="mt-2 min-h-[18px]">
          {error && (
            <p id={errorId} role="alert" className={errorClassName ?? "text-2xs text-error"}>
              {error}
            </p>
          )}
        </div>
      ) : (
        error && (
          <p id={errorId} role="alert" className={errorClassName ?? "mt-2 text-2xs text-error"}>
            {error}
          </p>
        )
      )}
    </div>
  );
}
