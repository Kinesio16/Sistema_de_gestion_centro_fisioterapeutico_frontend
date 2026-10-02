import { Box, Button } from "@mui/material";

import EvaluacionForm
    from "../../pages/evaluaciones/components/EvaluacionForm";
import EstadoRegistro
from "../../components/common/EstadoRegistro";

function WorkflowEvaluacion({

    formData,

    errores,

    pacientes,

    fisioterapeutas,

    guardado,

    guardando,

    editando,

    onChange,

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

            <EvaluacionForm

                formData={formData}

                errores={errores}

                pacientes={pacientes}

                fisioterapeutas={fisioterapeutas}

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

                            ? "Guardando..."

                            : guardado

                                ? "Actualizar Evaluación"

                                : "Guardar Evaluación"

                    }

                </Button>

            </Box>

        </>

    );

}

export default WorkflowEvaluacion;