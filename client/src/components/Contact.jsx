import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { HoverTarget } from '../context/CursorContext';

const GithubIcon = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in every field before sending.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("That email address doesn't look valid.");
      return;
    }

    setIsSubmitting(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd60a', '#ff5ca8', '#2f2bff', '#0e1030']
        });
      } catch (err) {
        // Ignore confetti fallback
      }
    } catch (err) {
      setErrorMsg(
        err.name === 'AbortError'
          ? 'Request timed out — please try again.'
          : 'Something went wrong sending your message. Please try again or email directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#2f2bff] pt-24 text-[#f1f2ff] sm:pt-32">
      <div className="layer mx-auto max-w-7xl px-4 sm:px-8">
        {/* Giant Magnetic Jump Letters */}
        <h2
          className="font-display text-[clamp(2.3rem,9vw,9rem)] font-black leading-[0.9] tracking-[-0.05em]"
          aria-label={portfolioData.contact.headingWords.join(' ')}
        >
          {portfolioData.contact.headingWords.map((word, wIdx) => (
            <span key={wIdx} className="mr-[0.24em] inline-flex" aria-hidden="true">
              {word.split('').map((char, cIdx) => (
                <motion.span
                  key={cIdx}
                  className="inline-block will-change-transform cursor-pointer select-none"
                  initial={{ y: '110%', opacity: 0, rotate: 18 }}
                  whileInView={{ y: '0%', opacity: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 14,
                    delay: wIdx * 0.1 + cIdx * 0.025
                  }}
                  whileHover={{
                    y: -22,
                    rotate: cIdx % 2 ? 14 : -14,
                    color: '#ffd60a'
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h2>

        <p className="mt-8 max-w-xl text-xl text-[#f1f2ff]/85 sm:text-2xl font-medium">
          {portfolioData.contact.subtitle}
        </p>

        {/* Form and Details Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Bold Yellow Form Card */}
          <motion.form
            initial={{ opacity: 0, x: -100, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 16 }}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[2rem] border-2 border-[#0e1030] bg-[#ffd60a] p-6 text-[#0e1030] shadow-[10px_10px_0_#0e1030] sm:p-9"
          >
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2f2bff] text-[#ffd60a]">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-black">
                  Message Sent Successfully!
                </h3>
                <p className="mt-2 text-base font-semibold text-[#0e1030]/80">
                  Thank you for reaching out! Jay will read your message and respond promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 rounded-full border-2 border-[#0e1030] bg-[#0e1030] px-6 py-2.5 font-display text-sm font-bold text-[#f1f2ff] hover:bg-[#2f2bff]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block font-display text-xs font-bold uppercase tracking-wider text-[#0e1030]">
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="mt-2 w-full rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] px-4 py-3 font-medium text-[#0e1030] outline-none transition-all placeholder:text-[#4a4e78]/60 focus:bg-white focus:shadow-[4px_4px_0_#ff5ca8]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-display text-xs font-bold uppercase tracking-wider text-[#0e1030]">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="mt-2 w-full rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] px-4 py-3 font-medium text-[#0e1030] outline-none transition-all placeholder:text-[#4a4e78]/60 focus:bg-white focus:shadow-[4px_4px_0_#ff5ca8]"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="block font-display text-xs font-bold uppercase tracking-wider text-[#0e1030]">
                    What are you building?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or open role..."
                    className="mt-2 w-full resize-none rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] p-4 font-medium text-[#0e1030] outline-none transition-all placeholder:text-[#4a4e78]/60 focus:bg-white focus:shadow-[4px_4px_0_#ff5ca8]"
                  />
                </div>

                {errorMsg && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-600 bg-red-100 p-3 text-sm font-bold text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <HoverTarget
                  as="button"
                  type="submit"
                  disabled={isSubmitting}
                  variant="link"
                  label="Send"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#0e1030] bg-[#0e1030] py-4 font-display text-base font-bold text-[#f1f2ff] shadow-[4px_4px_0_#ff5ca8] transition-all hover:bg-[#2f2bff] hover:shadow-[6px_6px_0_#0e1030] disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
                </HoverTarget>
              </>
            )}
          </motion.form>

          {/* Social Links & Open-To Status */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {/* Email Pill Card */}
              <HoverTarget
                as="a"
                href={`mailto:${portfolioData.email}`}
                variant="link"
                className="group flex items-center justify-between rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] p-5 text-[#0e1030] shadow-[5px_5px_0_#0e1030] transition-transform hover:-translate-y-1 hover:bg-[#ffd60a]"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#2f2bff]" />
                  <span className="font-display font-bold text-sm sm:text-base break-all">
                    {portfolioData.email}
                  </span>
                </div>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </HoverTarget>

              {/* Phone Pill Card */}
              <HoverTarget
                as="a"
                href={`tel:${portfolioData.phone.replace(/\s+/g, '')}`}
                variant="link"
                className="group flex items-center justify-between rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] p-5 text-[#0e1030] shadow-[5px_5px_0_#0e1030] transition-transform hover:-translate-y-1 hover:bg-[#ffd60a]"
              >
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#2f2bff]" />
                  <span className="font-display font-bold text-sm sm:text-base">
                    {portfolioData.phone}
                  </span>
                </div>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </HoverTarget>

              {/* Location Pill Card */}
              <div className="group flex items-center justify-between rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] p-5 text-[#0e1030] shadow-[5px_5px_0_#0e1030]">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#2f2bff]" />
                  <span className="font-display font-bold text-sm sm:text-base">
                    {portfolioData.location}
                  </span>
                </div>
              </div>

              {/* Optional GitHub Card if provided */}
              {portfolioData.github && (
                <HoverTarget
                  as="a"
                  href={portfolioData.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="link"
                  className="group flex items-center justify-between rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] p-5 text-[#0e1030] shadow-[5px_5px_0_#0e1030] transition-transform hover:-translate-y-1 hover:bg-[#ffd60a]"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="h-5 w-5 text-[#2f2bff]" />
                    <span className="font-display font-bold text-base">GitHub</span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </HoverTarget>
              )}

              {/* Optional LinkedIn Card if provided */}
              {portfolioData.linkedin && (
                <HoverTarget
                  as="a"
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  variant="link"
                  className="group flex items-center justify-between rounded-2xl border-2 border-[#0e1030] bg-[#f1f2ff] p-5 text-[#0e1030] shadow-[5px_5px_0_#0e1030] transition-transform hover:-translate-y-1 hover:bg-[#ffd60a]"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="h-5 w-5 text-[#2f2bff]" />
                    <span className="font-display font-bold text-base">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </HoverTarget>
              )}
            </div>

            {/* "Open to" tags box */}
            <div className="rounded-2xl border-2 border-[#f1f2ff]/30 p-6">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-[#f1f2ff]/70">
                Open to
              </span>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {portfolioData.contact.openTo.map((item, idx) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.06, rotate: idx % 2 === 0 ? 3 : -3 }}
                    className="cursor-default rounded-full border-2 border-[#0e1030] bg-[#ffd60a] px-4 py-2 font-display text-xs font-bold text-[#0e1030] shadow-[3px_3px_0_#0e1030]"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
