import { Trash } from "lucide-react"
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
import { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { deleteEquation } from "@/services/equations.service"

type props = {
  equationId: string,
}

function DeleteEquationDialog({ equationId }: props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { fetch } = useApi(deleteEquation, {
    onSuccess: () => {
      setOpenDeleteDialog(false);
    }
  })

  const onDeleteEquation = () => {
    fetch(equationId)
  }

  return (
    <Dialog open={openDeleteDialog}>
      <DialogTrigger asChild>

        <Button
          onClick={() => setOpenDeleteDialog(true)}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Trash className="mr-1 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark text-white">
        <DialogHeader>
          <DialogTitle>Delete equation</DialogTitle>
          <DialogDescription>
            Delete permantely the equation
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant="outline" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white" onClick={onDeleteEquation}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default DeleteEquationDialog