import {
    Autocomplete,
    Divider,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

function SesionForm({

    formData,

    onChange,

    errores,

    tratamientos,

    bloquearTratamiento,

}) {

    const tecnicas = [

        "Masoterapia",

        "Electroterapia",

        "Ultrasonido",

        "TENS",

        "Crioterapia",

        "Termoterapia",

        "Punción seca",

        "Vendaje neuromuscular",

        "Movilización articular",

        "Ejercicio terapéutico",

        "Liberación miofascial",

        "Estiramientos",

        "Ondas de choque",

        "Drenaje linfático",

        "Fortalecimiento muscular",

    ];

    return (

        <Grid container spacing={3}>

            {/* ========================= */}
            {/* INFORMACIÓN DEL TRATAMIENTO */}
            {/* ========================= */}

            <Grid size={12}>

                <Paper
                    elevation={2}
                    sx={{
                        p:3,
                        borderRadius:3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                    >

                        Información del Tratamiento

                    </Typography>

                    <Divider sx={{mb:3}}/>

                    <Grid container spacing={2}>

                        <Grid size={12}>

                            <Autocomplete

                                disabled={bloquearTratamiento}
                                options={tratamientos}

                                value={
                                    tratamientos.find(
                                        t =>
                                        t.id ===
                                        formData.tratamientoId
                                    ) || null
                                }

                                getOptionLabel={(option)=>

                                    option.codigoTratamiento

                                }

                                isOptionEqualToValue={(a,b)=>

                                    a.id===b.id

                                }

                                onChange={(event,value)=>

                                    onChange({

                                        target:{

                                            name:"tratamientoId",

                                            value:value?.id || ""

                                        }

                                    })

                                }

                                renderInput={(params)=>

                                    <TextField

                                        {...params}

                                        label="Tratamiento"

                                        margin="normal"

                                        error={!!errores.tratamientoId}

                                        helperText={errores.tratamientoId}

                                    />

                                }

                            />

                        </Grid>

                        <Grid size={{xs:12,md:6}}>

                            <TextField
                                fullWidth
                                label="Paciente"
                                margin="normal"
                                value={formData.nombrePaciente || ""}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                            />

                        </Grid>

                        <Grid size={{xs:12,md:6}}>

                            <TextField

                                fullWidth

                                label="Fisioterapeuta"

                                margin="normal"

                                value={
                                    formData.nombreFisioterapeuta || ""
                                }

                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}

                            />

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

            {/* ========================= */}
            {/* INFORMACIÓN DE LA SESIÓN */}
            {/* ========================= */}

            <Grid size={12}>

                <Paper
                    elevation={2}
                    sx={{
                        p:3,
                        borderRadius:3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                    >

                        Información de la Sesión

                    </Typography>

                    <Divider sx={{mb:3}}/>

                    <Grid container spacing={2}>

                        <Grid size={{xs:12,md:4}}>

                            <TextField

                                fullWidth

                                type="date"

                                label="Fecha"

                                name="fechaSesion"

                                value={formData.fechaSesion}

                                onChange={onChange}

                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}

                            />

                        </Grid>

                        <Grid size={{xs:12,md:4}}>

                            <TextField

                                fullWidth

                                type="time"

                                label="Hora Inicio"

                                name="horaInicio"

                                value={formData.horaInicio}

                                onChange={onChange}

                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}

                            />

                        </Grid>

                        <Grid size={{xs:12,md:4}}>

                            <TextField

                                fullWidth

                                type="time"

                                label="Hora Fin"

                                name="horaFin"

                                value={formData.horaFin}

                                onChange={onChange}

                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}

                            />

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

            {/* ========================= */}
            {/* EVALUACIÓN CLÍNICA */}
            {/* ========================= */}

            <Grid size={12}>

                <Paper
                    elevation={2}
                    sx={{
                        p:3,
                        borderRadius:3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                    >

                        Evaluación Clínica

                    </Typography>

                    <Divider sx={{mb:3}}/>

                    <Grid container spacing={2}>

                        <Grid size={{xs:12,md:6}}>

                            <TextField

                                fullWidth

                                type="number"

                                label="EVA Antes"

                                name="evaAntes"

                                value={formData.evaAntes}

                                onChange={onChange}

                            />

                        </Grid>

                        <Grid size={{xs:12,md:6}}>

                            <TextField

                                fullWidth

                                type="number"

                                label="EVA Después"

                                name="evaDespues"

                                value={formData.evaDespues}

                                onChange={onChange}

                            />

                        </Grid>

                        <Grid size={12}>

                            <Autocomplete

                                multiple

                                options={tecnicas}

                                value={
                                    formData.tecnicasAplicadas || []
                                }

                                onChange={(event,value)=>

                                    onChange({

                                        target:{

                                            name:"tecnicasAplicadas",

                                            value

                                        }

                                    })

                                }

                                renderInput={(params)=>

                                    <TextField

                                        {...params}

                                        label="Técnicas Aplicadas"

                                    />

                                }

                            />

                        </Grid>

                        <Grid size={12}>

                            <TextField

                                fullWidth

                                multiline

                                rows={4}

                                label="Evolución Clínica"

                                name="evolucionClinica"

                                value={
                                    formData.evolucionClinica
                                }

                                onChange={onChange}

                            />

                        </Grid>

                        <Grid size={12}>

                            <TextField

                                fullWidth

                                multiline

                                rows={3}

                                label="Observaciones"

                                name="observaciones"

                                value={
                                    formData.observaciones
                                }

                                onChange={onChange}

                            />

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

            {/* ========================= */}
            {/* PRÓXIMA SESIÓN */}
            {/* ========================= */}

            <Grid size={12}>

                <Paper
                    elevation={2}
                    sx={{
                        p:3,
                        borderRadius:3
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                    >

                        Próxima Sesión

                    </Typography>

                    <Divider sx={{mb:3}}/>

                    <Grid container spacing={2}>

                        <Grid size={{xs:12,md:4}}>

                            <TextField

                                fullWidth

                                type="date"

                                label="Fecha"

                                name="proximaSesion"

                                value={formData.proximaSesion}

                                onChange={onChange}

                                InputLabelProps={{
                                    shrink:true
                                }}

                            />

                        </Grid>

                        <Grid size={{xs:12,md:8}}>

                            <TextField

                                fullWidth

                                multiline

                                rows={3}

                                label="Observaciones"

                                name="proximaSesionObservacion"

                                value={
                                    formData.proximaSesionObservacion
                                }

                                onChange={onChange}

                            />

                        </Grid>

                    </Grid>

                </Paper>

            </Grid>

        </Grid>

    );

}

export default SesionForm;