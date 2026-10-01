import { useRef, useState } from "react";
import "@/styles/contact-form.css";

type Field = "name" | "email" | "subject" | "message";
type FormData = Record<Field, string>;
const initialForm: FormData = { name: "", email: "", subject: "", message: "" };
const fields: { name: Field; label: string; placeholder: string }[] = [
  { name: "name", label: "Name", placeholder: "Your name" },
  { name: "email", label: "Email", placeholder: "you@example.com" },
  {
    name: "subject",
    label: "Subject",
    placeholder: "What would you like to discuss?",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "A little about your project or question…",
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Partial<FormData> = {};
    for (const field of fields) {
      if (!formData[field.name].trim())
        nextErrors[field.name] = field.label + " is required.";
    }
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      nextErrors.email = "Enter a valid email address.";
    if (formData.message.trim() && formData.message.trim().length < 10)
      nextErrors.message = "Please write at least 10 characters.";
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      requestAnimationFrame(() => {
        const control = formRef.current?.querySelector<HTMLElement>(
          '[name="' + firstError + '"]',
        );
        control?.focus({ preventScroll: true });
        control?.closest(".form-field")?.scrollIntoView({
          block: "center",
          behavior: "instant",
        });
      });
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Message delivery failed");
      setStatus("success");
      setFormData(initialForm);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <p className="form-note">All fields are required.</p>
      {fields.map((field) => {
        const props = {
          id: "contact-" + field.name,
          name: field.name,
          value: formData[field.name],
          onChange: handleChange,
          placeholder: field.placeholder,
          required: true,
          "aria-invalid": Boolean(errors[field.name]),
          "aria-describedby": errors[field.name]
            ? "error-" + field.name
            : undefined,
        };
        return (
          <div className="form-field" key={field.name}>
            <label htmlFor={props.id}>{field.label}</label>
            {field.name === "message" ? (
              <textarea {...props} rows={5} />
            ) : (
              <input
                {...props}
                type={field.name === "email" ? "email" : "text"}
                autoComplete={
                  field.name === "name" || field.name === "email"
                    ? field.name
                    : undefined
                }
              />
            )}
            {errors[field.name] && (
              <p id={"error-" + field.name} className="field-error">
                {errors[field.name]}
              </p>
            )}
          </div>
        );
      })}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      {status === "success" && (
        <p role="status" className="form-success">
          Thanks — your message is sent. I’ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="field-error">
          Your message could not be sent. Try again, or{" "}
          <a href="mailto:euaelmeko@gmail.com">email me directly</a>.
        </p>
      )}
    </form>
  );
}
