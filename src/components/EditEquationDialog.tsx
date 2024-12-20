import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form"
import { z } from "zod"
import { MathField } from 'react-mathquill';

import { useRef, useState } from "react"
import { useApi } from "@/hooks/useApi"
import { editEquation } from "@/services/equations.service"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { storeEquationSchema } from "@/schemas/equation.schema"
import { Input } from "./ui/input"
import MathInput from "./MathInput"
import { SaveEquation } from "@/types"
import { useToast } from "@/hooks/use-toast"

type props = {
    equation: SaveEquation
}

function EditEquationDialog({ equation }: props) {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const mathInputRef = useRef<MathField>(null);
    const { toast } = useToast();

    const { fetch } = useApi(editEquation, {
        onSuccess: () => {
            setOpenEditDialog(false);
        },
        onError: (err) => {
            toast({
                title: "Error editing the equation",
                description: err?.message,
                style: { backgroundColor: "#D32F2F" }
            })
        }
    })

    const form = useForm<z.infer<typeof storeEquationSchema>>({
        resolver: zodResolver(storeEquationSchema),
        defaultValues: {
            name: equation.name,
        }
    })

    const onSubmit = (values: z.infer<typeof storeEquationSchema>) => {
        fetch({
            name: values.name,
            equation: {
                latex: mathInputRef.current?.latex() || "",
                string: mathInputRef.current?.text() || ""
            },
            equationId: equation._id,

        })
    }

    return (
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
            <DialogTrigger asChild>

                <Button
                    onClick={() => setOpenEditDialog(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark text-white">
                <DialogHeader>
                    <DialogTitle>Edit equation</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="editEquationForm">
                        <div className="flex flex-col space-y-3 max-w-[375px]">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Equation name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                className="w-full py-3 px-4 bg-gray-900 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                                placeholder="Enter the equation name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <MathInput latex={equation.equation.latex} ref={mathInputRef} hideKeyboardButton />
                        </div>

                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" variant="outline" onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button type="submit" form="editEquationForm" className="bg-primary hover:bg-primary-700 text-white">Edit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditEquationDialog