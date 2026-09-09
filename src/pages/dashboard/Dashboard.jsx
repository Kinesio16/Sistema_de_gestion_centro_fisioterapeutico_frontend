import {
    Grid,
    Box,
    CircularProgress,
} from "@mui/material";

import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import HealingRoundedIcon from "@mui/icons-material/HealingRounded";

import PageTitle from "../../components/common/PageTitle";

import DashboardCard from "./components/DashboardCard";
import DashboardSectionCard from "./components/DashboardSectionCard";

import useDashboard from "../../hooks/useDashboard";
import DashboardSucursalCard from "./components/DashboardSucursalCard";

function Dashboard() {

    const {

        dashboard,

        loading,

    } = useDashboard();

    if (loading) {

        return (

            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    mt:10,
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <>

            <PageTitle
                title="Dashboard"
                subtitle="Resumen general del sistema"
            />
              <Grid
                container
                spacing={4}
                sx={{
                    mb: 4,
                }}
            >

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >

                    <DashboardCard
                        titulo="Pacientes"
                        valor={dashboard.totalPacientes}
                        icono={<PeopleRoundedIcon fontSize="large" />}
                        color="#1976d2"
                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >

                    <DashboardCard
                        titulo="Fisioterapeutas"
                        valor={dashboard.totalFisioterapeutas}
                        icono={<MedicalServicesRoundedIcon fontSize="large" />}
                        color="#2e7d32"
                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >

                    <DashboardCard
                        titulo="Citas de hoy"
                        valor={dashboard.citasHoy}
                        icono={<EventAvailableRoundedIcon fontSize="large" />}
                        color="#ed6c02"
                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3,
                    }}
                >

                    <DashboardCard
                        titulo="Sesiones de hoy"
                        valor={dashboard.sesionesHoy}
                        icono={<AssignmentTurnedInRoundedIcon fontSize="large" />}
                        color="#0288d1"
                    />

                </Grid>

            </Grid>

            <Grid
                container
                spacing={4}
                sx={{
                    mb: 4,
                }}
            >

                <Grid
                    size={{
                        xs: 12,
                        lg: 6,
                    }}
                >

                    <DashboardSectionCard

                        titulo="Ingresos"

                        icono={
                            <AttachMoneyRoundedIcon
                                color="success"
                            />
                        }

                        items={[

                            {
                                label: "Hoy",
                                value: `$ ${dashboard.ingresosHoy}`,
                            },

                            {
                                label: "Esta semana",
                                value: `$ ${dashboard.ingresosSemana}`,
                            },

                            {
                                label: "Este mes",
                                value: `$ ${dashboard.ingresosMes}`,
                            },

                            {
                                label: "Este año",
                                value: `$ ${dashboard.ingresosAnio}`,
                            },

                        ]}

                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        lg: 6,
                    }}
                >

                    <DashboardSectionCard

                        titulo="Ventas"

                        icono={
                            <ReceiptLongRoundedIcon
                                color="primary"
                            />
                        }

                        items={[

                            {
                                label: "Hoy",
                                value: dashboard.ventasHoy,
                            },

                            {
                                label: "Esta semana",
                                value: dashboard.ventasSemana,
                            },

                            {
                                label: "Este mes",
                                value: dashboard.ventasMes,
                            },

                            {
                                label: "Este año",
                                value: dashboard.ventasAnio,
                            },

                        ]}

                    />

                </Grid>

            </Grid>

            <Grid
                container
                spacing={4}
                sx={{
                    mb: 4,
                }}
            >

                {
                    dashboard.ventasPorSucursal?.map((sucursal) => (

                        <Grid
                            key={sucursal.sucursalId}
                            size={{
                                xs: 12,
                                md: 6,
                                lg: 4,
                            }}
                        >

                            <DashboardSucursalCard
                                sucursal={sucursal}
                            />

                        </Grid>

                    ))
                }

            </Grid>

            <Grid
                container
                spacing={4}
                sx={{
                    mb: 4,
                }}
            >

                <Grid
                    size={{
                        xs: 12,
                        lg: 6,
                    }}
                >

                    <DashboardSectionCard

                        titulo="Tratamientos"

                        icono={
                            <HealingRoundedIcon
                                color="success"
                            />
                        }

                        items={[

                            {
                                label: "Activos",
                                value: dashboard.tratamientosActivos,
                            },

                            {
                                label: "Suspendidos",
                                value: dashboard.tratamientosSuspendidos,
                            },

                            {
                                label: "Finalizados",
                                value: dashboard.tratamientosFinalizados,
                            },

                            {
                                label: "Cancelados",
                                value: dashboard.tratamientosCancelados,
                            },

                        ]}

                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        lg: 6,
                    }}
                >

                    <DashboardSectionCard

                        titulo="Actividad"

                        icono={
                            <TrendingUpRoundedIcon
                                color="warning"
                            />
                        }

                        items={[

                            {
                                label: "Sesiones pendientes",
                                value: dashboard.sesionesPendientes,
                            },

                            {
                                label: "Citas pendientes",
                                value: dashboard.citasPendientes,
                            },

                            {
                                label: "Ticket promedio",
                                value: `$ ${dashboard.ticketPromedio}`,
                            },

                            {
                                label: "Paquetes vendidos",
                                value: dashboard.paquetesVendidosMes,
                            },

                        ]}

                    />

                </Grid>

            </Grid>
      </>

    );

}

export default Dashboard;