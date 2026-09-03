import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import TratamientoForm from "./TratamientoForm";

import SubmitButton from "../../../components/common/SubmitButton";

function TratamientoDialog({

    open,

    onClose,

    onGuardar,

    guardando,

    formData,

    onChange,

    errores,

    pacientes,

    fisioterapeutas,

    evaluaciones,

    editando,

}) {

    return (

        <Dialog

            open={open}

            onClose={guardando ? undefined : onClose}

            maxWidth="lg"

            fullWidth

        >

            <DialogTitle>

                {

                    editando

                        ? "Editar Tratamiento"

                        : "Nuevo Tratamiento"

                }

            </DialogTitle>

            <DialogContent dividers>

                <TratamientoForm

                    formData={formData}

                    onChange={onChange}

                    errores={errores}

                    pacientes={pacientes}

                    fisioterapeutas={fisioterapeutas}

                    evaluaciones={evaluaciones}

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

export default TratamientoDialog;