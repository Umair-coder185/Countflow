"use client";
import { Mail, Clock, Globe, Wrench, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <section className="relative py-16  mt-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            Contact Us
          </span>
        </motion.h2>

        <p className="text-lg text-gray-600 dark:text-slate-400 mb-10">
          Have questions, suggestions, or feedback? We’d love to hear from you.
          Our team responds within <strong>24–48 hours</strong>.
        </p>

        <div className="grid sm:grid-cols-2 gap-8 text-left">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-md bg-white dark:bg-slate-900 hover:shadow-lg transition"
          >
            <Mail className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Email
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              your-email@example.com
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-md bg-white dark:bg-slate-900 hover:shadow-lg transition"
          >
            <Clock className="w-8 h-8 text-cyan-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Response Time
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              Within 24–48 hours
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-md bg-white dark:bg-slate-900 hover:shadow-lg transition"
          >
            <Globe className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Website Issues
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              Report bugs or technical problems.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-md bg-white dark:bg-slate-900 hover:shadow-lg transition"
          >
            <Wrench className="w-8 h-8 text-orange-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tool Suggestions
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              Share ideas for new features.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-md bg-white dark:bg-slate-900 hover:shadow-lg transition sm:col-span-2"
          >
            <Briefcase className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Business Inquiries
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              Collaborations, partnerships, or sponsorships.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
