import { Box } from "@mui/material";
import { useState } from "react";

import { useServicios } from "../../hooks/useServicios";

import PageTitle from "../../components/common/PageTitle";
import SearchToolbar from "../../components/common/SearchToolbar";
import CustomSnackbar from "../../components/common/CustomSnackbar";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import ServicioTable from "./components/ServicioTable";
import ServicioDialog from "./components/ServicioDialog";
import ServicioForm from "./components/ServicioForm";
import ServicioDetailsDialog from "./components/ServicioDetailsDialog";

import {
    crearServicio,
    actualizarServicio,
    obtenerServicio,
    inactivarServicio,
    reactivarServicio,
} from "../../services/servicioService";

function Servicios() {

    const {

        servicios,

        loading,

        cargarServicios,

    } = useServicios();

    const [busqueda, setBusqueda] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [detalleOpen, setDetalleOpen] = useState(false);

    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [modoEdicion, setModoEdicion] = useState(false);

    const [modoReactivar, setModoReactivar] = useState(false);

    const [servicioEditando, setServicioEditando] = useState(null);

    const [servicioEstado, setServicioEstado] = useState(null);

    const [errores, setErrores] = useState({});

    const initialFormData = {

        nombre: "",

        descripcion: "",

        cantidadSesiones: "",

        precioCosto: "",

        precioVenta: "",

    };

    const [formData, setFormData] =
        useState(initialFormData);

    const [snackbar, setSnackbar] = useState({

        open: false,

        message: "",

        severity: "success",

    });

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

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:
                [
                    "cantidadSesiones",
                    "precioCosto",
                    "precioVenta"
                ].includes(name)
                    ? value
                    : value
        }));

        setErrores(prev => ({
            ...prev,
            [name]: undefined,
        }));
    };

    const abrirNuevoServicio = () => {

        setModoEdicion(false);

        setErrores({});

        setFormData(initialFormData);

        setOpenDialog(true);

    };

    const cerrarDialog = () => {

        setOpenDialog(false);

        setModoEdicion(false);

        setServicioEditando(null);

        setErrores({});

        setFormData(initialFormData);

    };
        const guardarServicio = async () => {

        if (
            !formData.nombre ||
            !formData.cantidadSesiones ||
            !formData.precioVenta
        ) {

            mostrarSnackbar(
                "Complete todos los campos obligatorios.",
                "warning"
            );

            return;

        }
        const datos = {
            ...formData,
            precioCosto:
                formData.precioCosto === ""
                    ? null
                    : Number(formData.precioCosto),
        };

        try {

            if (modoEdicion) {

                await actualizarServicio(
                    servicioEditando.id,
                    datos
                );

                mostrarSnackbar(
                    "Servicio actualizado correctamente.",
                    "success"
                );

            } else {

                await crearServicio(datos);

                mostrarSnackbar(
                    "Servicio registrado correctamente.",
                    "success"
                );

            }

            setErrores({});

            cerrarDialog();

            await cargarServicios();

        } catch (error) {

            const response = error.response?.data;

            if (response?.data) {

                setErrores(response.data);

                const primerError =
                    Object.values(response.data)[0];

                mostrarSnackbar(primerError, "error");

                return;

            }

            mostrarSnackbar(

                response?.message ||

                "No se pudo guardar el servicio.",

                "error"

            );

        }

    };

    const verServicio = async (id) => {

        try {

            const servicio =
                await obtenerServicio(id);

            setServicioSeleccionado(servicio);

            setDetalleOpen(true);

        } catch (error) {

            console.error(error);

            mostrarSnackbar(
                error.response?.data?.message ||
                "No se pudo obtener el servicio.",
                "error"
            );

        }

    };

    const editarServicio = async (id) => {

        try {

            const servicio =
                await obtenerServicio(id);

            setServicioEditando(servicio);

            setFormData({

                nombre: servicio.nombre,

                descripcion:
                    servicio.descripcion || "",

                cantidadSesiones:
                    servicio.cantidadSesiones,

                precioCosto:
                    servicio.precioCosto ?? "",

                precioVenta:
                    servicio.precioVenta,

            });

            setModoEdicion(true);

            setOpenDialog(true);

        } catch (error) {

            console.error(error);

            mostrarSnackbar(
                error.response?.data?.message ||
                "No se pudo obtener el servicio.",
                "error"
            );

        }

    };

    const abrirConfirmacion = (servicio) => {

        setServicioEstado(servicio);

        setModoReactivar(false);

        setConfirmOpen(true);

    };

    const cerrarConfirmacion = () => {

        setConfirmOpen(false);

        setServicioEstado(null);

        setModoReactivar(false);

    };

    const eliminarServicio = async () => {

        try {

            await inactivarServicio(
                servicioEstado.id
            );

            mostrarSnackbar(
                "Servicio inactivado correctamente.",
                "success"
            );

            cerrarConfirmacion();

            await cargarServicios();

        } catch (error) {

            mostrarSnackbar(

                error.response?.data?.message ||

                "No se pudo inactivar el servicio.",

                "error"

            );

        }

    };

    const abrirReactivacion = (servicio) => {

        setServicioEstado(servicio);

        setModoReactivar(true);

        setConfirmOpen(true);

    };

    const reactivarServicioSeleccionado = async () => {

        try {

            await reactivarServicio(
                servicioEstado.id
            );

            mostrarSnackbar(
                "Servicio reactivado correctamente.",
                "success"
            );

            cerrarConfirmacion();

            await cargarServicios();

        } catch (error) {

            mostrarSnackbar(

                error.response?.data?.message ||

                "No se pudo reactivar el servicio.",

                "error"

            );

        }

    };

    const serviciosFiltrados = servicios.filter((servicio) => {

        const texto = busqueda
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");

        return (

            servicio.codigoServicio
                .toLowerCase()
                .includes(texto)

            ||

            servicio.nombre
                .toLowerCase()
                .includes(texto)

            ||

            (servicio.descripcion || "")
                .toLowerCase()
                .includes(texto)

        );

    });
    return (

    <Box>

        <PageTitle
            title="Servicios"
        />

        <SearchToolbar
            placeholder="Buscar servicio..."
            buttonText="Nuevo Servicio"
            busqueda={busqueda}
            onBuscar={(texto) => {

                setBusqueda(texto);

                setPage(0);

            }}
            onNuevo={abrirNuevoServicio}
        />

        <ServicioTable
            servicios={serviciosFiltrados}
            loading={loading}

            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}

            onVer={verServicio}
            onEditar={editarServicio}
            onEliminar={abrirConfirmacion}
            onReactivar={abrirReactivacion}
        />

        <ServicioDetailsDialog
            open={detalleOpen}
            onClose={() =>
                setDetalleOpen(false)
            }
            servicio={servicioSeleccionado}
        />

        <ServicioDialog
            open={openDialog}
            onClose={cerrarDialog}
            title={
                modoEdicion
                    ? "Editar Servicio"
                    : "Nuevo Servicio"
            }
            modoEdicion={modoEdicion}
            onSave={guardarServicio}
        >

            <ServicioForm
                formData={formData}
                onChange={handleChange}
                errores={errores}
            />

        </ServicioDialog>

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
                    ? reactivarServicioSeleccionado
                    : eliminarServicio
            }
            title={
                modoReactivar
                    ? "Reactivar servicio"
                    : "Inactivar servicio"
            }
            message={
                servicioEstado
                    ? modoReactivar
                        ? `¿Está seguro de reactivar el servicio "${servicioEstado.nombre}"?

                            El servicio volverá a estar disponible en el sistema.`
                                                    : `¿Está seguro de inactivar el servicio "${servicioEstado.nombre}"?

                            El servicio dejará de estar disponible para nuevas ventas.`
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

export default Servicios;