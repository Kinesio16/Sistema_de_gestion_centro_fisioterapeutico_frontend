import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

import SubmitButton from "../../../components/common/SubmitButton";

function ServicioDialog({

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
            onClose={onClose}
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

            <DialogContent dividers>

                {children}

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
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

export default ServicioDialog;