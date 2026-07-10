import { Zap, Shield, BarChart3 } from "lucide-react";

import { motion } from "@/lib/no-motion";

export function WhyChooseUs() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-cyan-500" />,
      title: "Instant Auto‑Analysis",
      description: "Results appear instantly as you type or paste — no clicks required.",
    },
    {
      icon: <Shield className="w-8 h-8 text-cyan-500" />,
      title: "Premium SaaS Design",
      description: "Clean UI, responsive layout, and engaging visuals built for professionals.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
      title: "Advanced Insights",
      description: "Beyond counts: readability, sentiment, and engagement scores.",
    },
  ];

  return (
    <>
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Why Choose <span className="text-cyan-500">Us</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map((f, i) => (
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
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </>
  );
}
