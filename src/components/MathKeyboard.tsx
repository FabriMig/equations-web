import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { StaticMathField } from "react-mathquill"

type Props = {
    showKeyboard: boolean,
    onKeyClick: (key: string) => void
}

export default function MathKeyboard({ showKeyboard, onKeyClick }: Props) {

    const keyboardButtons = [
        [['7', '7'], ['8', '8'], ['9', '9'], ['*', '\\cdot'], ["fraction", '\\frac{a}{b}']],
        [['4', '4'], ['5', '5'], ['6', '6'], ['-', '-'], ['+', '+']],
        [['1', '1'], ['2', '2'], ['3', '3'], ['(', '('], [')', ')']],
        [['0', '0'], ['.', '.'], ['x', 'x']]
    ];

    return (
        <motion.div
            animate={{ height: showKeyboard ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden h-0 !m-0"
        >
            <div className="grid grid-cols-5 gap-2 mt-3">

                {keyboardButtons.map((row) => (
                    row.map((btn) => {
                        if (btn[0] === "fraction") {
                            return <Button
                                key={btn[0]}
                                onClick={() => onKeyClick(btn[1])}
                                className="py-4 text-lg bg-gray-800 hover:bg-gray-700 text-white"
                            >
                                <StaticMathField>{"\\frac{a}{b}"}</StaticMathField>
                            </Button>
                            
                        }

                        if (btn[0] === "/") {
                            return <Button
                                key={btn[0]}
                                onClick={() => onKeyClick(btn[1])}
                                className="py-4 text-lg bg-gray-800 hover:bg-gray-700 text-white"
                            >
                                {btn[0]}
                            </Button>
                        }

                        return <Button
                            key={btn[0]}
                            onClick={() => onKeyClick(btn[1])}
                            className="py-4 text-lg bg-gray-800 hover:bg-gray-700 text-white"
                        >
                            {btn[0]}
                        </Button>
                    })
                ))}
                <Button
                    onClick={() => onKeyClick("=")}

                    // onClick={handleDelete}
                    className="py-4 text-lg bg-gray-800 hover:bg-gray-700 text-white col-span-2"
                >
                    =
                </Button>
            </div>
        </motion.div>
    )
}