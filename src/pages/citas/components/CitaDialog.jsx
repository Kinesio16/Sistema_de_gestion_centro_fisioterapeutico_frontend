import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

import SubmitButton from "../../../components/common/SubmitButton";

import CitaForm from "./CitaForm";

function CitaDialog({

    open,

    onClose,

    onGuardar,

    editando,

    guardando,

    formData,

    onChange,

    errores,

    pacientes,

    fisioterapeutas,

}) {

    return (

        <Dialog

            open={open}

            onClose={guardando ? undefined : onClose}

            fullWidth

            maxWidth="md"

        >

            <DialogTitle>

                {

                    editando

                        ? "Editar Cita"

                        : "Nueva Cita"

                }

            </DialogTitle>

            <DialogContent dividers>

                <CitaForm

                    formData={formData}

                    onChange={onChange}

                    errores={errores}

                    pacientes={pacientes}

                    fisioterapeutas={fisioterapeutas}

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

export default CitaDialog;