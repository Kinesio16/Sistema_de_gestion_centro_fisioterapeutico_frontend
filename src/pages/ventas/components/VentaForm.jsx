import {
    Grid,
    TextField,
    Autocomplete,
    MenuItem,
    Typography,
    Divider,
    Paper,
} from "@mui/material";

function VentaForm({

    formData,

    onChange,

    errores,

    pacientes,

    servicios,

    fisioterapeutas,

    sucursales,

}) {
    

    return (

        <Grid container spacing={3}>

            {/* COLUMNA IZQUIERDA */}

            <Grid size={{ xs: 12, md: 6 }}>

                <Autocomplete

                    options={pacientes}
                    value={
                        pacientes.find(
                            p => p.id === formData.pacienteId
                        ) || null
                    }
                    getOptionLabel={(option) =>
                        option ? `${option.nombres} ${option.apellidos}` : ""
                    }
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.nombres} {option.apellidos}
                        </li>
                    )}

                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }

                    onChange={(event, value) =>

                        onChange({

                            target: {

                                name: "pacienteId",

                                value: value?.id || ""

                            }

                        })

                    }

                    renderInput={(params) => (

                        <TextField

                            {...params}

                            label="Paciente"

                            margin="normal"

                            error={!!errores.pacienteId}

                            helperText={errores.pacienteId}

                        />

                    )}

                />

                <Autocomplete

                    options={servicios}

                    value={
                        servicios.find(
                            s => s.id === formData.servicioId
                        ) || null
                    }

                    getOptionLabel={(option) => option?.nombre ?? ""}

                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }

                    onChange={(event, value) =>
                        onChange({
                            target: {
                                name: "servicio",
                                value
                            }
                        })
                    }

                    renderInput={(params) => (

                        <TextField

                            {...params}

                            label="Servicio"

                            margin="normal"

                            error={!!errores.servicioId}

                            helperText={errores.servicioId}

                        />

                    )}

                />

                <Autocomplete

                    options={fisioterapeutas}

                    value={
                        fisioterapeutas.find(
                            f => f.id === formData.fisioterapeutaId
                        ) || null
                    }

                    getOptionLabel={(option) =>
                        option ? `${option.nombres} ${option.apellidos}` : ""
                    }
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.nombres} {option.apellidos}
                        </li>
                    )}

                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }

                    onChange={(event, value) =>

                        onChange({

                            target: {

                                name: "fisioterapeutaId",

                                value: value?.id || ""

                            }

                        })

                    }

                    renderInput={(params) => (

                        <TextField

                            {...params}

                            label="Fisioterapeuta"

                            margin="normal"

                        />

                    )}

                />

                <Autocomplete

                    options={sucursales}

                    value={
                        sucursales.find(
                            s => s.id === formData.sucursalId
                        ) || null
                    }

                    getOptionLabel={(option) =>
                        option.nombre
                    }

                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }

                    onChange={(event, value) =>

                        onChange({

                            target: {

                                name: "sucursalId",

                                value: value?.id || ""

                            }

                        })

                    }

                    renderInput={(params) => (

                        <TextField

                            {...params}

                            label="Sucursal"

                            margin="normal"

                        />

                    )}

                />

            </Grid>

            {/* COLUMNA DERECHA */}

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Forma de pago"
                    name="formaPago"
                    value={formData.formaPago}
                    onChange={onChange}
                    error={!!errores.formaPago}
                    helperText={errores.formaPago}
                >

                    <MenuItem value="EFECTIVO">
                        Efectivo
                    </MenuItem>

                    <MenuItem value="TRANSFERENCIA">
                        Transferencia
                    </MenuItem>

                    <MenuItem value="TARJETA_DEBITO">
                        Tarjeta de débito
                    </MenuItem>

                    <MenuItem value="TARJETA_CREDITO">
                        Tarjeta de crédito
                    </MenuItem>

                    <MenuItem value="OTRO">
                        Otro
                    </MenuItem>

                </TextField>

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Estado del pago"
                    name="estadoPago"
                    value={formData.estadoPago}
                    onChange={onChange}
                >

                    <MenuItem value="PENDIENTE">
                        Pendiente
                    </MenuItem>

                    <MenuItem value="PAGADO">
                        Pagado
                    </MenuItem>

                    <MenuItem value="ABONADO">
                        Abonado
                    </MenuItem>

                </TextField>

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Estado de factura"
                    name="estadoFactura"
                    value={formData.estadoFactura}
                    onChange={onChange}
                >

                    <MenuItem value="PENDIENTE">
                        Pendiente
                    </MenuItem>

                    <MenuItem value="EMITIDA">
                        Emitida
                    </MenuItem>

                    <MenuItem value="NO_REQUIERE">
                        No requiere
                    </MenuItem>

                </TextField>

                <TextField
                    fullWidth
                    margin="normal"
                    type="number"
                    label="Descuento"
                    name="descuento"
                    value={formData.descuento}
                    onChange={onChange}
                    slotProps={{
                        htmlInput: {
                            min: 0,
                            step: 0.01,
                        },
                    }}
                />

            </Grid>

            <Grid size={12}>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    label="Observaciones"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={onChange}
                />

            </Grid>

            <Grid size={12}>

            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    mt: 2,
                    borderRadius: 3,
                    backgroundColor: "#fafafa",
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Resumen de la Venta
                </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Precio
                </Typography>

                <Typography variant="h6">

                    $
                    {Number(
                        formData.precioUnitario || 0
                    ).toFixed(2)}

                </Typography>

            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Sesiones
                                </Typography>

                                <Typography variant="h6">

                                    {formData.cantidadSesiones || 0}

                                </Typography>

                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Descuento
                                </Typography>

                                <Typography variant="h6">

                                    $
                                    {Number(
                                        formData.descuento || 0
                                    ).toFixed(2)}

                                </Typography>

                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Total
                                </Typography>

                                <Typography
                                    variant="h5"
                                    color="primary"
                                    fontWeight="bold"
                                >

                                    $
                                    {Number(
                                        formData.total || 0
                                    ).toFixed(2)}

                                </Typography>

                            </Grid>

                        </Grid>

                    </Paper>

                </Grid>

            <Grid size={12}>

            </Grid>

        </Grid>

    );

}

export default VentaForm;