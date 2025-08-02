"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../components/hooks/use-outside-click";

export default function ExpandableCard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="bg-blue-50 min-h-screen p-6 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Opportunities Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800">Opportunities</h1>
          <p className="text-gray-600 mt-2">Browse current job openings from top companies</p>
        </div>

        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 flex items-center justify-center z-20 p-4">
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className="relative">
                  <img
                    src={active.src}
                    alt={active.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{active.title}</h2>
                      <p className="text-gray-600 mt-1">{active.role}</p>
                    </div>
                    <a
                      href={active.ctaLink}
                      target="_blank"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {active.ctaText}
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <DetailItem label="Location" value={active.content().props.children[2].props.children[1]} />
                      <DetailItem label="Openings" value={active.content().props.children[3].props.children[1]} />
                      <DetailItem label="Drive Type" value={active.content().props.children[4].props.children[1]} />
                    </div>
                    <div className="space-y-2">
                      <DetailItem label="Offer Type" value={active.content().props.children[5].props.children[1]} />
                      <DetailItem label="Sector" value={active.content().props.children[6].props.children[1]} />
                      <DetailItem label="Salary" value={active.content().props.children[7].props.children[1]} />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      <Tag label={active.content().props.children[8].props.children[1]} />
                      <Tag label={active.content().props.children[9].props.children[1]} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
                    <p className="text-gray-600">
                      We're looking for talented individuals to join our team. This role involves working on cutting-edge
                      technologies and collaborating with cross-functional teams to deliver high-quality solutions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto space-y-4">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <img
                    src={card.src}
                    alt={card.title}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-semibold text-gray-900"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-gray-600 text-sm"
                  >
                    {card.description}
                  </motion.p>
                </div>
                <motion.button
                  layoutId={`button-${card.title}-${id}`}
                  className="px-4 py-2 text-sm rounded-lg font-medium bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                >
                  {card.ctaText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-sm text-gray-500">{label}</span>
    <p className="font-medium text-gray-900">{value}</p>
  </div>
);

const Tag = ({ label }: { label: string }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
    {label}
  </span>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </svg>
);

const cards = [
  {
    title: "Google",
    role: "Software Engineer",
    description: "Location: Bangalore | Criteria: CGPA > 8.0",
    src: "https://logo.clearbit.com/google.com",
    ctaText: "View Details",
    ctaLink: "#",
    content: () => (
      <div className="space-y-2 text-sm">
        <p><strong>Company:</strong> Google</p>
        <p><strong>Role:</strong> Software Engineer</p>
        <p><strong>Location:</strong> Bangalore</p>
        <p><strong>Total Openings:</strong> 5</p>
        <p><strong>Drive:</strong> On Campus</p>
        <p><strong>Type:</strong> Placement</p>
        <p><strong>Sector:</strong> IT</p>
        <p><strong>Salary:</strong> ₹15 LPA</p>
        <p><strong>Criteria:</strong> CGPA  8.0</p>
        <p><strong>Skills:</strong> JavaScript, React, Node.js</p>
      </div>
    ),
  },
  {
    title: "TCS",
    role: "System Engineer",
    description: "Location: Pune | Criteria: No Backlogs",
    src: "https://logo.clearbit.com/tcs.com",
    ctaText: "View Details",
    ctaLink: "#",
    content: () => (
      <div className="space-y-2 text-sm">
        <p><strong>Company:</strong> TCS</p>
        <p><strong>Role:</strong> System Engineer</p>
        <p><strong>Location:</strong> Pune</p>
        <p><strong>Total Openings:</strong> 20</p>
        <p><strong>Drive:</strong> Off Campus</p>
        <p><strong>Type:</strong> Internship and Placement</p>
        <p><strong>Sector:</strong> Core</p>
        <p><strong>Salary:</strong> ₹6-8 LPA</p>
        <p><strong>Criteria:</strong> No Backlogs</p>
        <p><strong>Skills:</strong> Java, SQL</p>
      </div>
    ),
  },
  {
    title: "Deloitte",
    role: "Business Analyst",
    description: "Location: Mumbai | Criteria: Open to all",
    src: "https://logo.clearbit.com/deloitte.com",
    ctaText: "View Details",
    ctaLink: "#",
    content: () => (
      <div className="space-y-2 text-sm">
        <p><strong>Company:</strong> Deloitte</p>
        <p><strong>Role:</strong> Business Analyst</p>
        <p><strong>Location:</strong> Mumbai</p>
        <p><strong>Total Openings:</strong> 10</p>
        <p><strong>Drive:</strong> On Campus</p>
        <p><strong>Type:</strong> Internship</p>
        <p><strong>Sector:</strong> Management</p>
        <p><strong>Salary:</strong> ₹10 LPA</p>
        <p><strong>Criteria:</strong> Open to all</p>
        <p><strong>Skills:</strong> Excel, Communication, Problem Solving</p>
      </div>
    ),
  },
];