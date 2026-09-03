import { useEffect, useMemo, useState } from "react";

import {
    Alert,
    Snackbar,
} from "@mui/material";
import PageTitle from "../../components/common/PageTitle";
import SearchToolbar from "../../components/common/SearchToolbar";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import EvaluacionTable from "./components/EvaluacionTable";
import EvaluacionDialog from "./components/EvaluacionDialog";
import EvaluacionDetailsDialog from "./components/EvaluacionDetailsDialog";

import useEvaluaciones from "../../hooks/useEvaluaciones";

import { obtenerPacientesActivos } from "../../services/pacienteService";
import { obtenerFisioterapeutasActivos } from "../../services/fisioterapeutaService";

function Evaluaciones() {

    const {

        evaluaciones,

        loading,

        guardarEvaluacion,

        actualizarEvaluacion,

        inactivarEvaluacion,

    } = useEvaluaciones();

    const [pacientes, setPacientes] = useState([]);

    const [fisioterapeutas, setFisioterapeutas] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [openDetails, setOpenDetails] = useState(false);

    const [openConfirm, setOpenConfirm] = useState(false);

    const [editando, setEditando] = useState(false);

    const [evaluacionSeleccionada, setEvaluacionSeleccionada] = useState(null);

    const [busqueda, setBusqueda] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: "",

    });

     const formInicial = {

        pacienteId: "",

        fisioterapeutaId: "",

        fechaEvaluacion: "",

        motivoConsulta: "",

        antecedentes: "",

        escalaDolorEva: "",

        diagnosticoFisioterapeutico: "",

        objetivosTratamiento: "",

        inspeccion: "",

        palpacion: "",

        rangoMovimiento: "",

        fuerzaMuscular: "",

        pruebasFuncionales: "",

        sesionesRecomendadas: "",

        frecuenciaSemanal: "",

        tratamientoSugerido: "",

        observaciones: "",

    };

    const [formData, setFormData] = useState(formInicial);

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);

    const cargarCatalogos = async () => {

        try {

            const [

                pacientesRes,

                fisioterapeutasRes,

            ] = await Promise.all([

                obtenerPacientesActivos(),
                obtenerFisioterapeutasActivos(),

            ]);

            setPacientes(pacientesRes);

            setFisioterapeutas(fisioterapeutasRes);

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

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    const validarFormulario = () => {

        const nuevosErrores = {};

        if (!formData.pacienteId)

            nuevosErrores.pacienteId =
                "Seleccione un paciente.";

        if (!formData.fisioterapeutaId)

            nuevosErrores.fisioterapeutaId =
                "Seleccione un fisioterapeuta.";

        if (!formData.diagnosticoFisioterapeutico)

            nuevosErrores.diagnosticoFisioterapeutico =
                "Ingrese el diagnóstico fisioterapéutico.";

        if (!formData.objetivosTratamiento)

            nuevosErrores.objetivosTratamiento =
                "Ingrese los objetivos del tratamiento.";

        if (!formData.tratamientoSugerido)

            nuevosErrores.tratamientoSugerido =
                "Ingrese el tratamiento sugerido.";

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;

    };

     const nuevaEvaluacion = () => {

        setEditando(false);

        setEvaluacionSeleccionada(null);

        setErrores({});

        setFormData(formInicial);

        setOpenDialog(true);

    };

     const verEvaluacion = (id) => {

        const evaluacion = evaluaciones.find(

            e => e.id === id

        );

        if (!evaluacion) return;

        setEvaluacionSeleccionada(evaluacion);

        setOpenDetails(true);

    };

     const editarEvaluacion = (id) => {

        const evaluacion = evaluaciones.find(

            e => e.id === id

        );

        if (!evaluacion) return;

        setEvaluacionSeleccionada(evaluacion);

        setEditando(true);

        setErrores({});

        setFormData({

            pacienteId:
                evaluacion.pacienteId,

            fisioterapeutaId:
                evaluacion.fisioterapeutaId,

            fechaEvaluacion:
                evaluacion.fechaEvaluacion,

            motivoConsulta:
                evaluacion.motivoConsulta,

            antecedentes:
                evaluacion.antecedentes,

            escalaDolorEva:
                evaluacion.escalaDolorEva,

            diagnosticoFisioterapeutico:
                evaluacion.diagnosticoFisioterapeutico,

            objetivosTratamiento:
                evaluacion.objetivosTratamiento,

            inspeccion:
                evaluacion.inspeccion,

            palpacion:
                evaluacion.palpacion,

            rangoMovimiento:
                evaluacion.rangoMovimiento,

            fuerzaMuscular:
                evaluacion.fuerzaMuscular,

            pruebasFuncionales:
                evaluacion.pruebasFuncionales,

            sesionesRecomendadas:
                evaluacion.sesionesRecomendadas,

            frecuenciaSemanal:
                evaluacion.frecuenciaSemanal,

            tratamientoSugerido:
                evaluacion.tratamientoSugerido,

            observaciones:
                evaluacion.observaciones,

        });

        setOpenDialog(true);

    };

     const guardar = async () => {

        if (guardando) return;

        if (!validarFormulario()) return;

        setGuardando(true);

        try {

            if (editando) {

                await actualizarEvaluacion(

                    evaluacionSeleccionada.id,

                    formData

                );

                setSnackbar({

                    open: true,

                    severity: "success",

                    message:
                        "Evaluación actualizada correctamente.",

                });

            } else {

                await guardarEvaluacion(formData);

                setSnackbar({

                    open: true,

                    severity: "success",

                    message:
                        "Evaluación registrada correctamente.",

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

                    "Ocurrió un error al guardar la evaluación.",

            });

        }finally {

            setGuardando(false);

        }

    };

        const inactivar = (evaluacion) => {

            setEvaluacionSeleccionada(evaluacion);

            setOpenConfirm(true);

        };
        
         const confirmarAccion = async () => {

            try {

                await inactivarEvaluacion(

                    evaluacionSeleccionada.id

                );

                setSnackbar({

                    open: true,

                    severity: "success",

                    message:
                        "Evaluación inactivada correctamente.",

                });

                setOpenDetails(false);

            } catch (error) {

                console.error(error);

                setSnackbar({

                    open: true,

                    severity: "error",

                    message:

                        error.response?.data?.message ||

                        "No fue posible inactivar la evaluación.",

                });

            }

            setOpenConfirm(false);

        };

            const evaluacionesFiltradas = useMemo(() => {

                const texto = busqueda.toLowerCase();

                return evaluaciones.filter((evaluacion) =>

                    evaluacion.codigoEvaluacion
                        .toLowerCase()
                        .includes(texto)

                    ||

                    evaluacion.pacienteNombre
                        .toLowerCase()
                        .includes(texto)

                    ||

                    evaluacion.fisioterapeutaNombre
                        .toLowerCase()
                        .includes(texto)

                    ||

                    evaluacion.estado
                        .toLowerCase()
                        .includes(texto)

                );

            }, [

                evaluaciones,

                busqueda,

            ]);

           return (

             <>

                    <PageTitle
                        title="Evaluaciones"
                        subtitle="Gestión de evaluaciones"
                    />

                    <SearchToolbar
                        placeholder="Buscar evaluación..."
                        busqueda={busqueda}
                        onBuscar={setBusqueda}
                        buttonText="Nueva Evaluación"
                        onNuevo={nuevaEvaluacion}
                    />

                    <EvaluacionTable

                        evaluaciones={evaluacionesFiltradas}

                        loading={loading}

                        page={page}

                        rowsPerPage={rowsPerPage}

                        onPageChange={setPage}

                        onRowsPerPageChange={setRowsPerPage}

                        onVer={verEvaluacion}

                        onEditar={editarEvaluacion}

                        onInactivar={inactivar}

                    />


                <EvaluacionDialog

                    open={openDialog}

                    onClose={() => setOpenDialog(false)}

                    onGuardar={guardar}

                    guardando={guardando}

                    formData={formData}

                    onChange={handleChange}

                    errores={errores}

                    pacientes={pacientes}

                    fisioterapeutas={fisioterapeutas}

                    editando={editando}

                />

                <EvaluacionDetailsDialog

                    open={openDetails}

                    onClose={() => setOpenDetails(false)}

                    evaluacion={evaluacionSeleccionada}

                    onInactivar={() => {

                        setOpenDetails(false);

                        inactivar(evaluacionSeleccionada);

                    }}

                />

                <ConfirmDialog

                    open={openConfirm}

                    onClose={() => setOpenConfirm(false)}

                    onConfirm={confirmarAccion}

                    title="Confirmar acción"

                    message="¿Está seguro de inactivar esta evaluación?"

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

export default Evaluaciones;
