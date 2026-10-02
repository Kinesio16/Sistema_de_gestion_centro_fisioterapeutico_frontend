import {
    Box,
    Button,
} from "@mui/material";

import EstadoRegistro
from "../../components/common/EstadoRegistro";

import PacienteForm
from "../../pages/pacientes/components/PacienteForm";

function WorkflowPaciente({

    formData,

    errores,

    onChange,

    guardado,

    guardando,

    editando,

    onGuardar,

}) {

    return (

        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 2,
                }}
            >

                <EstadoRegistro

                    guardado={guardado}

                    editando={editando}

                />

            </Box>

            <PacienteForm

                formData={formData}

                errores={errores}

                onChange={onChange}

            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3,
                }}
            >

                <Button
                    variant="contained"
                    onClick={onGuardar}
                    disabled={guardando}
                >

                    {
                        guardando
                            ?"Guardando..."
                            :guardado
                            ? "Actualizar Paciente"
                            : "Guardar Paciente"
                    }

                </Button>

            </Box>

        </>

    );

}

export default WorkflowPaciente;