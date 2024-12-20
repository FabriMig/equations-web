import { SolvedEquation } from "@/types";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { StaticMathField } from "react-mathquill";

type props = {
  solution: SolvedEquation
}

function DisplaySolution({ solution }: props) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (solution && currentStep < solution.steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prevStep => prevStep + 1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [solution, currentStep])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 bg-gray-800 rounded-lg"
    >
      <h3 className="text-2xl font-bold mb-4 text-blue-400">Solution</h3>
      <StaticMathField className="text-gray-300 mt-1">{solution.steps[solution.steps.length - 1].equation.latex}</StaticMathField>

      <h4 className="text-lg font-semibold mb-2 text-teal-400">Steps:</h4>
      <div className="space-y-6">
        {solution.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: index < currentStep ? 1 : 0, x: index < currentStep ? 0 : -20 }}
            transition={{ duration: 0.3, delay: index * 0.5 }}
            className="space-y-6"
          >
            <p className="text-gray-300">{step.description}</p>
            <StaticMathField className="relative pl-4 text-gray-300 mt-2 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-primary before:rounded">{step.equation.latex}</StaticMathField>
          </motion.div>
        ))}
      </div>
    </motion.div>

  )
}

export default DisplaySolution