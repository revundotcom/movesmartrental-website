"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, CheckCircle2, Users, TrendingUp, Globe, Star } from "lucide-react";

interface ModalProps {
  role: string;
  onClose: () => void;
}

function ApplyModal({ role, onClose }: ModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      role,
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      linkedin: fd.get("linkedin"),
      resumeUrl: fd.get("resumeUrl"),
      whyYou: fd.get("whyYou"),
      referral: fd.get("referral"),
    };
    try {
      const res = await fetch("/api/careers-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--brand-navy)]/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white rounded-t-2xl z-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)]">Apply Now</p>
            <h2 className="mt-0.5 text-[18px] font-bold text-[var(--brand-navy)]">{role}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-[var(--brand-navy)] p-1 transition-colors" aria-label="Close">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-[var(--brand-emerald)]" />
            <h3 className="text-xl font-bold text-[var(--brand-navy)]">Application received</h3>
            <p className="text-slate-600 text-sm max-w-sm">Thank you for applying to the {role} position at MoveSmart Rentals. We will be in touch within 5 business days.</p>
            <button onClick={onClose} className="mt-2 px-6 py-3 bg-[var(--brand-navy)] text-white rounded-full text-sm font-semibold hover:bg-[var(--brand-navy-light)] transition-colors">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">First Name <span className="text-red-500">*</span></label><input name="firstName" required className="w-full border border-slate-200 rounded-lg bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]" placeholder="Jane" /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Last Name <span className="text-red-500">*</span></label><input name="lastName" required className="w-full border border-slate-200 rounded-lg bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]" placeholder="Smith" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Email <span className="text-red-500">*</span></label><input name="email" type="email" required className="w-full border border-slate-200 rounded-lg bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]" placeholder="you@email.com" /></div>
              <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone</label><input name="phone" type="tel" className="w-full border border-slate-200 rounded-lg bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]" placeholder="+1 416 555 0100" /></div>
            </div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">LinkedIn Profile URL</label><input name="linkedin" type="url" className="w-full border border-slate-200 rounded-lg bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]" placeholder="https://linkedin.com/in/yourprofile" /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Resume URL (Google Drive, Dropbox, etc.)</label><input name="resumeUrl" type="url" className="w-full border border-slate-200 rounded-lg bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]" placeholder="https://drive.google.com/..." /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Why do you want this role? <span className="text-slate-400 font-normal">(optional)</span></label><textarea name="whyYou" rows={3} className="w-full border border-slate-200 rounded-lg bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)] resize-none" placeholder="What draws you to this position..." /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">How did you hear about us?</label><select name="referral" className="w-full border border-slate-200 rounded-lg bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-emerald)]"><option value="">Select one</option><option>Google Search</option><option>LinkedIn</option><option>Indeed</option><option>Referral</option><option>Other</option></select></div>
            {status === "error" && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>}
            <button type="submit" disabled={status === "loading"} className="w-full py-3 bg-[var(--brand-emerald)] text-white rounded-full text-sm font-bold hover:bg-[var(--brand-emerald-hover)] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {status === "loading" ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const WHY_JOIN = [
  { Icon: TrendingUp, title: "Scale your career with us", body: "MoveSmart is expanding across North America. The team you join today will be 10x the size in 3 years." },
  { Icon: Globe, title: "US and Canadian markets", body: "Work across both sides of the border. Toronto is our home base, but Florida, New York, and Chicago are active markets." },
  { Icon: Users, title: "Landlord-first culture", body: "We take property management seriously. Our team understands the institutional side of the rental market." },
  { Icon: Star, title: "Performance-backed comp", body: "Strong base salaries, clear performance metrics, and real upside for people who hit their numbers." },
];

const JOBS = [
  {
    title: "Senior Leasing Agent",
    location: "Toronto / Vaughan / Mississauga",
    type: "Full-time",
    summary: "You will manage the full leasing cycle for a portfolio of residential properties across the GTA. That means fielding inbound leads, conducting showings, screening tenants, and getting leases signed. You work with property managers to ensure a smooth handoff at move-in. Most of your book will be multifamily and purpose-built rental units.",
    requirements: ["3 or more years of residential leasing experience in the GTA", "RECO registration current", "Track record of meeting or exceeding leasing targets", "Comfort with digital tools for lead management and application processing"],
    compensation: "$55,000 to $75,000 base plus leasing incentives",
  },
  {
    title: "Property Manager",
    location: "Florida",
    type: "Full-time",
    summary: "You will manage a portfolio of residential properties across our Florida markets. Day-to-day responsibilities include tenant relations, maintenance coordination, rent collection, and lease renewals. You are the primary point of contact for both landlords and tenants on your portfolio.",
    requirements: ["Florida real estate license (active)", "3 or more years of property management experience in Florida", "Familiarity with Florida landlord-tenant law and the eviction process", "Strong organizational skills and comfort managing 100 or more units"],
    compensation: "$60,000 to $80,000 base",
  },
  {
    title: "Tenant Placement Coordinator",
    location: "Remote, North America",
    type: "Full-time",
    summary: "You will coordinate tenant placement activity across our Canadian and US markets. That means managing the lead-to-lease workflow: fielding inbound applications, scheduling showings, running background checks, and working with local leasing agents to close placements. This is a remote coordination role, not a field role.",
    requirements: ["2 or more years in property management, leasing, or tenant services", "Strong written and verbal communication skills", "Comfortable working across multiple markets and time zones", "Detail-oriented with strong follow-through on open items"],
    compensation: "$50,000 to $65,000 base",
  },
  {
    title: "Marketing Coordinator",
    location: "Toronto, ON",
    type: "Full-time",
    summary: "You will own listings marketing and digital presence for our active portfolio. That means writing listings copy, coordinating photography, managing platforms like Zillow, Rentals.ca, and Facebook Marketplace, and running targeted paid campaigns to drive qualified leads to our leasing team.",
    requirements: ["2 or more years in marketing, ideally with real estate or property management exposure", "Strong writing skills: you produce listings copy that converts", "Familiarity with major rental listing platforms and social ads", "Organized, proactive, and comfortable with a fast-moving pipeline"],
    compensation: "$50,000 to $65,000 base",
  },
  {
    title: "Director of Leasing Operations",
    location: "Toronto, ON",
    type: "Full-time",
    summary: "You will build and lead our leasing function across North America. That means managing the leasing team, setting process and performance standards, building our landlord acquisition strategy, and working with the broader leadership team on portfolio growth. This is a key hire for MoveSmart and a builder role.",
    requirements: ["8 or more years in residential leasing or property management, with 3 or more years managing a team", "Track record of building leasing operations from scratch or scaling an existing team significantly", "Deep understanding of North American rental markets, both GTA and major US metros", "Commercially minded with strong analytical instincts and reporting discipline"],
    compensation: "$110,000 to $145,000 base plus performance bonus",
  },
];

export default function CareersPage() {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--brand-navy)] text-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)] mb-4">Careers</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white text-balance leading-tight">
            Join the team building a better rental market.
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl">
            MoveSmart Rentals connects landlords and tenants across Canada and the United States. We are a team of operators who take property management seriously and move fast.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#positions" className="inline-flex items-center gap-2 bg-[var(--brand-emerald)] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[var(--brand-emerald-hover)] transition-colors">
              See open positions <ArrowRight className="h-4 w-4" />
            </a>
            <a href="mailto:careers@movesmartrentals.com" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:border-white/60 transition-colors">
              General application
            </a>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)] mb-2">Why MoveSmart</p>
            <h2 className="text-3xl font-bold text-[var(--brand-navy)]">We are building something real.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_JOIN.map(({ Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <Icon className="h-6 w-6 text-[var(--brand-emerald)] mb-4" strokeWidth={1.5} />
                <h3 className="text-base font-bold text-[var(--brand-navy)] mb-1.5">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section id="positions" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-emerald)] mb-2">Open positions</p>
            <h2 className="text-3xl font-bold text-[var(--brand-navy)]">Five roles open right now.</h2>
          </div>
          <div className="space-y-4">
            {JOBS.map((job) => (
              <div key={job.title} className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 shadow-sm hover:border-[var(--brand-emerald)]/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--brand-navy)]">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 uppercase tracking-wide">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.type}</span>
                      <span className="text-[var(--brand-emerald)] font-bold">{job.compensation}</span>
                    </div>
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-2xl">{job.summary}</p>
                    <ul className="mt-4 space-y-1.5">
                      {job.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[var(--brand-emerald)] flex-none" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:ml-6 flex-none">
                    <button onClick={() => setActiveRole(job.title)} className="inline-flex items-center gap-2 bg-[var(--brand-navy)] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[var(--brand-navy-light)] transition-colors whitespace-nowrap">
                      Apply <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--brand-navy)] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">No open role that fits?</h2>
          <p className="text-white/80 text-base mb-8">We accept general applications year-round. Email us at{" "}
            <a href="mailto:careers@movesmartrentals.com" className="text-[var(--brand-emerald)] underline">careers@movesmartrentals.com</a>
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[var(--brand-emerald)] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[var(--brand-emerald-hover)] transition-colors">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {activeRole && <ApplyModal role={activeRole} onClose={() => setActiveRole(null)} />}
    </>
  );
}
