import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import SubmitButton from "../../../components/common/SubmitButton";

function FisioterapeutaDialog({

    open,
    onClose,
    title,
    children,
    onSave,
    modoEdicion,
    guardando,

}) {

    return (

        <Dialog
            open={open}
            onClose={guardando ? undefined : onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle
                sx={{
                    fontWeight: 700,
                }}
            >
                {title}
            </DialogTitle>

            <DialogContent
                dividers
                sx={{
                    maxHeight: "70vh",
                }}
            >
                {children}
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>

                <Button 
                    onClick={onClose}
                    disabled={guardando}
                >

                    Cancelar

                </Button>

                <SubmitButton
                    loading={guardando}
                    onClick={onSave}
                    sx={{
                        bgcolor: "#F57C00",
                        "&:hover": {
                            bgcolor: "#E65100",
                        },
                    }}
                >
                    {modoEdicion ? "Actualizar" : "Guardar"}
                </SubmitButton>

            </DialogActions>

        </Dialog>

    );

}

export default FisioterapeutaDialog;