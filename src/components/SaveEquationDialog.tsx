import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

import { storeEquationSchema } from '@/schemas/equation.schema';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "./ui/form"
import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { saveEquation } from "@/services/equations.service";
import useEquationStore from "@/store/equation.store";

function SaveEquationDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { fetch } = useApi(saveEquation, {});
    const { currentEquation } = useEquationStore();

    const form = useForm<z.infer<typeof storeEquationSchema>>({
        resolver: zodResolver(storeEquationSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof storeEquationSchema>) => {
        fetch({
            name: values.name,
            equation: currentEquation
        })
        setIsDialogOpen(false);
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center">Save Equation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black text-white dark">
                <DialogHeader>
                    <DialogTitle className="text-blue-400">Save equation</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="storeEquationForm">
                        <div className="grid gap-4 py-4">
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
                        </div>

                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" form="storeEquationForm" className="bg-primary text-white">Save Equation</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SaveEquationDialog