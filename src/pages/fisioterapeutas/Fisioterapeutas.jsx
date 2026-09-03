import { Box} from "@mui/material";
import { useState } from "react";

import { useFisioterapeutas } from "../../hooks/useFisioterapeutas";

import FisioterapeutaTable from "./components/FisioterapeutaTable";
import FisioterapeutaDialog from "./components/FisioterapeutaDialog";
import FisioterapeutaForm from "./components/FisioterapeutaForm";
import FisioterapeutaDetailsDialog from "./components/FisioterapeutaDetailsDialog";
import PageTitle from "../../components/common/PageTitle";

import CustomSnackbar from "../../components/common/CustomSnackbar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import SearchToolbar from "../../components/common/SearchToolbar";

import {
    crearFisioterapeuta,
    actualizarFisioterapeuta,
    obtenerFisioterapeuta,
    inactivarFisioterapeuta,
    reactivarFisioterapeuta,
} from "../../services/fisioterapeutaService";

function Fisioterapeutas() {

    const {

        fisioterapeutas,

        loading,

        cargarFisioterapeutas,

    } = useFisioterapeutas();

    /*==============================
            Estados
    ==============================*/

    const [detalleOpen, setDetalleOpen] = useState(false);

    const [fisioterapeutaSeleccionado, setFisioterapeutaSeleccionado] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);

    const [modoEdicion, setModoEdicion] = useState(false);

    const [modoReactivar, setModoReactivar] = useState(false);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [fisioterapeutaEstado, setFisioterapeutaEstado] = useState(null);

    const [fisioterapeutaEditando, setFisioterapeutaEditando] = useState(null);

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);

    const [busqueda, setBusqueda] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    /*==============================
            Formulario
    ==============================*/

    const initialFormData = {

        nombres: "",

        apellidos: "",

        cedula: "",

        celular: "",

        correo: "",

        especialidad: "",

        numeroLicencia: "",

    };

    const [formData, setFormData] = useState(initialFormData);

    /*==============================
            Snackbar
    ==============================*/

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

    /*==============================
        Dialog Nuevo
    ==============================*/

    const abrirNuevoFisioterapeuta = () => {

        setModoEdicion(false);

        setErrores({});

        setFormData(initialFormData);

        setOpenDialog(true);

    };

    const cerrarDialog = () => {

        setOpenDialog(false);

        setModoEdicion(false);

        setErrores({});

        setFisioterapeutaEditando(null);

        setFormData(initialFormData);

    };

    /*==============================
        Cambios Formulario
    ==============================*/

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
        /*==============================
            Guardar
    ==============================*/

    const guardarFisioterapeuta = async () => {


        if (guardando) return;

        if (
            !formData.nombres ||
            !formData.apellidos ||
            !formData.cedula ||
            !formData.celular ||
            !formData.correo ||
            !formData.especialidad ||
            !formData.numeroLicencia
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

                await actualizarFisioterapeuta(
                    fisioterapeutaEditando.id,
                    formData
                );

                mostrarSnackbar(
                    "Fisioterapeuta actualizado correctamente.",
                    "success"
                );

            } else {

                await crearFisioterapeuta(formData);

                mostrarSnackbar(
                    "Fisioterapeuta registrado correctamente.",
                    "success"
                );

            }

            setErrores({});

            cerrarDialog();

            await cargarFisioterapeutas();

        } catch (error) {

            const response = error.response?.data;

            if (response?.data) {

                setErrores(response.data);

                const primerError =
                    Object.values(response.data)[0];

                mostrarSnackbar(primerError, "error");

                return;

            }

            setErrores({});

            mostrarSnackbar(

                response?.message ||

                "No se pudo registrar el fisioterapeuta.",

                "error"

            );

        }finally {

            setGuardando(false);

        }

    };

    /*==============================
            Ver
    ==============================*/

    const verFisioterapeuta = async (id) => {

        try {

            const fisioterapeuta =
                await obtenerFisioterapeuta(id);

            setFisioterapeutaSeleccionado(
                fisioterapeuta
            );

            setDetalleOpen(true);

        } catch (error) {

            console.error(error);

            mostrarSnackbar(

                "No se pudo obtener el fisioterapeuta.",

                "error"

            );

        }

    };

    /*==============================
            Editar
    ==============================*/

    const editarFisioterapeuta = async (id) => {

        try {

            const fisioterapeuta =
                await obtenerFisioterapeuta(id);

            setFisioterapeutaEditando(
                fisioterapeuta
            );

            setFormData({

                nombres: fisioterapeuta.nombres,

                apellidos: fisioterapeuta.apellidos,

                cedula: fisioterapeuta.cedula,

                celular: fisioterapeuta.celular,

                correo:
                    fisioterapeuta.correo || "",

                especialidad:
                    fisioterapeuta.especialidad || "",

                numeroLicencia:
                    fisioterapeuta.numeroLicencia || "",

            });

            setModoEdicion(true);

            setOpenDialog(true);

        } catch (error) {

            console.error(error);

            mostrarSnackbar(

                "No se pudo obtener el fisioterapeuta.",

                "error"

            );

        }

    };

    /*==============================
        Inactivar
    ==============================*/

    const abrirConfirmacion = (fisioterapeuta) => {

        setFisioterapeutaEstado(
            fisioterapeuta
        );

        setModoReactivar(false);

        setConfirmOpen(true);

    };

    const cerrarConfirmacion = () => {

        setConfirmOpen(false);

        setModoReactivar(false);

        setFisioterapeutaEstado(null);

    };

    const eliminarFisioterapeuta = async () => {

        try {

            await inactivarFisioterapeuta(

                fisioterapeutaEstado.id

            );

            mostrarSnackbar(

                "Fisioterapeuta inactivado correctamente.",

                "success"

            );

            cerrarConfirmacion();

            await cargarFisioterapeutas();

        } catch (error) {

            mostrarSnackbar(

                error.response?.data?.message ||

                "No se pudo inactivar el fisioterapeuta.",

                "error"

            );

        }

    };

    /*==============================
        Reactivar
    ==============================*/

    const abrirReactivacion = (
        fisioterapeuta
    ) => {

        setFisioterapeutaEstado(
            fisioterapeuta
        );

        setModoReactivar(true);

        setConfirmOpen(true);

    };

    const reactivarFisioterapeutaSeleccionado =
        async () => {

            try {

                await reactivarFisioterapeuta(

                    fisioterapeutaEstado.id

                );

                mostrarSnackbar(

                    "Fisioterapeuta reactivado correctamente.",

                    "success"

                );

                cerrarConfirmacion();

                await cargarFisioterapeutas();

            } catch (error) {

                mostrarSnackbar(

                    error.response?.data?.message ||

                    "No se pudo reactivar el fisioterapeuta.",

                    "error"

                );

            }

        };

    /*==============================
            Buscador
    ==============================*/

    const fisioterapeutasFiltrados =
        fisioterapeutas.filter((fisio) => {

            const texto = busqueda

                .toLowerCase()

                .trim()

                .replace(/\s+/g, " ");

            const nombreCompleto =

                `${fisio.nombres} ${fisio.apellidos}`

                    .toLowerCase()

                    .replace(/\s+/g, " ");

            return (

                nombreCompleto.includes(texto) ||

                fisio.nombres
                    .toLowerCase()
                    .includes(texto) ||

                fisio.apellidos
                    .toLowerCase()
                    .includes(texto) ||

                fisio.cedula.includes(texto) ||

                fisio.celular.includes(texto) ||

                (fisio.especialidad || "")
                    .toLowerCase()
                    .includes(texto) ||

                (fisio.numeroLicencia || "")
                    .toLowerCase()
                    .includes(texto)

            );

        });
            return (

        <Box>

            <PageTitle title="Fisioterapeutas" />

            <SearchToolbar

                placeholder="Buscar fisioterapeuta..."

                buttonText="Nuevo Fisioterapeuta"

                busqueda={busqueda}

                onBuscar={(texto)=>{

                    setBusqueda(texto);

                    setPage(0);

                }}

                onNuevo={abrirNuevoFisioterapeuta}

            />

            <FisioterapeutaTable
                fisioterapeutas={fisioterapeutasFiltrados}
                loading={loading}

                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}

                onVer={verFisioterapeuta}
                onEditar={editarFisioterapeuta}
                onEliminar={abrirConfirmacion}
                onReactivar={abrirReactivacion}
            />

            <FisioterapeutaDetailsDialog
                open={detalleOpen}
                onClose={() => setDetalleOpen(false)}
                fisioterapeuta={fisioterapeutaSeleccionado}
            />

            <FisioterapeutaDialog
                open={openDialog}
                onClose={cerrarDialog}
                title={
                    modoEdicion
                        ? "Editar Fisioterapeuta"
                        : "Nuevo Fisioterapeuta"
                }
                modoEdicion={modoEdicion}
                onSave={guardarFisioterapeuta}
                guardando={guardando}
            >

                <FisioterapeutaForm
                    formData={formData}
                    onChange={handleChange}
                    errores={errores}
                />

            </FisioterapeutaDialog>

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
                        ? reactivarFisioterapeutaSeleccionado
                        : eliminarFisioterapeuta
                }
                title={
                    modoReactivar
                        ? "Reactivar fisioterapeuta"
                        : "Inactivar fisioterapeuta"
                }
                message={
                    fisioterapeutaEstado
                        ? modoReactivar
                            ? `¿Está seguro de reactivar a ${fisioterapeutaEstado.nombres} ${fisioterapeutaEstado.apellidos}?

                                El fisioterapeuta volverá a aparecer como ACTIVO en el sistema.`
                            : `¿Está seguro de inactivar a ${fisioterapeutaEstado.nombres} ${fisioterapeutaEstado.apellidos}?

                                El fisioterapeuta conservará su historial, pero dejará de aparecer como ACTIVO.`
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

export default Fisioterapeutas;