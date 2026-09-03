import { useMemo, useState } from "react";

import PageTitle from "../../components/common/PageTitle";
import SearchToolbar from "../../components/common/SearchToolbar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CustomSnackbar from "../../components/common/CustomSnackbar";

import CitaTable from "./components/CitaTable";
import CitaDialog from "./components/CitaDialog";
import CitaDetailsDialog from "./components/CitaDetailsDialog";

import { useCitas } from "../../hooks/useCitas";
import { usePacientesActivos } from "../../hooks/usePacientesActivos";
import { useFisioterapeutasActivos } from "../../hooks/useFisioterapeutasActivos";

import {
    crearCita,
    actualizarCita,
    cancelarCita,
} from "../../services/citaService";

function Citas() {

    const {

        citas,

        loading,

        cargarCitas,

    } = useCitas();

    const {

        pacientes,

    } = usePacientesActivos();

    const {

        fisioterapeutas,

    } = useFisioterapeutasActivos();

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [search, setSearch] =
        useState("");

    const [openDialog, setOpenDialog] =
        useState(false);

    const [openDetail, setOpenDetail] =
        useState(false);

    const [openConfirm, setOpenConfirm] =
        useState(false);

    const [modoEdicion,
        setModoEdicion] =
        useState(false);

    const [citaSeleccionada,
        setCitaSeleccionada] =
        useState(null);

    const [snackbar,
        setSnackbar] =
        useState({

            open: false,

            message: "",

            severity: "success",

        });

    const [errores,
        setErrores] =
        useState({});

    const [guardando, setGuardando] = useState(false);

        const [formData,
        setFormData] =
        useState({

            pacienteId: "",

            fisioterapeutaId: "",

            fecha: "",

            horaInicio: "",

            horaFin: "",

            tipoTerapia: "",

            motivoConsulta: "",

            observaciones: "",

        });

            const citasFiltradas =
        useMemo(() => {

            return citas.filter(

                (cita) =>

                    cita.pacienteNombre
                        .toLowerCase()
                        .includes(search.toLowerCase())

                    ||

                    cita.fisioterapeutaNombre
                        .toLowerCase()
                        .includes(search.toLowerCase())

                    ||

                    cita.tipoTerapia
                        .toLowerCase()
                        .includes(search.toLowerCase())

            );

        }, [citas, search]);

            const mostrarSnackbar = (

        message,

        severity = "success"

    ) => {

        setSnackbar({

            open: true,

            message,

            severity,

        });

    };

        const handleChange = ({ target }) => {

        const {

            name,

            value,

        } = target;

        setFormData(prev => ({

            ...prev,

            [name]: value,

        }));

    };

    const validarFormulario = () => {

    const nuevosErrores = {};

    if (!formData.pacienteId) {

        nuevosErrores.pacienteId =
            "Seleccione un paciente.";

    }

    if (!formData.fisioterapeutaId) {

        nuevosErrores.fisioterapeutaId =
            "Seleccione un fisioterapeuta.";

    }

    if (!formData.fecha) {

        nuevosErrores.fecha =
            "Seleccione una fecha.";

    }

    if (!formData.horaInicio) {

        nuevosErrores.horaInicio =
            "Ingrese la hora de inicio.";

    }

    if (!formData.horaFin) {

        nuevosErrores.horaFin =
            "Ingrese la hora de fin.";

    }

    if (!formData.tipoTerapia) {

        nuevosErrores.tipoTerapia =
            "Ingrese el tipo de terapia.";

    }

    if (!formData.motivoConsulta) {

        nuevosErrores.motivoConsulta =
            "Ingrese el motivo de consulta.";

    }

    setErrores(nuevosErrores);

    return Object.keys(
        nuevosErrores
    ).length === 0;

    };

    const nuevaCita = () => {

        setModoEdicion(false);

        setCitaSeleccionada(null);

        setErrores({});

        setFormData({

            pacienteId: "",

            fisioterapeutaId: "",

            fecha: "",

            horaInicio: "",

            horaFin: "",

            tipoTerapia: "",

            motivoConsulta: "",

            observaciones: "",

        });

        setOpenDialog(true);

        };

        const editarCita = (id) => {

            const cita =
                citas.find(c => c.id === id);

            if (!cita) return;

            setModoEdicion(true);

            setCitaSeleccionada(cita);

            setFormData({

                pacienteId:
                    cita.pacienteId,

                fisioterapeutaId:
                    cita.fisioterapeutaId,

                fecha:
                    cita.fecha,

                horaInicio:
                    cita.horaInicio,

                horaFin:
                    cita.horaFin,

                tipoTerapia:
                    cita.tipoTerapia,

                motivoConsulta:
                    cita.motivoConsulta,

                observaciones:
                    cita.observaciones || "",

            });

            setOpenDialog(true);

        };

        const verCita = (id) => {

            const cita =
                citas.find(c => c.id === id);

            setCitaSeleccionada(cita);

            setOpenDetail(true);

        };

        const guardarCita = async () => {


            if (guardando) return;

            if (!validarFormulario()) {

                return;

            }

            setGuardando(true);

            try {

                if (modoEdicion) {

                    await actualizarCita(

                        citaSeleccionada.id,

                        formData

                    );

                    mostrarSnackbar(

                        "Cita actualizada correctamente."

                    );

                } else {

                    await crearCita(formData);

                    mostrarSnackbar(

                        "Cita registrada correctamente."

                    );

                }

                cerrarDialog();

                await cargarCitas();

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

        const confirmarCancelar = async () => {

            try {

                await cancelarCita(

                    citaSeleccionada.id

                );

                mostrarSnackbar(

                    "Cita cancelada correctamente."

                );

                setOpenConfirm(false);

                await cargarCitas();

            } catch (error) {

                console.error(error);

                mostrarSnackbar(

                    error.response?.data?.message ||

                    "No se pudo cancelar la cita.",

                    "error"

                );

            }

        };

        const cancelar = (cita) => {

            setCitaSeleccionada(cita);

            setOpenConfirm(true);

        };

        const cerrarDialog = () => {

            setOpenDialog(false);

            setModoEdicion(false);

            setErrores({});

            setCitaSeleccionada(null);

            setFormData({

                pacienteId: "",

                fisioterapeutaId: "",

                fecha: "",

                horaInicio: "",

                horaFin: "",

                tipoTerapia: "",

                motivoConsulta: "",

                observaciones: "",

            });

        };

        return (

            <>

                <PageTitle

                    title="Citas"

                    subtitle="Gestión de citas"

                />

                <SearchToolbar

                    placeholder="Buscar cita..."

                    busqueda={search}

                    onBuscar={setSearch}

                    buttonText="Nueva Cita"

                    onNuevo={nuevaCita}

                />

                <CitaTable

                    citas={citasFiltradas}

                    loading={loading}

                    page={page}

                    rowsPerPage={rowsPerPage}

                    onPageChange={setPage}

                    onRowsPerPageChange={
                        setRowsPerPage
                    }

                    onVer={verCita}

                    onEditar={editarCita}

                    onCancelar={cancelar}

                />

                <CitaDialog

                    open={openDialog}

                    onClose={cerrarDialog}

                    onGuardar={guardarCita}

                    editando={modoEdicion}

                    guardando={guardando}

                    formData={formData}

                    onChange={handleChange}

                    errores={errores}

                    pacientes={pacientes}

                    fisioterapeutas={
                        fisioterapeutas
                    }

                />

                <CitaDetailsDialog

                    open={openDetail}

                    onClose={() =>
                        setOpenDetail(false)
                    }

                    cita={citaSeleccionada}

                />

                <ConfirmDialog

                    open={openConfirm}

                    title="Cancelar cita"

                    message={`¿Desea cancelar la cita de ${citaSeleccionada?.pacienteNombre}?`}

                    onClose={() =>
                        setOpenConfirm(false)
                    }

                    onConfirm={confirmarCancelar}

                />

                <CustomSnackbar

                    open={snackbar.open}

                    message={snackbar.message}

                    severity={snackbar.severity}

                    onClose={() =>

                        setSnackbar(prev => ({

                            ...prev,

                            open: false,

                        }))

                    }

                />

            </>

        );

        }

        export default Citas;