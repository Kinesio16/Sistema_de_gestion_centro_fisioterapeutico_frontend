import { useMemo, useState } from "react";



import PageTitle from "../../components/common/PageTitle";
import SearchToolbar from "../../components/common/SearchToolbar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import CustomSnackbar from "../../components/common/CustomSnackbar";

import VentaTable from "./components/VentaTable";
import VentaDialog from "./components/VentaDialog";
import VentaForm from "./components/VentaForm";
import VentaDetailsDialog from "./components/VentaDetailsDialog";

import { useVentas } from "../../hooks/useVentas";
import { usePacientesActivos } from "../../hooks/usePacientesActivos";
import { useServiciosActivos } from "../../hooks/useServiciosActivos";
import { useFisioterapeutasActivos } from "../../hooks/useFisioterapeutasActivos";
import { useSucursalesActivas } from "../../hooks/useSucursalesActivas";
import {
    crearVenta,
    actualizarVenta,
    eliminarVenta as eliminarVentaApi,
} from "../../services/ventaService";

function Ventas() {

    const {

        ventas,

        loading,

        cargarVentas,

    } = useVentas();

    const {
    pacientes,
        } = usePacientesActivos();

        const {
            servicios,
        } = useServiciosActivos();

        const {
            fisioterapeutas,
        } = useFisioterapeutasActivos();

        const {
            sucursales,
        } = useSucursalesActivas();


    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] =
        useState(10);

    const [search, setSearch] =
        useState("");

    const [openDialog, setOpenDialog] =
        useState(false);

    const [openDetail, setOpenDetail] =
        useState(false);

    const [ventaSeleccionada,
        setVentaSeleccionada] =
        useState(null);

    const [modoEdicion,
        setModoEdicion] =
        useState(false);

    const [openConfirm,
        setOpenConfirm] =
        useState(false);

    const [snackbar,
        setSnackbar] =
        useState({

            open: false,

            message: "",

            severity: "success",

        });

        const [guardando, setGuardando] = useState(false);

        const [formData,
            setFormData] =
            useState({

                pacienteId: "",

                servicioId: "",

                fisioterapeutaId: "",

                sucursalId: "",

                formaPago: "EFECTIVO",

                estadoPago: "PENDIENTE",

                estadoFactura: "PENDIENTE",

                descuento: 0,

                observaciones: "",

                precioUnitario: 0,

                cantidadSesiones: 0,

                total: 0,

            });

        const [errores,
            setErrores] =
            useState({});

        const ventasFiltradas =
            useMemo(() => {

                return ventas.filter((venta) =>

                    venta.codigoVenta
                        .toLowerCase()
                        .includes(search.toLowerCase())

                    ||

                    venta.paciente
                        .toLowerCase()
                        .includes(search.toLowerCase())

                    ||

                    venta.nombreServicio
                        .toLowerCase()
                        .includes(search.toLowerCase())

                );

            }, [ventas, search]);

        const nuevaVenta = () => {

            setModoEdicion(false);

            setVentaSeleccionada(null);

            setFormData({

                pacienteId: "",

                servicioId: "",

                fisioterapeutaId: "",

                sucursalId: "",

                formaPago: "EFECTIVO",

                estadoPago: "PENDIENTE",

                estadoFactura: "PENDIENTE",

                descuento: 0,

                observaciones: "",

                precioUnitario: 0,

                cantidadSesiones: 0,

                total: 0,

            });

            setOpenDialog(true);

        };

        const handleChange = ({ target }) => {

            const { name, value } = target;

           if (name === "servicio") {

                const precio = Number(
                    value?.precioVenta || 0
                );

                const descuento = Number(
                    formData.descuento || 0
                );

                setFormData(prev => ({

                    ...prev,

                    servicioId: value?.id || "",

                    nombreServicio:
                        value?.nombre || "",

                    precioUnitario: precio,

                    cantidadSesiones:
                        value?.cantidadSesiones || 0,

                    total: Math.max(
                        precio - descuento,
                        0
                    ),

                }));

                return;

            }

           if (name === "descuento") {

                const descuento = Number(value || 0);

                setFormData((prev) => {

                    const total = Math.max(
                        Number(prev.precioUnitario) - descuento,
                        0
                    );

                    return {

                        ...prev,

                        descuento,

                        total,

                        promocion: descuento > 0,

                    };

                });

                return;

            }

            setFormData((prev) => ({

                ...prev,

                [name]: value,

            }));

        };

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

        const validarFormulario = () => {

            const nuevosErrores = {};

            if (!formData.pacienteId) {

                nuevosErrores.pacienteId =
                    "Seleccione un paciente.";

            }

            if (!formData.servicioId) {

                nuevosErrores.servicioId =
                    "Seleccione un servicio.";

            }

            if (!formData.fisioterapeutaId) {

                nuevosErrores.fisioterapeutaId =
                    "Seleccione un fisioterapeuta.";

            }

            if (!formData.sucursalId) {

                nuevosErrores.sucursalId =
                    "Seleccione una sucursal.";

            }

            setErrores(nuevosErrores);

            return Object.keys(
                nuevosErrores
            ).length === 0;

        };

        const guardarVenta = async () => {

            if (guardando) return;

            if (!validarFormulario()) {

                return;

            }

            setGuardando(true);

            try {

                const payload = {

                    pacienteId:
                        formData.pacienteId,

                    servicioId:
                        formData.servicioId,

                    fisioterapeutaId:
                        formData.fisioterapeutaId,

                    sucursalId:
                        formData.sucursalId,

                    descuento:
                        formData.descuento,

                    formaPago:
                        formData.formaPago,

                    estadoPago:
                        formData.estadoPago,

                    estadoFactura:
                        formData.estadoFactura,

                    observaciones:
                        formData.observaciones,

                };

                if (modoEdicion) {

                    await actualizarVenta(
                        ventaSeleccionada.id,
                        payload
                    );

                    mostrarSnackbar(
                        "Venta actualizada correctamente."
                    );

                } else {

                    await crearVenta(payload);

                    mostrarSnackbar(
                        "Venta registrada correctamente."
                    );

                }

                cerrarDialog();

                await cargarVentas();

            } catch (error) {

                console.error(error);

                mostrarSnackbar(

                    error.response?.data?.message ||

                    "No se pudo guardar la venta.",

                    "error"

                );

            }finally {

                setGuardando(false);

            }

        };

        const confirmarEliminar = async () => {

            try {

                await eliminarVentaApi(
                ventaSeleccionada.id
            );

                mostrarSnackbar(
                    "Venta anulada correctamente."
                );

                setOpenConfirm(false);

                await cargarVentas();

            } catch (error) {

                console.error(error);

                mostrarSnackbar(

                    error.response?.data?.message ||

                    "No se pudo eliminar la venta.",

                    "error"

                );

            }

        };

        const cerrarDialog = () => {

            setOpenDialog(false);

            setModoEdicion(false);

            setVentaSeleccionada(null);

            setErrores({});

            setFormData({

                pacienteId: "",

                servicioId: "",

                fisioterapeutaId: "",

                sucursalId: "",

                formaPago: "EFECTIVO",

                estadoPago: "PENDIENTE",

                estadoFactura: "PENDIENTE",

                descuento: 0,

                observaciones: "",

                precioUnitario: 0,

                cantidadSesiones: 0,

                total: 0,

            });

        };

        const verVenta = (id) => {

            const venta = ventas.find(
                (v) => v.id === id
            );

            setVentaSeleccionada(venta);

            setOpenDetail(true);

        };
         
        const editarVenta = (id) => {

            const venta = ventas.find(
                (v) => v.id === id
            );

            if (!venta) return;

            setVentaSeleccionada(venta);

            setModoEdicion(true);

            setFormData({

                pacienteId: venta.pacienteId,

                servicioId: venta.servicioId,

                fisioterapeutaId:
                    venta.fisioterapeutaId,

                sucursalId:
                    venta.sucursalId,

                formaPago:
                    venta.formaPago,

                estadoPago:
                    venta.estadoPago,

                estadoFactura:
                    venta.estadoFactura,

                descuento:
                    venta.descuento,

                observaciones:
                    venta.observaciones || "",

                precioUnitario:
                    venta.precioUnitario,

                cantidadSesiones:
                    venta.cantidadSesiones,

                total:
                    venta.total,

            });

            setOpenDialog(true);

        };

        const eliminarVenta = (venta) => {

            setVentaSeleccionada(venta);

            setOpenConfirm(true);

        };

        return (

            <>

                <PageTitle

                    title="Ventas"

                    subtitle="Gestión de ventas"

                />

                <SearchToolbar

                    placeholder="Buscar venta..."

                    busqueda={search}

                    onBuscar={setSearch}

                    buttonText="Nueva Venta"

                    onNuevo={nuevaVenta}

                />


                <VentaTable

                    ventas={ventasFiltradas}

                    loading={loading}

                    page={page}

                    rowsPerPage={rowsPerPage}

                    onPageChange={setPage}

                    onRowsPerPageChange={
                        setRowsPerPage
                    }

                    onVer={verVenta}

                    onEditar={editarVenta}

                    onEliminar={eliminarVenta}

                />

                <VentaDialog

                    open={openDialog}

                    onClose={cerrarDialog}

                    title={
                        modoEdicion
                            ? "Editar Venta"
                            : "Nueva Venta"
                    }

                    onSave={guardarVenta}
                    guardando={guardando}

                >

                    <VentaForm

                        formData={formData}

                        onChange={handleChange}

                        errores={errores}

                        pacientes={pacientes}

                        servicios={servicios}

                        fisioterapeutas={fisioterapeutas}

                        sucursales={sucursales}

                    />

                </VentaDialog>

                <VentaDetailsDialog

                    open={openDetail}

                    onClose={() =>
                        setOpenDetail(false)
                    }

                    venta={ventaSeleccionada}

                />

                <ConfirmDialog

                    open={openConfirm}

                    title="Anular venta"

                    message={`¿Desea anular la venta ${ventaSeleccionada?.codigoVenta}?`}

                    onClose={() =>
                        setOpenConfirm(false)
                    }

                    onConfirm={confirmarEliminar}

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

        export default Ventas;