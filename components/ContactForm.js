"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  enquiryType: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          page: window.location.pathname,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit enquiry");
      }

      setStatus("success");
      setNotice("Thank you. Your enquiry has been submitted successfully.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setNotice(error.message || "Something went wrong. Please try again.");
    }
  }

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
            borderColor: status === "success" ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)",
            background: status === "success" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
            color: "var(--text)",
          }}
        >
          {notice}
        </div>
      )}
    </form>
  );
}
