import {
   Alert,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material"

type DeleteProfileDialogProps = {
   open: boolean
   isPending: boolean
   error?: string | null
   onClose: () => void
   onConfirm: () => void
}

export const DeleteProfileDialog = ({
   open,
   isPending,
   error,
   onClose,
   onConfirm,
}: DeleteProfileDialogProps) => {
   const handleClose = () => {
      if (isPending) {
         return
      }

      onClose()
   }

   return (
      <Dialog
         open={open}
         onClose={handleClose}
         maxWidth="xs"
         fullWidth
      >
         <DialogTitle>Удалить профиль?</DialogTitle>

         <DialogContent>
            <DialogContentText>
               Профиль и текущая сессия будут удалены из приложения.
               Это действие нельзя отменить.
            </DialogContentText>

            {error && (
               <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
               </Alert>
            )}
         </DialogContent>

         <DialogActions>
            <Button
               onClick={handleClose}
               disabled={isPending}
            >
               Отмена
            </Button>

            <Button
               color="error"
               variant="contained"
               onClick={onConfirm}
               disabled={isPending}
            >
               {isPending ? "Удаление..." : "Удалить"}
            </Button>
         </DialogActions>
      </Dialog>
   )
}
