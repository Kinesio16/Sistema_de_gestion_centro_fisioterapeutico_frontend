import { useEffect, useState } from "react";

import WorkflowVenta from "./WorkflowVenta";

import useWorkflowContext
    from "./context/useWorkflowContext";

import {
    obtenerServiciosActivos,
} from "../../services/servicioService";

import {
    obtenerFisioterapeutasActivos,
} from "../../services/fisioterapeutaService";

import {
    obtenerSucursalesActivas,
} from "../../services/sucursalService";

import {
    crearVenta,
    actualizarVenta,
} from "../../services/ventaService";

import validationErrorHandler
    from "../../utils/validationErrorHandler";

function WorkflowVentaContainer() {

    const {

        workflowData,

        actualizarCampo,

        actualizarPaso,

        guardarPaso,

        mostrarSnackbar,

    } = useWorkflowContext();

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);

    const [editando, setEditando] = useState(false);

    const [servicios, setServicios] = useState([]);

    const [fisioterapeutas, setFisioterapeutas] = useState([]);

    const [sucursales, setSucursales] = useState([]);

    const pacientes = workflowData.paciente.id
    ? [
        {
            id: workflowData.paciente.id,
            ...workflowData.paciente.datos,
        },
    ]
    : [];

    const fisioterapeutasWorkflow = fisioterapeutas.filter(

        fisioterapeuta =>

            fisioterapeuta.id ===
            workflowData.evaluacion.datos.fisioterapeutaId

    );

    useEffect(() => {

        const cargarCatalogos = async () => {

            const [

                serviciosRes,

                fisioterapeutasRes,

                sucursalesRes,

            ] = await Promise.all([

                obtenerServiciosActivos(),

                obtenerFisioterapeutasActivos(),

                obtenerSucursalesActivas(),

            ]);

            setServicios(serviciosRes);

            setFisioterapeutas(fisioterapeutasRes);

            setSucursales(sucursalesRes);

        };

        cargarCatalogos();

    }, []);

    useEffect(() => {

        if (

            workflowData.tratamiento.id &&

            !workflowData.venta.datos.pacienteId &&

            !workflowData.venta.datos.fisioterapeutaId

        ) {

            actualizarCampo(

                "venta",

                "pacienteId",

                workflowData.paciente.id

            );

            actualizarCampo(

                "venta",

                "fisioterapeutaId",

                workflowData.evaluacion.datos.fisioterapeutaId

            );

        }

    }, [

        workflowData.tratamiento.id,

        workflowData.paciente.id,

        workflowData.evaluacion.datos.fisioterapeutaId,

        workflowData.venta.datos.pacienteId,

        workflowData.venta.datos.fisioterapeutaId,

        actualizarCampo,

    ]);

    const handleChange = ({ target }) => {

            const { name, value } = target;

           if (name === "servicio") {

                const precio = Number(
                    value?.precioVenta || 0
                );

                const descuento = Number(
                    workflowData.venta.datos.descuento || 0
                );

                actualizarPaso(

                    "venta",

                    {

                        ...workflowData.venta.datos,

                        servicioId: value?.id || "",

                        nombreServicio: value?.nombre || "",

                        precioUnitario: precio,

                        cantidadSesiones:
                            value?.cantidadSesiones || 0,

                        total: Math.max(
                            precio - descuento,
                            0
                        ),

                        promocion: descuento > 0,

                    }

                );

                if (workflowData.venta.guardado) {

                    setEditando(true);

                }

                return;

            }

           if (name === "descuento") {

                const descuento = Number(value || 0);

                const total = Math.max(

                    Number(
                        workflowData.venta.datos.precioUnitario
                    ) - descuento,

                    0

                );

                actualizarPaso(

                    "venta",

                    {

                        ...workflowData.venta.datos,

                        descuento,

                        total,

                        promocion: descuento > 0,

                    }

                );

                if (workflowData.venta.guardado) {

                    setEditando(true);

                }

                return;

            }

            actualizarCampo(

                "venta",

                name,

                value

            );

            if (workflowData.venta.guardado) {

                setEditando(true);

            }

        };

        const guardarVenta = async () => {

            if (guardando) {
                return;
            }

            try {

                setGuardando(true);

                let venta;

                let mensaje = "";

                if (workflowData.venta.guardado) {

                    venta = await actualizarVenta(

                        workflowData.venta.id,

                        workflowData.venta.datos

                    );

                    mensaje = "Venta actualizada correctamente.";

                } else {

                    venta = await crearVenta(

                        workflowData.venta.datos

                    );

                    mensaje = "Venta registrada correctamente.";

                }

                guardarPaso(

                    "venta",

                    venta,

                    venta.id

                );

                setEditando(false);

                mostrarSnackbar(mensaje);

            } catch (error) {

                validationErrorHandler(

                    error,

                    setErrores

                );

                mostrarSnackbar(

                    "Revise los campos resaltados.",

                    "error"

                );

                console.error(error);

            } finally {

                setGuardando(false);

            }

        };

        return (

            <WorkflowVenta

                formData={workflowData.venta.datos}

                errores={errores}

                pacientes={pacientes}

                servicios={servicios}

                fisioterapeutas={fisioterapeutasWorkflow}

                sucursales={sucursales}

                guardado={workflowData.venta.guardado}

                guardando={guardando}

                editando={editando}

                onChange={handleChange}

                onGuardar={guardarVenta}

            />

        );
    }

export default WorkflowVentaContainer;