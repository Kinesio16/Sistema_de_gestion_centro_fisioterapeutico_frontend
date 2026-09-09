import {
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
    Box,
} from "@mui/material";

import StoreRoundedIcon from "@mui/icons-material/StoreRounded";

function DashboardSucursalCard({ sucursal }) {

    const fila = (label, value) => (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 0.5,
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>

            <Typography fontWeight={600}>
                {value}
            </Typography>
        </Box>
    );

    return (

        <Card
            elevation={3}
            sx={{
                borderRadius: 4,
                height: "100%",
            }}
        >

            <CardContent>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={2}
                >

                    <StoreRoundedIcon color="primary"/>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        {sucursal.nombreSucursal}
                    </Typography>

                </Stack>

                <Typography
                    variant="subtitle2"
                    color="primary"
                    gutterBottom
                >
                    Ventas
                </Typography>

                {fila("Hoy", sucursal.ventasHoy)}
                {fila("Semana", sucursal.ventasSemana)}
                {fila("Mes", sucursal.ventasMes)}
                {fila("Año", sucursal.ventasAnio)}

                <Divider sx={{ my: 2 }}/>

                <Typography
                    variant="subtitle2"
                    color="success.main"
                    gutterBottom
                >
                    Ingresos
                </Typography>

                {fila("Hoy", `$ ${sucursal.ingresosHoy}`)}
                {fila("Semana", `$ ${sucursal.ingresosSemana}`)}
                {fila("Mes", `$ ${sucursal.ingresosMes}`)}
                {fila("Año", `$ ${sucursal.ingresosAnio}`)}

                <Divider sx={{ my: 2 }}/>

                {fila(
                    "Ticket promedio",
                    `$ ${sucursal.ticketPromedio}`
                )}

            </CardContent>

        </Card>

    );

}

export default DashboardSucursalCard;