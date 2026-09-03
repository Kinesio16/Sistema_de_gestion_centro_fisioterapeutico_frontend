import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import SubmitButton from "../../../components/common/SubmitButton";

function VentaDialog({

    open,

    onClose,

    title,

    onSave,

    children,

    guardando,

}) {

    return (

        <Dialog

            open={open}

            onClose={guardando ? undefined : onClose}

            fullWidth

            maxWidth="md"

        >

            <DialogTitle>

                {title}

            </DialogTitle>

            <DialogContent dividers>

                {children}

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    disabled={guardando}
                >
                    Cancelar
                </Button>

                <SubmitButton
                    loading={guardando}
                    onClick={onSave}
                >
                    Guardar
                </SubmitButton>

            </DialogActions>

        </Dialog>

    );

}

export default VentaDialog;