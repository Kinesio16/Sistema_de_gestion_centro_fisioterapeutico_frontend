import { useEffect, useState } from "react";

import WorkflowSesion from "./WorkflowSesion";

import useWorkflowContext
    from "./context/useWorkflowContext";

import {
    crearSesion,
    actualizarSesion,
} from "../../services/sesionService";

import validationErrorHandler
    from "../../utils/validationErrorHandler";

import {
    obtenerTratamientos,
} from "../../services/tratamientoService";

function WorkflowSesionContainer() {

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

    const [tratamientos, setTratamientos] = useState([]);

    useEffect(() => {

        const cargarTratamientos = async () => {

            const data =
                await obtenerTratamientos();

            setTratamientos(data);

        };

        cargarTratamientos();

    }, []);

    useEffect(() => {

        if (

            workflowData.venta.id &&

            !workflowData.sesiones.datos.tratamientoId &&

            tratamientos.length > 0

        ) {

            const tratamiento = tratamientos.find(

                t => t.id === workflowData.tratamiento.id

            );


            if (!tratamiento) return;

            actualizarPaso(

                "sesiones",

                {

                    tratamientoId: tratamiento.id,

                    nombrePaciente:
                        tratamiento.nombrePaciente,

                    nombreFisioterapeuta:
                        tratamiento.nombreFisioterapeuta,

                }

            );

        }

    }, [

        workflowData.venta.id,

        workflowData.tratamiento.id,

        workflowData.sesiones.datos.tratamientoId,

        tratamientos,

        actualizarPaso,

    ]);

    const handleChange = ({ target }) => {

        const {

            name,

            value,

        } = target;

        actualizarCampo(

            "sesiones",

            name,

            value

        );

        setErrores(prev => ({

            ...prev,

            [name]: undefined,

        }));

        if (workflowData.sesiones.guardado) {

            setEditando(true);

        }

    };

    const handleGuardar = async () => {

        if (guardando) return;

        setGuardando(true);

        try {

            let respuesta;

            if (workflowData.sesiones.guardado) {

                respuesta = await actualizarSesion(

                    workflowData.sesiones.id,

                    workflowData.sesiones.datos

                );

            } else {

                respuesta = await crearSesion(

                    workflowData.sesiones.datos

                );

            }

            guardarPaso(

                "sesiones",

                respuesta,

                respuesta.id

            );

            setErrores({});

            setEditando(false);

            mostrarSnackbar(

                workflowData.sesiones.guardado
                    ? "Sesión actualizada correctamente."
                    : "Sesión registrada correctamente."

            );


        } catch (error) {

            validationErrorHandler(

                error,

                setErrores

            );

        } finally {

            setGuardando(false);

        }

    };

    const setFormData = (actualizador) => {

        const nuevosDatos =

            typeof actualizador === "function"

                ? actualizador(
                    workflowData.sesiones.datos
                )

                : actualizador;

        actualizarPaso(

            "sesiones",

            nuevosDatos

        );

        if (workflowData.sesiones.guardado) {

            setEditando(true);

        }

        setErrores(prev => ({

            ...prev,

            tratamientoId: undefined,

            fechaSesion: undefined,

            horaInicio: undefined,

            horaFin: undefined,

            evolucionClinica: undefined,

            observaciones: undefined,

            proximaSesionObservacion: undefined,

            evaAntes: undefined,

            evaDespues: undefined,

            tecnicasAplicadas: undefined,

            proximaSesion: undefined,

        }));

    };

    return (

        <WorkflowSesion

            formData={workflowData.sesiones.datos}

            setFormData={setFormData}

            errores={errores}

            tratamientos={tratamientos}

            guardado={workflowData.sesiones.guardado}

            guardando={guardando}

            onGuardar={handleGuardar}

            editando={editando}

            onChange={handleChange}

        />

    );

}

export default WorkflowSesionContainer;