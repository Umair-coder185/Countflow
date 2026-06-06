"use client";
import { Mail, Clock, Globe, Wrench, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUsClient() {
  return (
    <main className="relative py-16 mt-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4" id="contact-h1">
          Contact Countflows
        </h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold text-cyan-700 dark:text-cyan-300 mb-4"
        >
          We're Here to Help
        </motion.h2>
        <p className="text-lg text-gray-600 dark:text-slate-400 mb-6">
          Have questions, suggestions, or feedback? We’d love to hear from you. Our team responds within <strong>24–48 hours</strong>.
        </p>
        <section className="mb-10" aria-labelledby="why-contact">
          <h2 id="why-contact" className="text-2xl font-semibold mb-2">Why Contact Us?</h2>
          <ul className="list-disc pl-6 text-left text-gray-700 dark:text-gray-300 mb-4">
            <li>Get support for using our Word Counter, Character Counter, and other tools.</li>
            <li>Report bugs, technical issues, or website errors.</li>
            <li>Suggest new features or improvements for our text utilities.</li>
            <li>Discuss business, partnership, or advertising opportunities.</li>
            <li>Ask about privacy, data, or terms of service.</li>
          </ul>
        </section>
        <section className="mb-10" aria-labelledby="how-to-contact">
          <h2 id="how-to-contact" className="text-2xl font-semibold mb-2">How to Contact Us</h2>
          <p className="mb-4">You can reach us by email or use the contact options below. We value your input and strive to respond promptly to all inquiries.</p>
        </section>

        <div className="grid sm:grid-cols-2 gap-8 text-left" aria-label="Contact Methods">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-md bg-white dark:bg-slate-900 hover:shadow-lg transition"
          >
            <Mail className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Email
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              umairrao965@gmail.com
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
        <section className="mt-16 text-left max-w-3xl mx-auto" aria-labelledby="faq">
          <h2 id="faq" className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold">How soon will I get a reply?</dt>
              <dd className="ml-4">We aim to respond to all messages within 24–48 hours.</dd>
            </div>
            <div>
              <dt className="font-semibold">Can I suggest a new tool?</dt>
              <dd className="ml-4">Absolutely! We welcome suggestions for new text analysis tools or improvements to existing ones.</dd>
            </div>
            <div>
              <dt className="font-semibold">Is my information safe?</dt>
              <dd className="ml-4">Yes, your privacy is important to us. See our <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a> for details.</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
