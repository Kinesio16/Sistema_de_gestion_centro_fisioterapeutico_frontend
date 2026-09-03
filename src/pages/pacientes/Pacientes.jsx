import { Box} from "@mui/material";

import PacienteTable from "./components/PacienteTable";

import { usePacientes } from "../../hooks/usePacientes";
import { useState } from "react";
import PacienteDialog from "./components/PacienteDialog";
import PacienteForm from "./components/PacienteForm";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PageTitle from "../../components/common/PageTitle";
import {
    crearPaciente,
    actualizarPaciente,
    inactivarPaciente,
    reactivarPaciente,
    obtenerPaciente,
} from "../../services/pacienteService";

import PacienteDetailsDialog from "./components/PacienteDetailsDialog";
import SearchToolbar from "../../components/common/SearchToolbar";

function Pacientes() {

    const [detalleOpen, setDetalleOpen] = useState(false);

    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);

    const abrirNuevoPaciente = () => {

    setOpenDialog(true);

    };

    const [modoReactivar, setModoReactivar] = useState(false);

    const [pacienteEstado, setPacienteEstado] = useState(null);

    const [busqueda, setBusqueda] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [confirmOpen, setConfirmOpen] = useState(false);


    const [modoEdicion, setModoEdicion] = useState(false);

    const [pacienteEditando, setPacienteEditando] = useState(null);

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);

    const cerrarDialog = () => {

        setOpenDialog(false);

        setModoEdicion(false);

        setPacienteEditando(null);

        setErrores({});

        setFormData(initialFormData);

    };
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrores((prev) => ({
            ...prev,
            [name]: undefined,
        }));

    };

    const initialFormData = {
    nombres: "",
    apellidos: "",
    cedula: "",
    fechaNacimiento: "",
    sexo: "",
    celular: "",
    correo: "",
   };

    const [formData, setFormData] = useState(initialFormData);

    const guardarPaciente = async () => {


        if (guardando) return;

        if (
            !formData.nombres ||
            !formData.apellidos ||
            !formData.cedula ||
            !formData.fechaNacimiento ||
            !formData.sexo ||
            !formData.celular
        ) {

            mostrarSnackbar(
                "Complete todos los campos obligatorios.",
                "warning"
            );

            return;
        }

        setGuardando(true);

        try {

            if (modoEdicion) {

                await actualizarPaciente(
                    pacienteEditando.id,
                    formData
                );

                mostrarSnackbar(
                    "Paciente actualizado correctamente.",
                    "success"
                );

            } else {

                await crearPaciente(formData);

                mostrarSnackbar(
                    "Paciente registrado correctamente.",
                    "success"
                );

            }

            setErrores({});

            cerrarDialog();
            

            await cargarPacientes();

        } catch (error) {

                        const response = error.response?.data;

                    if (response?.data) {

                        setErrores(response.data);

                        const primerError = Object.values(response.data)[0];

                        mostrarSnackbar(primerError, "error");

                        return;

                    }

                    setErrores({});

                    mostrarSnackbar(
                        response?.message ||
                        "No se pudo registrar el paciente.",
                        "error"
                    );

                }finally {

                    setGuardando(false);

                }

    };

    const verPaciente = async (id) => {

    try {

        const paciente =
            await obtenerPaciente(id);

        setPacienteSeleccionado(paciente);

        setDetalleOpen(true);

    } catch (error) {

        console.error(error);

    }

    };

    const editarPaciente = async (id) => {

    try {

        const paciente = await obtenerPaciente(id);

        setPacienteEditando(paciente);

        setFormData({
            nombres: paciente.nombres,
            apellidos: paciente.apellidos,
            cedula: paciente.cedula,
            fechaNacimiento: paciente.fechaNacimiento,
            sexo: paciente.sexo,
            celular: paciente.celular,
            correo: paciente.correo || "",
        });

        setModoEdicion(true);

        setOpenDialog(true);

    } catch (error) {

        console.error(error);

        mostrarSnackbar(
            "No se pudo obtener el paciente.",
            "error"
        );

    }

    };
    const [snackbar, setSnackbar] = useState({
            open: false,
            message: "",
            severity: "success",
    });

    const mostrarSnackbar = (message, severity = "success") => {

    setSnackbar({
        open: true,
        message,
        severity,
    });
    };

    const abrirConfirmacion = (paciente) => {

        setPacienteEstado(paciente);

        setModoReactivar(false);

        setConfirmOpen(true);

    };

    const cerrarConfirmacion = () => {

        setConfirmOpen(false);

        setPacienteEstado(null);

        setModoReactivar(false);

    };

    const eliminarPaciente = async () => {

        try {

            await inactivarPaciente(
                pacienteEstado.id
            );

            mostrarSnackbar(
                "Paciente inactivado correctamente.",
                "success"
            );

            cerrarConfirmacion();

            await cargarPacientes();

        } catch (error) {

            const mensaje =
                error.response?.data?.message ||
                "No se pudo inactivar el paciente.";

            mostrarSnackbar(
                mensaje,
                "error"
            );

        }

    };

    const abrirReactivacion = (paciente) => {

        setPacienteEstado(paciente);

        setModoReactivar(true);

        setConfirmOpen(true);

        };

    const reactivarPacienteSeleccionado = async () => {

        try {

            await reactivarPaciente(
                pacienteEstado.id
            );

            mostrarSnackbar(
                "Paciente reactivado correctamente.",
                "success"
            );

            cerrarConfirmacion();

            await cargarPacientes();

        } catch (error) {

            mostrarSnackbar(
                error.response?.data?.message ||
                "No se pudo reactivar el paciente.",
                "error"
            );

        }

    };

    
    const {

        pacientes,

        loading,

        cargarPacientes,

    } = usePacientes();

    const pacientesFiltrados = pacientes.filter((paciente) => {

        const texto = busqueda.toLowerCase().trim().replace(/\s+/g, " ");
        const nombreCompleto =
        `${paciente.nombres} ${paciente.apellidos}`
        .toLowerCase()
        .replace(/\s+/g, " ");

    return (

        nombreCompleto.includes(texto) ||
        paciente.nombres.toLowerCase().includes(texto) ||
        paciente.apellidos.toLowerCase().includes(texto) ||
        paciente.cedula.includes(texto) ||
        paciente.celular.includes(texto)

    );

});

    return (

        <Box>

            <PageTitle title="Pacientes" />

            <SearchToolbar

                placeholder="Buscar paciente..."

                buttonText="Nuevo Paciente"

                busqueda={busqueda}

                onBuscar={(texto)=>{

                    setBusqueda(texto);

                    setPage(0);

                }}

                onNuevo={abrirNuevoPaciente}

            />

            <PacienteTable
                pacientes={pacientesFiltrados}
                loading={loading}

                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}

                onVer={verPaciente}
                onEditar={editarPaciente}
                onEliminar={abrirConfirmacion}
                onReactivar={abrirReactivacion}
            />

            <PacienteDetailsDialog
                open={detalleOpen}
                onClose={() => setDetalleOpen(false)}
                paciente={pacienteSeleccionado}
            />
            <PacienteDialog
                open={openDialog}
                onClose={cerrarDialog}
                title={
                    modoEdicion
                        ? "Editar Paciente"
                        : "Nuevo Paciente"
                }
                modoEdicion={modoEdicion}
                onSave={guardarPaciente}
                guardando={guardando}
            >

                <PacienteForm
                    formData={formData}
                    onChange={handleChange}
                    errores={errores}
                />

            </PacienteDialog>

            <CustomSnackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={() =>
                        setSnackbar({
                            ...snackbar,
                            open: false,
                        })
                    }
            />

            <ConfirmDialog
                open={confirmOpen}
                onClose={cerrarConfirmacion}
                onConfirm={
                    modoReactivar
                        ? reactivarPacienteSeleccionado
                        : eliminarPaciente
                }
                title={
                    modoReactivar
                        ? "Reactivar paciente"
                        : "Inactivar paciente"
                }
                message={
                    pacienteEstado
                        ? modoReactivar
                            ? `¿Está seguro de reactivar a ${pacienteEstado.nombres} ${pacienteEstado.apellidos}?

            El paciente volverá a aparecer como ACTIVO en el sistema.`
                            : `¿Está seguro de inactivar a ${pacienteEstado.nombres} ${pacienteEstado.apellidos}?

            El paciente conservará todo su historial clínico, pero dejará de aparecer como activo.`
                        : ""
                }
                confirmText={
                    modoReactivar
                        ? "Reactivar"
                        : "Inactivar"
                }
            />

        </Box>

    );

}

export default Pacientes;