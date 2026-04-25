"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function FAQ({ faqs }) {

  const [active, setActive] = useState(null)

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-16">

      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">

        {faqs.map((faq, index) => {

          const isOpen = active === index

          return (
            <div
              key={index}
              className="border rounded-xl p-4 bg-white dark:bg-gray-900"
            >

              <button
                onClick={() => setActive(isOpen ? null : index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="font-medium">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{opacity:0, height:0}}
                    animate={{opacity:1, height:"auto"}}
                    exit={{opacity:0, height:0}}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 mt-3 text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )
        })}

      </div>

    </section>
  )
}