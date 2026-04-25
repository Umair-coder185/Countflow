"use client";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah, Blogger",
      feedback:
        "This tool saved me hours — I can check readability and sentence balance instantly.",
    },
    {
      name: "Ali, Student",
      feedback:
        "The speaking time feature helped me prepare my presentation perfectly.",
    },
    {
      name: "David, SEO Writer",
      feedback:
        "Keyword density and sentence insights make my content AdSense‑ready every time.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center bg-gradient-to-b from-cyan-50 to-white dark:from-gray-950 dark:to-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        What Our <span className="text-cyan-500">Users Say</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative p-8 rounded-2xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md hover:shadow-xl transition cursor-pointer border-gray-200 dark:border-gray-700 group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-xl" />

            <div className="relative z-10 flex flex-col items-center">
              <Quote className="w-8 h-8 text-cyan-500 mb-4" />
              <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                “{t.feedback}”
              </p>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {t.name}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
