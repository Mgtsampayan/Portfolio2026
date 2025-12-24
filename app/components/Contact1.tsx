"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { contactInfo } from '@/lib/data';

type FormState = {
    name: string;
    email: string;
    message: string;
};

type ApiResponse =
    | { ok: true; message: string }
    | { ok: false; message: string; code?: string };

export default function Contact() {
    const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    // Client-side validation
    const validate = (data: FormState): Partial<Record<keyof FormState, string>> => {
        const errors: Partial<Record<keyof FormState, string>> = {};

        if (!data.name.trim()) {
            errors.name = "Name is required";
        } else if (data.name.length > 100) {
            errors.name = "Name is too long (max 100 characters)";
        }

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!data.message.trim()) {
            errors.message = "Message is required";
        } else if (data.message.length < 10) {
            errors.message = "Message is too short (min 10 characters)";
        } else if (data.message.length > 2000) {
            errors.message = "Message is too long (max 2000 characters)";
        }

        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name as keyof FormState]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }

        // Clear status message when user starts typing
        if (status) setStatus(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);

        // Validate
        const validationErrors = validate(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setStatus({
                type: "error",
                message: "Please fix the errors above"
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data: ApiResponse = await res.json();

            if (!res.ok || !data.ok) {
                throw new Error(data.message || "Failed to send message");
            }

            // Success!
            setStatus({
                type: "success",
                message: data.message
            });
            setForm({ name: "", email: "", message: "" });

        } catch (err) {
            console.error("Form submission error:", err);
            setStatus({
                type: "error",
                message: err instanceof Error ? err.message : "Network error. Please try again."
            });
        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    };

    return (
        <section id="contact" className="py-20 bg-background dark:bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="sm:text-center">
                    <h2 className="text-base text-primary dark:text-primary font-semibold tracking-wide uppercase">
                        Contact
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold text-foreground dark:text-foreground sm:text-4xl lg:text-5xl">
                        Get in touch with us
                    </p>
                    <p className="mt-4 text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto">
                        Have questions or inquiries? Fill out the form and we'll get back to you as soon as possible.
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <div
                        className={`mt-8 p-4 rounded-lg border flex items-center gap-3 max-w-2xl mx-auto ${status.type === "success"
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                            : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
                            }`}
                        role="alert"
                    >
                        {status.type === "success" ? (
                            <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        )}
                        <p>{status.message}</p>
                    </div>
                )}

                {/* Grid layout */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Contact details card */}
                    <div className="p-8 bg-card dark:bg-card border border-border dark:border-border rounded-2xl shadow-sm">
                        <h3 className="text-xl font-semibold text-foreground dark:text-foreground">
                            Contact Details
                        </h3>
                        <p className="mt-4 text-muted-foreground dark:text-muted-foreground">
                            Reach us directly through the following channels.
                        </p>

                        <div className="mt-6 space-y-4">
                            {contactInfo.map((c, idx) => (
                                <a
                                    key={idx}
                                    href={c.link}
                                    className="flex items-start gap-4 p-4 rounded-lg border border-border dark:border-border hover:shadow-md hover:border-primary dark:hover:border-primary transition-all duration-200"
                                    aria-label={`Contact method: ${c.title}`}
                                    target={c.link.startsWith('http') ? '_blank' : undefined}
                                    rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    <div>
                                        <c.icon className="h-8 w-8 text-primary dark:text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-foreground dark:text-foreground">
                                            {c.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                            {c.subtitle}
                                        </p>
                                        <p className="mt-1 text-sm text-primary dark:text-primary font-medium">
                                            {c.display}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact form card */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-8 bg-card dark:bg-card border border-border dark:border-border rounded-2xl shadow-sm"
                    >
                        <h3 className="text-xl font-semibold text-foreground dark:text-foreground">
                            Send us a message
                        </h3>

                        <div className="mt-6 space-y-4">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-foreground dark:text-foreground mb-1"
                                >
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    disabled={loading}
                                    className={`mt-1 block w-full rounded-md border shadow-sm py-2 px-3 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${errors.name
                                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                        : "border-input bg-background text-foreground focus:ring-ring focus:border-ring"
                                        }`}
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                    required
                                />
                                {errors.name && (
                                    <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-foreground dark:text-foreground mb-1"
                                >
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    disabled={loading}
                                    className={`mt-1 block w-full rounded-md border shadow-sm py-2 px-3 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${errors.email
                                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                        : "border-input bg-background text-foreground focus:ring-ring focus:border-ring"
                                        }`}
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                    required
                                />
                                {errors.email && (
                                    <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-foreground dark:text-foreground mb-1"
                                >
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your project or question..."
                                    disabled={loading}
                                    className={`mt-1 block w-full rounded-md border shadow-sm py-2 px-3 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${errors.message
                                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                        : "border-input bg-background text-foreground focus:ring-ring focus:border-ring"
                                        }`}
                                    aria-invalid={Boolean(errors.message)}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                    required
                                />
                                {errors.message && (
                                    <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                                        {errors.message}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {form.message.length}/2000 characters
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-between gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </button>

                                <div className="text-sm text-muted-foreground dark:text-muted-foreground flex items-center gap-1">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Secure & Private</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}