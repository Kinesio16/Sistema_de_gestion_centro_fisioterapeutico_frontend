import {
    Box,
    Button,
} from "@mui/material";

import EstadoRegistro
    from "../../components/common/EstadoRegistro";

import TratamientoForm
    from "../../pages/tratamientos/components/TratamientoForm";

function WorkflowTratamiento({

    formData,

    errores,

    pacientes,

    fisioterapeutas,

    evaluaciones,

    onChange,

    guardado,

    guardando,

    editando,

    editarInformacion,

    setEditarInformacion,

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

            <TratamientoForm

                formData={formData}

                errores={errores}

                pacientes={pacientes}

                fisioterapeutas={fisioterapeutas}

                evaluaciones={evaluaciones}

                editarInformacion={editarInformacion}

                setEditarInformacion={setEditarInformacion}

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

                                ? "Actualizar Tratamiento"

                                : "Guardar Tratamiento"

                    }

                </Button>

            </Box>

        </>

    );

}

export default WorkflowTratamiento;