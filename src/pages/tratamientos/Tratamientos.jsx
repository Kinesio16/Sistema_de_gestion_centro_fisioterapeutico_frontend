import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Snackbar,
} from "@mui/material";

import PageTitle from "../../components/common/PageTitle";
import SearchToolbar from "../../components/common/SearchToolbar";

import ConfirmDialog from "../../components/common/ConfirmDialog";

import TratamientoTable from "./components/TratamientoTable";
import TratamientoDialog from "./components/TratamientoDialog";
import TratamientoDetailsDialog from "./components/TratamientoDetailsDialog";

import useTratamientos from "../../hooks/useTratamientos";

import {
    obtenerPacientesActivos,
} from "../../services/pacienteService";

import {
    obtenerFisioterapeutasActivos,
} from "../../services/fisioterapeutaService";

import {
    obtenerEvaluaciones,
    obtenerEvaluacion
} from "../../services/evaluacionService";

function Tratamientos() {

    const {

        tratamientos,

        loading,

        guardarTratamiento,

        actualizarTratamiento,

        suspenderTratamiento,

        reanudarTratamiento,

        finalizarTratamiento,

        cancelarTratamiento,

    } = useTratamientos();

    const [pacientes, setPacientes] = useState([]);

    const [fisioterapeutas, setFisioterapeutas] = useState([]);

    const [evaluaciones, setEvaluaciones] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [openDetails, setOpenDetails] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);

    const [editando, setEditando] = useState(false);

    const [editarInformacion, setEditarInformacion] = useState(false);

    const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState(null);

    const [busqueda, setBusqueda] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [accionPendiente, setAccionPendiente] = useState("");

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: "",

    });

            const formInicial = {

        pacienteId: "",

        fisioterapeutaId: "",

        evaluacionId: "",

        fechaInicio: "",

        fechaEstimadaAlta: "",

        objetivoGeneral: "",

        objetivosEspecificos: "",

        diagnostico: "",

        tratamientoPropuesto: "",

        tecnicas: [],

        sesionesPlanificadas: "",

        frecuenciaSemanal: "",

        observacionesIniciales: "",

        observacionesFinales: "",

    };

    const [formData, setFormData] = useState(formInicial);

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);


    const cargarCatalogos = async () => {

        try {

            const [
                pacientesRes,
                fisioterapeutasRes,
                evaluacionesRes,
            ] = await Promise.all([
                obtenerPacientesActivos(),
                obtenerFisioterapeutasActivos(),
                obtenerEvaluaciones(),
            ]);

            setPacientes(pacientesRes);

            setFisioterapeutas(fisioterapeutasRes);

            setEvaluaciones(evaluacionesRes);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        const cargar = async () => {

            await cargarCatalogos();

        };

        cargar();

    }, []);

     const tratamientosFiltrados = useMemo(() => {

        const texto = busqueda.toLowerCase();

        return tratamientos.filter((tratamiento) =>

            tratamiento.codigoTratamiento
                .toLowerCase()
                .includes(texto)

            ||

            tratamiento.nombrePaciente
                .toLowerCase()
                .includes(texto)

            ||

            tratamiento.nombreFisioterapeuta
                .toLowerCase()
                .includes(texto)

            ||

            tratamiento.estado
                .toLowerCase()
                .includes(texto)

        );

    }, [

        tratamientos,

        busqueda,

    ]);

    const handleChange = async (event) => {

        const { name, value } = event.target;

        // Todos los campos normales
        if (name !== "evaluacionId") {

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));

            return;
        }

        try {

            const evaluacion = await obtenerEvaluacion(value);

            setFormData((prev) => ({

                ...prev,

                evaluacionId: value,

                pacienteId:
                    evaluacion.pacienteId,

                fisioterapeutaId:
                    evaluacion.fisioterapeutaId,

                objetivoGeneral:
                    evaluacion.objetivosTratamiento,

                diagnostico:
                    evaluacion.diagnosticoFisioterapeutico,

                tratamientoPropuesto:
                    evaluacion.tratamientoSugerido,

                sesionesPlanificadas:
                    evaluacion.sesionesRecomendadas,

                frecuenciaSemanal:
                    evaluacion.frecuenciaSemanal,

            }));

        } catch (error) {

            console.error(error);

        }

    };

    const validarFormulario = () => {

        const nuevosErrores = {};

        if (!formData.pacienteId)

            nuevosErrores.pacienteId =
                "Seleccione un paciente.";

        if (!formData.fisioterapeutaId)

            nuevosErrores.fisioterapeutaId =
                "Seleccione un fisioterapeuta.";

        if (!formData.evaluacionId)

            nuevosErrores.evaluacionId =
                "Seleccione una evaluación.";

        if (!formData.fechaInicio)

            nuevosErrores.fechaInicio =
                "Seleccione la fecha de inicio.";

                if (formData.fechaInicio) {

                    const hoy = new Date();
                    hoy.setHours(0, 0, 0, 0);

                    const limite = new Date();
                    limite.setDate(limite.getDate() - 15);
                    limite.setHours(0, 0, 0, 0);

                    const fechaInicio = new Date(formData.fechaInicio);

                    if (fechaInicio < limite) {

                        nuevosErrores.fechaInicio =
                            "Solo se permiten tratamientos con una antigüedad máxima de 15 días.";

                    }

                    if (fechaInicio > hoy) {

                        nuevosErrores.fechaInicio =
                            "La fecha de inicio no puede ser posterior a la fecha actual.";

                    }

                }

        if (!formData.objetivoGeneral)

            nuevosErrores.objetivoGeneral =
                "Ingrese el objetivo general.";

        if (!formData.diagnostico)

            nuevosErrores.diagnostico =
                "Ingrese el diagnóstico.";

        if (!formData.tratamientoPropuesto)

            nuevosErrores.tratamientoPropuesto =
                "Ingrese el tratamiento propuesto.";

        if (

            !formData.tecnicas ||

            formData.tecnicas.length === 0

        )

            nuevosErrores.tecnicas =
                "Seleccione al menos una técnica.";

        if (!formData.sesionesPlanificadas)

            nuevosErrores.sesionesPlanificadas =
                "Ingrese las sesiones planificadas.";

        if (!formData.frecuenciaSemanal)

            nuevosErrores.frecuenciaSemanal =
                "Ingrese la frecuencia semanal.";

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;

    };

    const nuevoTratamiento = () => {

        setEditando(false);

        setEditarInformacion(false);

        setTratamientoSeleccionado(null);

        setErrores({});

        setFormData(formInicial);

        setOpenDialog(true);

    };

    const editarTratamiento = (id) => {

        const tratamiento = tratamientos.find(

            t => t.id === id

        );

        if (!tratamiento) return;

        setTratamientoSeleccionado(tratamiento);

        setEditando(true);

        setEditarInformacion(true);

        setErrores({});

        setFormData({

            pacienteId:
                tratamiento.pacienteId,

            fisioterapeutaId:
                tratamiento.fisioterapeutaId,

            evaluacionId:
                tratamiento.evaluacionId,

            fechaInicio:
                tratamiento.fechaInicio,

            fechaEstimadaAlta:
                tratamiento.fechaEstimadaAlta,

            objetivoGeneral:
                tratamiento.objetivoGeneral,

            objetivosEspecificos:
                tratamiento.objetivosEspecificos,

            diagnostico:
                tratamiento.diagnostico,

            tratamientoPropuesto:
                tratamiento.tratamientoPropuesto,

            tecnicas:
                tratamiento.tecnicas || [],

            sesionesPlanificadas:
                tratamiento.sesionesPlanificadas,

            frecuenciaSemanal:
                tratamiento.frecuenciaSemanal,

            observacionesIniciales:
                tratamiento.observacionesIniciales,

            observacionesFinales:
                tratamiento.observacionesFinales,

        });

        setOpenDialog(true);

    };

    const verTratamiento = (id) => {

        const tratamiento = tratamientos.find(

            t => t.id === id

        );

        if (!tratamiento) return;

        setTratamientoSeleccionado(tratamiento);

        setOpenDetails(true);

    };

    const guardar = async () => {

        if (guardando) return;

        if (!validarFormulario()) return;

        setGuardando(true);

        try {

            if (editando) {

                await actualizarTratamiento(

                    tratamientoSeleccionado.id,

                    formData

                );

                setSnackbar({

                    open: true,

                    severity: "success",

                    message:
                        "Tratamiento actualizado correctamente.",

                });

            } else {

                await guardarTratamiento(formData);

                setSnackbar({

                    open: true,

                    severity: "success",

                    message:
                        "Tratamiento registrado correctamente.",

                });

            }

            setOpenDialog(false);

            setErrores({});

            setFormData(formInicial);

        } catch (error) {

            console.error(error);

            const response = error.response?.data;

            let mensaje = response?.message || "Ocurrió un error.";

            if (response?.data) {

                mensaje = Object.values(response.data).join("\n");

            }

            setSnackbar({

                open: true,

                severity: "error",

                message: mensaje,

            });

        }finally {

            setGuardando(false);

    }

    };

    const suspender = (tratamiento) => {

        setTratamientoSeleccionado(tratamiento);

        setAccionPendiente("suspender");

        setOpenConfirm(true);

    };

    const reanudar = (tratamiento) => {

        setTratamientoSeleccionado(tratamiento);

        setAccionPendiente("reanudar");

        setOpenConfirm(true);

    };

    const finalizar = (tratamiento) => {

        setTratamientoSeleccionado(tratamiento);

        setAccionPendiente("finalizar");

        setOpenConfirm(true);

    };

    const cancelar = (tratamiento) => {

        setTratamientoSeleccionado(tratamiento);

        setAccionPendiente("cancelar");

        setOpenConfirm(true);

    };

    const confirmarAccion = async () => {

        try {

            switch (accionPendiente) {

                case "suspender":

                    await suspenderTratamiento(

                        tratamientoSeleccionado.id

                    );

                    break;

                case "reanudar":

                    await reanudarTratamiento(

                        tratamientoSeleccionado.id

                    );

                    break;

                case "finalizar":

                    await finalizarTratamiento(

                        tratamientoSeleccionado.id

                    );

                    break;

                case "cancelar":

                    await cancelarTratamiento(

                        tratamientoSeleccionado.id

                    );

                    break;

                default:

                    break;

            }

            setSnackbar({

                open: true,

                severity: "success",

                message:
                    "Operación realizada correctamente.",

            });

            setOpenDetails(false);

        } catch (error) {

            console.error(error);

            setSnackbar({

                open: true,

                severity: "error",

                message:

                    error.response?.data?.message ||

                    "No fue posible completar la operación.",

            });

        }

        setOpenConfirm(false);

        setAccionPendiente("");

    };


            return (

        
                <>
                    <PageTitle
                        title="Tratamientos"
                        subtitle="Gestión de tratamientos"
                    />

                    <SearchToolbar
                        placeholder="Buscar tratamiento..."
                        busqueda={busqueda}
                        onBuscar={setBusqueda}
                        buttonText="Nuevo Tratamiento"
                        onNuevo={nuevoTratamiento}
                    />
                <TratamientoTable

                    tratamientos={tratamientosFiltrados}

                    loading={loading}

                    page={page}

                    rowsPerPage={rowsPerPage}

                    onPageChange={setPage}

                    onRowsPerPageChange={setRowsPerPage}

                    onVer={verTratamiento}

                    onEditar={editarTratamiento}

                    onSuspender={suspender}

                    onReanudar={reanudar}

                    onFinalizar={finalizar}

                    onCancelar={cancelar}

                />

          

            <TratamientoDialog

                open={openDialog}

                onClose={() => setOpenDialog(false)}

                onGuardar={guardar}

                guardando={guardando}

                formData={formData}

                onChange={handleChange}

                errores={errores}

                pacientes={pacientes}

                fisioterapeutas={fisioterapeutas}

                evaluaciones={evaluaciones}

                editando={editando}

                editarInformacion={editarInformacion}

                setEditarInformacion={setEditarInformacion}
                
            />

            <TratamientoDetailsDialog

                open={openDetails}

                onClose={() => setOpenDetails(false)}

                tratamiento={tratamientoSeleccionado}

                onSuspender={() => {

                    setOpenDetails(false);

                    suspender(tratamientoSeleccionado);

                }}

                onReanudar={() => {

                    setOpenDetails(false);

                    reanudar(tratamientoSeleccionado);

                }}

                onFinalizar={() => {

                    setOpenDetails(false);

                    finalizar(tratamientoSeleccionado);

                }}

                onCancelar={() => {

                    setOpenDetails(false);

                    cancelar(tratamientoSeleccionado);

                }}

            />

            <ConfirmDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={confirmarAccion}
                title="Confirmar acción"
                message={`¿Está seguro de ${accionPendiente} este tratamiento?`}
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

export default Tratamientos;