"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const emailAddress = "comendadorchristianjohn@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setError(null);
    setIsDemo(false);

    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    const isEmailConfigured = !!(
      web3FormsKey &&
      web3FormsKey !== "your_web3forms_key_here" &&
      web3FormsKey !== ""
    );

    // If neither database nor email triggers are active, fallback to simulation mode
    if (!isFirebaseConfigured && !isEmailConfigured) {
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        setIsDemo(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 6000);
      }, 1000);
      return;
    }

    const promises: Promise<any>[] = [];

    // 1. Queue Firebase save (if configured)
    if (isFirebaseConfigured) {
      promises.push(
        addDoc(collection(db, "messages"), {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          createdAt: serverTimestamp(),
        })
      );
    }

    // 2. Queue Email Notification (if Web3Forms configured)
    if (isEmailConfigured) {
      promises.push(
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Portfolio Message from ${formData.name}`,
            from_name: "Portfolio Contact Form",
          }),
        }).then(async (res) => {
          if (!res.ok) {
            throw new Error(`Web3Forms error status ${res.status}`);
          }
          return res.json();
        })
      );
    }

    try {
      await Promise.all(promises);
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err: any) {
      console.error("Error sending message: ", err);
      setSubmitting(false);
      setError("Failed to send message. Please try again or copy my email address directly.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-glow blur-[150px] pointer-events-none" />

      {/* Starry background glowing dots */}
      <div className="star-glow animate-star-blink absolute top-1/4 left-[15%] w-1.5 h-1.5" style={{ animationDelay: "0.8s" }} />
      <div className="star-glow animate-star-blink absolute bottom-1/4 right-[20%] w-1 h-1" style={{ animationDelay: "1.8s" }} />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Get In <span className="text-gradient-silver">Touch</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Have an exciting project idea, a position to fill, or just want to chat? Drop me a message below!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* Info Details (2 Cols) */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <div className="glass rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="font-bold text-white text-lg border-b border-white/5 pb-3">
                Contact Information
              </h3>

              <div className="flex flex-col gap-4">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-zinc-300 truncate">{emailAddress}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white transition-all duration-300 flex-shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-300">0976-567-9285</span>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-zinc-300">Dasmariñas, Cavite</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="font-bold text-white text-lg">Social Connections</h3>
              <p className="text-sm text-zinc-400">Feel free to connect or follow my work across my social platforms.</p>
              
              <div className="flex gap-4 mt-2">
                <a
                  href="https://github.com/comendadorchristianjohn-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-primary/5 text-zinc-300 hover:text-white transition-all duration-300"
                >
                  <GithubIcon className="w-5 h-5" />
                  <span className="text-xs font-semibold">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/christian-john-comendador-a12b2534b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-secondary/30 hover:bg-secondary/5 text-zinc-300 hover:text-white transition-all duration-300"
                >
                  <LinkedinIcon className="w-5 h-5" />
                  <span className="text-xs font-semibold">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Details (3 Cols) */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 flex flex-col gap-6 border border-white/5">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="johndoe@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
                />
              </div>

              {submitted && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium text-center">
                  {isDemo
                    ? "Demo Mode: Message sent successfully! (To save entries to a real database, configure .env.local with your Firebase credentials.)"
                    : "Message sent successfully! I will get back to you shortly."}
                </div>
              )}

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
