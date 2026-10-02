import { Chip } from "@mui/material";

function EstadoRegistro({

    guardado,

    editando,

}) {

    return (

        <Chip

            color={
                !guardado
                    ? "info"
                    : editando
                        ? "warning"
                        : "success"
            }

            label={
                !guardado
                    ? "Nuevo"
                    : editando
                        ? "Editando"
                        : "Guardado"
            }

        />

    );

}

export default EstadoRegistro;