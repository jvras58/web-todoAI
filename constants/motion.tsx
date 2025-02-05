export const containerFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 2 },
}

export const letterInitial = { y: 100, opacity: 0 }
export const letterAnimate = { y: 0, opacity: 1 }

export const letterTransition = {
  type: "spring",
  stiffness: 150,
  damping: 25,
}
