import { useEffect, useMemo, useState } from "react";

import {
    Snackbar,
    Alert, 
} from "@mui/material";

import PageTitle from "../../components/common/PageTitle";
import SearchToolbar from "../../components/common/SearchToolbar";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import SesionDialog from "./components/SesionDialog";
import SesionDetailsDialog from "./components/SesionDetailsDialog";
import SesionTable from "./components/SesionTable";

import useSesiones from "../../hooks/useSesiones";

import { obtenerTratamientos } from "../../services/tratamientoService";

function Sesiones() {

    const {

        sesiones,

        loading,

        guardarSesion,

        actualizarSesion,

        cancelarSesion,

        registrarRealizada,

        registrarNoAsistio,

        reprogramarSesion,

    } = useSesiones();

    const [tratamientos, setTratamientos] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [openDetails, setOpenDetails] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);

    const [editando, setEditando] = useState(false);

    const [sesionSeleccionada, setSesionSeleccionada] = useState(null);

    const [busqueda, setBusqueda] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: "",

    });

    const formInicial = {

        tratamientoId: "",

        nombrePaciente: "",

        nombreFisioterapeuta: "",

        fechaSesion: "",

        horaInicio: "",

        horaFin: "",

        evolucionClinica: "",

        observaciones: "",

        proximaSesionObservacion: "",

        evaAntes: "",

        evaDespues: "",

        tecnicasAplicadas: [],

        proximaSesion: "",

    };

    const [formData, setFormData] = useState(formInicial);

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);

    const cargarTratamientos = async () => {

        try {

            const tratamientos = await obtenerTratamientos();

            setTratamientos(tratamientos);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        const cargar = async () => {

            await cargarTratamientos();

        };

        cargar();

    }, []);

    const sesionesFiltradas = useMemo(() => {

        const texto = busqueda.toLowerCase();

        return sesiones.filter((sesion) =>

            sesion.codigoSesion.toLowerCase().includes(texto)

            ||

            sesion.nombrePaciente.toLowerCase().includes(texto)

            ||

            sesion.nombreFisioterapeuta.toLowerCase().includes(texto)

            ||

            sesion.estado.toLowerCase().includes(texto)

        );

    }, [sesiones, busqueda]);

            const handleChange = (event) => {

        const { name, value } = event.target;

        if (name === "tratamientoId") {

            const tratamiento = tratamientos.find(
                t => t.id === value
            );

            if (tratamiento) {

                setFormData((prev) => ({

                    ...prev,

                    tratamientoId: value,

                    nombrePaciente:
                        tratamiento.nombrePaciente,

                    nombreFisioterapeuta:
                        tratamiento.nombreFisioterapeuta,

                }));

            }

            return;

        }

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    const validarFormulario = () => {

        const nuevosErrores = {};

        if (!formData.tratamientoId)

            nuevosErrores.tratamientoId =
                "Seleccione un tratamiento.";

        if (!formData.fechaSesion)

            nuevosErrores.fechaSesion =
                "Seleccione la fecha.";

        if (!formData.horaInicio)

            nuevosErrores.horaInicio =
                "Ingrese la hora de inicio.";

        if (!formData.horaFin)

            nuevosErrores.horaFin =
                "Ingrese la hora de fin.";

        if (!formData.evolucionClinica)

            nuevosErrores.evolucionClinica =
                "Ingrese la evolución clínica.";

        if (

            !formData.tecnicasAplicadas ||

            formData.tecnicasAplicadas.length === 0

        )

            nuevosErrores.tecnicasAplicadas =
                "Seleccione al menos una técnica.";

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;

    };

    const nuevaSesion = () => {

        setEditando(false);

        setSesionSeleccionada(null);

        setErrores({});

        setFormData(formInicial);

        setOpenDialog(true);

    };

    const editarSesion = (id) => {

        const sesion = sesiones.find(
            s => s.id === id
        );

        if (!sesion) return;

        setSesionSeleccionada(sesion);

        setEditando(true);

        setErrores({});

        setFormData({

            tratamientoId:
                sesion.tratamientoId,

            nombrePaciente:
                sesion.nombrePaciente,

            nombreFisioterapeuta:
                sesion.nombreFisioterapeuta,

            fechaSesion:
                sesion.fechaSesion,

            horaInicio:
                sesion.horaInicio,

            horaFin:
                sesion.horaFin,

            evolucionClinica:
                sesion.evolucionClinica,

            observaciones:
                sesion.observaciones,

            proximaSesionObservacion:
                sesion.proximaSesionObservacion,

            evaAntes:
                sesion.evaAntes,

            evaDespues:
                sesion.evaDespues,

            tecnicasAplicadas:
                sesion.tecnicasAplicadas || [],

            proximaSesion:
                sesion.proximaSesion,

        });

        setOpenDialog(true);

    };

    const verSesion = (id) => {

        const sesion = sesiones.find(
            s => s.id === id
        );

        if (!sesion) return;

        setSesionSeleccionada(sesion);

        setOpenDetails(true);

    };

        const guardar = async () => {

            if (guardando) return;

            if (!validarFormulario()) return;

            setGuardando(true);

        try {

            if (editando) {

                await actualizarSesion(

                    sesionSeleccionada.id,

                    formData

                );

                setSnackbar({

                    open: true,

                    severity: "success",

                    message:
                        "Sesión actualizada correctamente.",

                });

            } else {

                await guardarSesion(formData);

                setSnackbar({

                    open: true,

                    severity: "success",

                    message:
                        "Sesión registrada correctamente.",

                });

            }

            setOpenDialog(false);

            setErrores({});

            setFormData(formInicial);

        } catch (error) {

            console.error(error);

            setSnackbar({

                open: true,

                severity: "error",

                message:

                    error.response?.data?.message ||

                    "Ocurrió un error al guardar la sesión.",

            });

        }finally {

                setGuardando(false);

            }

    };

    const cancelar = (sesion) => {

        setSesionSeleccionada(sesion);

        setOpenConfirm(true);

    };

    const confirmarCancelar = async () => {

        try {

            await cancelarSesion(

                sesionSeleccionada.id

            );

            setSnackbar({

                open: true,

                severity: "success",

                message:
                    "Sesión cancelada correctamente.",

            });

        } catch (error) {

            console.error(error);

            setSnackbar({

                open: true,

                severity: "error",

                message:

                    error.response?.data?.message ||

                    "No fue posible cancelar la sesión.",

            });

        }

        setOpenConfirm(false);

    };

    const realizarSesion = async () => {

        try {

            await registrarRealizada(

                sesionSeleccionada.id

            );

            setOpenDetails(false);

            setSnackbar({

                open: true,

                severity: "success",

                message:
                    "Sesión marcada como realizada.",

            });

        } catch (error) {

            console.error(error);

            setSnackbar({

                open: true,

                severity: "error",

                message:

                    error.response?.data?.message ||

                    "No fue posible registrar la sesión.",

            });

        }

    };

    const noAsistioSesion = async () => {

        try {

            await registrarNoAsistio(

                sesionSeleccionada.id

            );

            setOpenDetails(false);

            setSnackbar({

                open: true,

                severity: "success",

                message:
                    "Sesión marcada como no asistió.",

            });

        } catch (error) {

            console.error(error);

            setSnackbar({

                open: true,

                severity: "error",

                message:

                    error.response?.data?.message ||

                    "No fue posible actualizar la sesión.",

            });

        }

    };

    const reprogramar = async (data) => {

        try {

            await reprogramarSesion(

                sesionSeleccionada.id,

                data

            );

            setOpenDetails(false);

            setSnackbar({

                open: true,

                severity: "success",

                message:
                    "Sesión reprogramada correctamente.",

            });

        } catch (error) {

            console.error(error);

            setSnackbar({

                open: true,

                severity: "error",

                message:

                    error.response?.data?.message ||

                    "No fue posible reprogramar la sesión.",

            });

        }

    };

    return (

            <>
                <PageTitle
                    title="Sesiones"
                    subtitle="Gestión de sesiones"
                />

                <SearchToolbar
                    placeholder="Buscar sesión..."
                    busqueda={busqueda}
                    onBuscar={setBusqueda}
                    buttonText="Nueva Sesión"
                    onNuevo={nuevaSesion}
                />

                <SesionTable
                    sesiones={sesionesFiltradas}
                    loading={loading}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChange={setRowsPerPage}
                    onVer={verSesion}
                    onEditar={editarSesion}
                    onCancelar={cancelar}
                />

            

            <SesionDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onGuardar={guardar}
                guardando={guardando}
                formData={formData}
                onChange={handleChange}
                errores={errores}
                tratamientos={tratamientos}
                editando={editando}
            />

            <SesionDetailsDialog
                open={openDetails}
                onClose={() => setOpenDetails(false)}
                sesion={sesionSeleccionada}
                onRealizar={realizarSesion}
                onNoAsistio={noAsistioSesion}
                onReprogramar={reprogramar}
            />

            <ConfirmDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={confirmarCancelar}
                title="Cancelar sesión"
                message="¿Está seguro de cancelar esta sesión?"
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            >

                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() =>
                        setSnackbar((prev) => ({
                            ...prev,
                            open: false,
                        }))
                    }
                >
                    {snackbar.message}
                </Alert>

            </Snackbar>

        </>

    );

}

export default Sesiones;