import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import SubmitButton from "../../../components/common/SubmitButton";

import SesionForm from "./SesionForm";

function SesionDialog({

    open,

    onClose,

    onGuardar,

    guardando,

    formData,

    onChange,

    errores,

    tratamientos,

    editando,

}) {

    return (

        <Dialog
            open={open}
            onClose={guardando ? undefined : onClose}
            fullWidth
            maxWidth="lg"
        >

            <DialogTitle>

                {editando

                    ? "Editar Sesión"

                    : "Nueva Sesión"}

            </DialogTitle>

            <DialogContent dividers>

                <SesionForm

                    formData={formData}

                    onChange={onChange}

                    errores={errores}

                    tratamientos={tratamientos}

                />

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
                    onClick={onGuardar}
                >
                    {editando ? "Actualizar" : "Guardar"}
                </SubmitButton>

            </DialogActions>

        </Dialog>

    );

}

export default SesionDialog;