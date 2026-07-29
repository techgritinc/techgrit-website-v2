"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import Modal from "@/components/ui/Modal";

export interface ApplicationContext {
  mode: "role" | "general";
  roleSlug: string | null;
  roleTitle: string | null;
}

type ApplicationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fitStatement: string;
};

type SubmissionStatus = "idle" | "submitted";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_VALUES: ApplicationFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  fitStatement: "",
};

const TITLE_ID = "application-dialog-title";

export function ApplicationDialog({
  isOpen,
  context,
  onClose,
}: {
  isOpen: boolean;
  context: ApplicationContext;
  onClose: () => void;
}) {
  const [values, setValues] = useState<ApplicationFormValues>(EMPTY_VALUES);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setValues(EMPTY_VALUES);
      setStatus("idle");
      setError(null);
    }
  }

  function handleChange(field: keyof ApplicationFormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !values.firstName.trim() ||
      !values.lastName.trim() ||
      !values.phone.trim() ||
      !values.fitStatement.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("submitted");
  }

  const positionLabel = context.mode === "role" ? context.roleTitle : "General Application";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy={TITLE_ID}
      title={
        <h2 id={TITLE_ID} className="text-[13px] font-bold tracking-[0.04em] text-text-60 uppercase">
          {positionLabel}
        </h2>
      }
    >
      {status === "submitted" ? (
        <div className="pt-6 text-center">
          <h3 className="text-2xl font-bold text-primary">Application sent.</h3>
          <p className="mx-auto mt-2.5 max-w-[340px] text-[16px] leading-[1.6] text-text-70">
            Thanks — we&apos;ve received your application and will be in touch soon.
          </p>
          <Button variant="ghost" size="md" onClick={onClose} className="mt-6">
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="First name"
              hideLabel={false}
              name="firstName"
              placeholder="First name"
              required
              value={values.firstName}
              onChange={handleChange("firstName")}
            />
            <FormField
              label="Last name"
              hideLabel={false}
              name="lastName"
              placeholder="Last name"
              required
              value={values.lastName}
              onChange={handleChange("lastName")}
            />
          </div>
          <FormField
            label="Email"
            hideLabel={false}
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={values.email}
            onChange={handleChange("email")}
          />
          <FormField
            label="Phone Number"
            hideLabel={false}
            type="tel"
            name="phone"
            placeholder="Phone number"
            required
            value={values.phone}
            onChange={handleChange("phone")}
          />
          <FormField
            label="Tell us why you are a great fit "
            hideLabel={false}
            name="fitStatement"
            placeholder="Tell us why you're a great fit"
            multiline
            rows={4}
            required
            value={values.fitStatement}
            onChange={handleChange("fitStatement")}
          />

          {error && (
            <p role="alert" className="text-sm font-semibold text-error">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button type="submit" variant="primary" size="md">
              Submit
            </Button>
            <Button type="button" variant="ghost" size="md" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
