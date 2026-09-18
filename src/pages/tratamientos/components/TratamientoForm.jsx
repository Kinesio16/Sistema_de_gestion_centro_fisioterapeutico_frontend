import {
    Grid,
    TextField,
    Typography,
    Divider,
    Autocomplete,
    Paper,
    Stack,
    Button,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

const tecnicasDisponibles = [

    "Masoterapia",

    "Electroterapia",

    "Ultrasonido",

    "Laserterapia",

    "Termoterapia",

    "Crioterapia",

    "Punción seca",

    "Vendaje neuromuscular",

    "Movilización articular",

    "Ejercicio terapéutico",

    "Fortalecimiento muscular",

    "Propiocepción",

    "Reeducación de la marcha",

    "Estiramientos",

    "Realidad Virtual",

];

function TratamientoForm({

    formData,

    onChange,

    errores,

    pacientes,

    fisioterapeutas,

    evaluaciones,

    editarInformacion,

    setEditarInformacion,

    editando,

}) {

    const evaluacionSeleccionada =
    evaluaciones.find(
        e => e.id === formData.evaluacionId
    );
    
    return (

        <>

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

                    <Autocomplete
                        disabled={editando}
                        options={pacientes}
                        getOptionKey={(option) => option.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) =>
                            `${option.nombres} ${option.apellidos}`
                        }
                        value={
                            pacientes.find(
                                p => p.id === formData.pacienteId
                            ) || null
                        }
                        onChange={(event, value) =>
                            onChange({
                                target: {
                                    name: "pacienteId",
                                    value: value?.id || "",
                                },
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Paciente"
                                error={!!errores.pacienteId}
                                helperText={errores.pacienteId}
                            />
                        )}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Autocomplete
                        options={fisioterapeutas}
                        getOptionKey={(option) => option.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) =>
                            `${option.nombres} ${option.apellidos}`
                        }
                        value={
                            fisioterapeutas.find(
                                f => f.id === formData.fisioterapeutaId
                            ) || null
                        }
                        onChange={(event, value) =>
                            onChange({
                                target: {
                                    name: "fisioterapeutaId",
                                    value: value?.id || "",
                                },
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Fisioterapeuta"
                                error={!!errores.fisioterapeutaId}
                                helperText={errores.fisioterapeutaId}
                            />
                        )}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Autocomplete
                        disabled={editando}
                        options={evaluaciones}
                        getOptionKey={(option) => option.id}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) =>
                            option.codigoEvaluacion || ""
                        }
                        value={
                            evaluaciones.find(
                                e => e.id === formData.evaluacionId
                            ) || null
                        }
                        onChange={(event, value) =>
                            onChange({
                                target: {
                                    name: "evaluacionId",
                                    value: value?.id || "",
                                },
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Evaluación"
                                error={!!errores.evaluacionId}
                                helperText={errores.evaluacionId}
                            />
                        )}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        type="date"

                        label="Fecha Inicio"

                        name="fechaInicio"

                        value={formData.fechaInicio ?? ""}

                        onChange={onChange}

                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}

                        error={!!errores.fechaInicio}

                        helperText={errores.fechaInicio}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        type="date"

                        label="Fecha Estimada Alta"

                        name="fechaEstimadaAlta"

                        value={formData.fechaEstimadaAlta ?? ""}

                        onChange={onChange}

                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}

                    />

                </Grid>

            </Grid>
                            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >

                Plan Terapéutico

            </Typography>

            <Divider sx={{ mb: 3 }} />

            {
                !editarInformacion && evaluacionSeleccionada ? (

                    <Paper
                        elevation={1}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                        }}
                    >

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >

                            <Typography
                                variant="h6"
                                fontWeight={600}
                            >
                                Información importada de la evaluación
                            </Typography>

                            <Button
                                variant="outlined"
                                startIcon={<EditRoundedIcon />}
                                onClick={() =>
                                    setEditarInformacion(true)
                                }
                            >
                                Editar información
                            </Button>

                        </Stack>

                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                        >
                            Objetivo General
                        </Typography>

                        <Typography mb={2}>
                            {formData.objetivoGeneral || "-"}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                        >
                            Objetivos Específicos
                        </Typography>

                        <Typography mb={2}>
                            {formData.objetivosEspecificos || "-"}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                        >
                            Diagnóstico
                        </Typography>

                        <Typography mb={2}>
                            {formData.diagnostico || "-"}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                        >
                            Tratamiento Propuesto
                        </Typography>

                        <Typography>
                            {formData.tratamientoPropuesto || "-"}
                        </Typography>

                    </Paper>

                ) : (

                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Objetivo General"
                                name="objetivoGeneral"
                                value={formData.objetivoGeneral ?? ""}
                                onChange={onChange}
                                error={!!errores.objetivoGeneral}
                                helperText={errores.objetivoGeneral}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Objetivos Específicos"
                                name="objetivosEspecificos"
                                value={formData.objetivosEspecificos ?? ""}
                                onChange={onChange}
                                error={!!errores.objetivosEspecificos}
                                helperText={errores.objetivosEspecificos}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Diagnóstico Fisioterapéutico"
                                name="diagnostico"
                                value={formData.diagnostico ?? ""}
                                onChange={onChange}
                                error={!!errores.diagnostico}
                                helperText={errores.diagnostico}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Tratamiento Propuesto"
                                name="tratamientoPropuesto"
                                value={formData.tratamientoPropuesto ?? ""}
                                onChange={onChange}
                                error={!!errores.tratamientoPropuesto}
                                helperText={errores.tratamientoPropuesto}
                            />
                        </Grid>

                    </Grid>

                )
            }

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >

                Técnicas Aplicadas

            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Autocomplete

                multiple

                options={tecnicasDisponibles}

                value={formData.tecnicas}

                onChange={(event, value) =>

                    onChange({

                        target: {

                            name: "tecnicas",

                            value,

                        },

                    })

                }

                renderInput={(params) => (

                    <TextField

                        {...params}

                        label="Técnicas"

                        error={!!errores.tecnicas}

                        helperText={errores.tecnicas}

                    />

                )}

            />
                            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >

                Planificación del Tratamiento

            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        type="number"

                        label="Sesiones Planificadas"

                        name="sesionesPlanificadas"

                        value={formData.sesionesPlanificadas ?? 0}

                        onChange={onChange}

                        error={!!errores.sesionesPlanificadas}

                        helperText={errores.sesionesPlanificadas}

                        slotProps={{
                            htmlInput: {
                                min: 1,
                            },
                        }}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        type="number"

                        label="Frecuencia Semanal"

                        name="frecuenciaSemanal"

                        value={formData.frecuenciaSemanal ?? 0}

                        onChange={onChange}

                        error={!!errores.frecuenciaSemanal}

                        helperText={errores.frecuenciaSemanal}

                        slotProps={{
                            htmlInput: {
                                min: 1,
                            },
                        }}

                    />

                </Grid>

            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography

                variant="h6"

                fontWeight="bold"

                gutterBottom

            >

                Observaciones

            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>

                <Grid size={{ xs: 12 }}>

                    <TextField

                        fullWidth

                        multiline

                        rows={4}

                        label="Observaciones"

                        name="observacionesIniciales"

                        value={formData.observacionesIniciales ?? ""}

                        onChange={onChange}

                        error={!!errores.observacionesIniciales}

                        helperText={errores.observacionesIniciales}

                    />

                </Grid>

            </Grid>

        </>

    );

}

export default TratamientoForm;