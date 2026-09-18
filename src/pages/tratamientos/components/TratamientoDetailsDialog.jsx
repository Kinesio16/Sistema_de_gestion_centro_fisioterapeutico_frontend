import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography,
    Stack,
} from "@mui/material";

import EstadoTratamientoChip from "../../../components/common/EstadoTratamientoChip";
import ProgressTratamiento from "../../../components/common/ProgressTratamiento";

function TratamientoDetailsDialog({

    open,

    onClose,

    tratamiento,

    onSuspender,

    onReanudar,

    onFinalizar,

    onCancelar,

}) {

    if (!tratamiento) return null;

    return (

        <Dialog

            open={open}

            onClose={onClose}

            maxWidth="lg"

            fullWidth

        >

            <DialogTitle>

                Detalle del Tratamiento

            </DialogTitle>

            <DialogContent dividers>

                {/* ========================= */}
                {/* INFORMACIÓN GENERAL */}
                {/* ========================= */}

                <Typography

                    variant="h6"

                    fontWeight="bold"

                    gutterBottom

                >

                    Información General

                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography color="text.secondary">

                            Código

                        </Typography>

                        <Typography>

                            {tratamiento.codigoTratamiento}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography color="text.secondary">

                            Estado

                        </Typography>

                        <EstadoTratamientoChip

                            estado={tratamiento.estado}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography color="text.secondary">

                            Avance

                        </Typography>

                        <ProgressTratamiento

                            realizadas={

                                tratamiento.sesionesRealizadas

                            }

                            planificadas={

                                tratamiento.sesionesPlanificadas

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography color="text.secondary">

                            Paciente

                        </Typography>

                        <Typography>

                            {tratamiento.nombrePaciente}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography color="text.secondary">

                            Fisioterapeuta

                        </Typography>

                        <Typography>

                            {tratamiento.nombreFisioterapeuta}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography color="text.secondary">

                            Fecha Inicio

                        </Typography>

                        <Typography>

                            {tratamiento.fechaInicio}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography color="text.secondary">

                            Fecha Estimada Alta

                        </Typography>

                        <Typography>

                            {tratamiento.fechaEstimadaAlta || "-"}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Typography color="text.secondary">

                            Fecha Alta

                        </Typography>

                        <Typography>

                            {tratamiento.fechaAlta || "-"}

                        </Typography>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 4 }} />
                            
                                    {/* ========================= */}
                {/* PLAN TERAPÉUTICO */}
                {/* ========================= */}

                <Typography

                    variant="h6"

                    fontWeight="bold"

                    gutterBottom

                >

                    Plan Terapéutico

                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">

                            Objetivo General

                        </Typography>

                        <Typography>

                            {tratamiento.objetivoGeneral || "-"}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">

                            Objetivos Específicos

                        </Typography>

                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                            }}
                        >

                            {tratamiento.objetivosEspecificos || "-"}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">

                            Diagnóstico Fisioterapéutico

                        </Typography>

                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                            }}
                        >

                            {tratamiento.diagnostico || "-"}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">

                            Tratamiento Propuesto

                        </Typography>

                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                            }}
                        >

                            {tratamiento.tratamientoPropuesto || "-"}

                        </Typography>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 4 }} />
                                    {/* ========================= */}
                {/* PROGRESO DEL TRATAMIENTO */}
                {/* ========================= */}

                <Typography

                    variant="h6"

                    fontWeight="bold"

                    gutterBottom

                >

                    Seguimiento del Tratamiento

                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12 }}>

                        <Typography
                            color="text.secondary"
                            gutterBottom
                        >

                            Avance del Tratamiento

                        </Typography>

                        <ProgressTratamiento

                            realizadas={
                                tratamiento.sesionesRealizadas
                            }

                            planificadas={
                                tratamiento.sesionesPlanificadas
                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <Typography color="text.secondary">

                            Sesiones Planificadas

                        </Typography>

                        <Typography fontWeight="bold">

                            {tratamiento.sesionesPlanificadas}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <Typography color="text.secondary">

                            Sesiones Realizadas

                        </Typography>

                        <Typography
                            fontWeight="bold"
                            color="success.main"
                        >

                            {tratamiento.sesionesRealizadas}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <Typography color="text.secondary">

                            Sesiones Pendientes

                        </Typography>

                        <Typography
                            fontWeight="bold"
                            color="warning.main"
                        >

                            {tratamiento.sesionesPendientes}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <Typography color="text.secondary">

                            Frecuencia Semanal

                        </Typography>

                        <Typography fontWeight="bold">

                            {tratamiento.frecuenciaSemanal}

                            {" "}sesión(es)

                        </Typography>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* ========================= */}
                {/* TÉCNICAS */}
                {/* ========================= */}

                <Typography

                    variant="h6"

                    fontWeight="bold"

                    gutterBottom

                >

                    Técnicas del Tratamiento

                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Typography
                    sx={{
                        whiteSpace: "pre-line",
                    }}
                >

                    {

                        tratamiento.tecnicas?.length > 0

                            ? tratamiento.tecnicas.join(", ")

                            : "-"

                    }

                </Typography>

                <Divider sx={{ my: 4 }} />
                                    {/* ========================= */}
                {/* OBSERVACIONES */}
                {/* ========================= */}

                <Typography

                    variant="h6"

                    fontWeight="bold"

                    gutterBottom

                >

                    Observaciones

                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12 }}>

                        <Typography color="text.secondary">
                            Observaciones
                        </Typography>

                        <Typography
                            sx={{
                                whiteSpace: "pre-line",
                            }}
                        >
                            {tratamiento.observacionesIniciales || "-"}
                        </Typography>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* ========================= */}
                {/* INFORMACIÓN DEL REGISTRO */}
                {/* ========================= */}

                <Typography

                    variant="h6"

                    fontWeight="bold"

                    gutterBottom

                >

                    Información del Registro

                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography color="text.secondary">

                            Fecha de Creación

                        </Typography>

                        <Typography>

                            {tratamiento.fechaCreacion || "-"}

                        </Typography>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Typography color="text.secondary">

                            Última Actualización

                        </Typography>

                        <Typography>

                            {tratamiento.fechaActualizacion || "-"}

                        </Typography>

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "space-between",
                    px: 3,
                    py: 2,
                }}
            >

                <Stack
                    direction="row"
                    spacing={1}
                >

                    {

                        tratamiento.estado === "ACTIVO" && (

                            <>

                                <Button

                                    color="warning"

                                    variant="outlined"

                                    onClick={onSuspender}

                                >

                                    Suspender

                                </Button>

                                <Button

                                    color="success"

                                    variant="contained"

                                    onClick={onFinalizar}

                                >

                                    Finalizar

                                </Button>

                                <Button

                                    color="error"

                                    variant="outlined"

                                    onClick={onCancelar}

                                >

                                    Cancelar

                                </Button>

                            </>

                        )

                    }

                    {

                        tratamiento.estado === "SUSPENDIDO" && (

                            <>

                                <Button

                                    color="success"

                                    variant="contained"

                                    onClick={onReanudar}

                                >

                                    Reanudar

                                </Button>

                                <Button

                                    color="error"

                                    variant="outlined"

                                    onClick={onCancelar}

                                >

                                    Cancelar

                                </Button>

                            </>

                        )

                    }

                </Stack>

                <Button

                    variant="contained"

                    onClick={onClose}

                >

                    Cerrar

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default TratamientoDetailsDialog;