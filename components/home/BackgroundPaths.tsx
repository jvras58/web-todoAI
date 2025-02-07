"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { containerFadeIn, letterAnimate, letterInitial, letterTransition } from "@/constants/motion"
import FloatingPaths from "./FloatingPaths"
import LoginDialog from "../auth/ButtonLoginDialog"

export default function BackgroundPaths() {
  const title = "Potencialize com To Do `IA´"
  const words = title.split(" ")

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={containerFadeIn.initial}
          animate={containerFadeIn.animate}
          transition={containerFadeIn.transition}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={letterInitial}
                    animate={letterAnimate}
                    transition={{
                      ...letterTransition,
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                               bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                               dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div
            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                       dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                       overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <LoginDialog>
            <Button
              variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                         bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                         text-black dark:text-white transition-all duration-300 
                         group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                         hover:shadow-md dark:hover:shadow-neutral-800/50"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                Acesse!
              </span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                           transition-all duration-300"
              >
                →
              </span>
            </Button>
            </LoginDialog>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
