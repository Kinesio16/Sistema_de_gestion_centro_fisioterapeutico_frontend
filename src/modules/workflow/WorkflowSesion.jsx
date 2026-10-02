import {
    Box,
    Button,
} from "@mui/material";

import EstadoRegistro
    from "../../components/common/EstadoRegistro";

import SesionForm
    from "../../pages/sesiones/components/SesionForm";

function WorkflowSesion({

    formData,

    setFormData,

    errores,

    tratamientos,

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

            <SesionForm

                formData={formData}

                setFormData={setFormData}

                errores={errores}

                tratamientos={tratamientos}

                onChange={onChange}

                bloquearTratamiento={true}

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

                                ? "Actualizar Sesión"

                                : "Guardar Sesión"

                    }

                </Button>

            </Box>

        </>

    );

}

export default WorkflowSesion;