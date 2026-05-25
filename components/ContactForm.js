"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "919849016794"; // Example: "919876543210"

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  enquiryType: "",
  message: "",
};

function buildWhatsAppMessage(form, page) {
  return `Hello Metro TV Telugu Team,

I would like to connect regarding:
${form.enquiryType || "General Enquiry"}

Name: ${form.name || "-"}
Phone: ${form.phone || "-"}
Email: ${form.email || "-"}
Company / Organisation: ${form.company || "-"}

Message:
${form.message || "-"}

Source: Metro TV Telugu Website
Page: ${page || "/contact"}`;
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submittedForm, setSubmittedForm] = useState(null);
  const [submittedPage, setSubmittedPage] = useState("/contact");
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("loading");
    setNotice("");

    const page = window.location.pathname;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          page,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit enquiry");
      }

      setSubmittedForm(form);
      setSubmittedPage(page);
      setStatus("success");
      setNotice("Thank you. Your enquiry has been submitted successfully.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setNotice(error.message || "Something went wrong. Please try again.");
    }
  }

  const whatsappUrl =
    submittedForm && status === "success"
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          buildWhatsAppMessage(submittedForm, submittedPage)
        )}`
      : "";

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="input"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="input"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone / WhatsApp Number"
        className="input"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Company / Organisation"
        className="input"
        value={form.company}
        onChange={handleChange}
      />

      <select
        name="enquiryType"
        className="input"
        value={form.enquiryType}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select enquiry type
        </option>
        <option>Advertising / Sponsorship</option>
        <option>News / Editorial</option>
        <option>Event Coverage</option>
        <option>Video Promotion</option>
        <option>Partnership</option>
        <option>Careers</option>
        <option>General Enquiry</option>
      </select>

      <textarea
        name="message"
        placeholder="Tell us about your requirement"
        className="textarea"
        value={form.message}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="btn-primary w-fit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </button>

      {notice && (
        <div
          className="rounded-2xl border p-4 text-sm"
          style={{
            borderColor:
              status === "success"
                ? "rgba(34,197,94,0.35)"
                : "rgba(239,68,68,0.35)",
            background:
              status === "success"
                ? "rgba(34,197,94,0.08)"
                : "rgba(239,68,68,0.08)",
            color: "var(--text)",
          }}
        >
          {notice}
        </div>
      )}

      {status === "success" && submittedForm && (
        <div className="glass rounded-3xl p-5">
          <h3 className="text-lg font-semibold">
            Continue the conversation on WhatsApp
          </h3>

          <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
            Open WhatsApp with the enquiry details already prepared as a structured message.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary mt-5 w-fit"
          >
            Continue on WhatsApp
          </a>
        </div>
      )}
    </form>
  );
}