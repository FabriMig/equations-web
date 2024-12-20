import DeleteEquationDialog from "@/components/DeleteEquationDialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { SaveEquation } from "@/types"
import { Copy } from "lucide-react"
import { StaticMathField } from "react-mathquill"
import EditEquationDialog from "./EditEquationDialog"

type Props = {
    equation: SaveEquation,
}

function ListEquationItem({ equation }: Props) {
    const { toast } = useToast();

    const handleCopy = (equation: string) => {
        navigator.clipboard.writeText(equation)
            .then(() => toast({
                title: "Equation copied",
                className: "dark",
            }))
            .catch(err => console.error("Failed to copy equation: ", err))
    }

    return (
        <div key={equation._id} className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-blue-400">{equation.name}</h3>
                <StaticMathField className="text-gray-300 mt-1">{equation.equation.latex}</StaticMathField>
            </div>
            <div className="flex space-x-2 flex-wrap">
                <Button
                    onClick={() => handleCopy(equation.equation.latex)}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                    <Copy className="mr-1 h-4 w-4" />
                    Copy
                </Button>
                <EditEquationDialog equation={equation}/>
                <DeleteEquationDialog equationId={equation._id} />
            </div>
        </div>
    )
}

export default ListEquationItem