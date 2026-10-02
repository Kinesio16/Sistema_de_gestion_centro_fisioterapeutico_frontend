import {
    Box,
    Button,
} from "@mui/material";

import EstadoRegistro
    from "../../components/common/EstadoRegistro";

import VentaForm
    from "../../pages/ventas/components/VentaForm";

function WorkflowVenta({

    formData,

    errores,

    pacientes,

    servicios,

    fisioterapeutas,

    sucursales,

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

            <VentaForm

                formData={formData}

                errores={errores}

                pacientes={pacientes}

                servicios={servicios}

                fisioterapeutas={fisioterapeutas}

                sucursales={sucursales}

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

                                ? "Actualizar Venta"

                                : "Guardar Venta"

                    }

                </Button>

            </Box>

        </>

    );

}

export default WorkflowVenta;