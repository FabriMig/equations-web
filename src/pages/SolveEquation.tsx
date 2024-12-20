import { useRef, useState } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"
import { MathField } from 'react-mathquill';

import MathKeyboard from "@/components/MathKeyboard"
import DisplaySolution from "@/components/DisplaySolution"
import MathInput from "@/components/MathInput"
import { useApi } from "@/hooks/useApi"
import { solveEquation } from "@/services/equations.service"
import useEquationStore from "@/store/equation.store"
import SaveEquationDialog from "@/components/SaveEquationDialog"
import { SolvedEquation } from "@/types"
import useUiStore from "@/store/ui.store"
import useUserStore from "@/store/user.store";

function SolveEquation() {
    const { showKeyboard } = useUiStore();
    const { email } = useUserStore();
    const { currentEquation, addCurrentEquation } = useEquationStore();
    const equationInputRef = useRef<MathField>(null)

    const [solution, setSolution] = useState<SolvedEquation | null>(null)
    const { fetch: fetchEquationSolution } = useApi(solveEquation, {
        onSuccess: (data) => {
            setSolution(data)
        }
    });
    
    const onKeyClick = (latex: string) => {
        equationInputRef.current?.focus();
        equationInputRef.current?.write(latex)
    }

    const handleSolve = () => {
        fetchEquationSolution(currentEquation.string)
    }

    const onChangeMathInput = (mathField: MathField) => {
        mathField.clearSelection()
        addCurrentEquation({
            latex: mathField.latex(),
            string: mathField.text()
        })
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">Solve Your Equation</h2>

                <div className="relative flex flex-col space-y-3">
                    <MathInput ref={equationInputRef} onChange={onChangeMathInput} latex={currentEquation.latex}/>
                    { email !== "" && (
                        <SaveEquationDialog/>
                    )}

                    <MathKeyboard onKeyClick={onKeyClick} showKeyboard={showKeyboard} />

                    <Button
                        onClick={handleSolve}
                        className="w-full px-8 py-6 text-xl bg-primary font-semibold text-white"
                    >
                        Solve
                        <ChevronRight className="ml-2 h-6 w-4" />
                    </Button>

                    <AnimatePresence>
                        {solution && (
                            <DisplaySolution solution={solution} />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}

export default SolveEquation