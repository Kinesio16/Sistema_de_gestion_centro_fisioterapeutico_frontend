import { useEffect, useState } from "react";

import WorkflowTratamiento from "./WorkflowTratamiento";

import useWorkflowContext
from "./context/useWorkflowContext";
import {

    crearTratamiento,

    actualizarTratamiento,

} from "../../services/tratamientoService";

import validationErrorHandler
    from "../../utils/validationErrorHandler";
import {
    obtenerFisioterapeutasActivos,
} from "../../services/fisioterapeutaService";

function WorkflowTratamientoContainer() {

    const {

        workflowData,

        actualizarCampo,

        actualizarPaso,

        guardarPaso,

        mostrarSnackbar,

    } = useWorkflowContext();

    const pacientes = workflowData.paciente.id
        ? [
            {
                id: workflowData.paciente.id,
                ...workflowData.paciente.datos,
            },
        ]
        : [];

    const evaluaciones = workflowData.evaluacion.id
        ? [
            {
                id: workflowData.evaluacion.id,
                ...workflowData.evaluacion.datos,
            },
        ]
        : [];
    
    const [fisioterapeutas, setFisioterapeutas] = useState([]);

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);

    const [editando, setEditando] = useState(false);

    const [editarInformacion, setEditarInformacion] = useState(false);

    useEffect(() => {

        if (

            workflowData.evaluacion.id &&

            !workflowData.tratamiento.datos.evaluacionId

        ) {

            actualizarPaso(

                "tratamiento",

                {

                    pacienteId:
                        workflowData.paciente.id,

                    fisioterapeutaId:
                        workflowData.evaluacion.datos.fisioterapeutaId,

                    evaluacionId:
                        workflowData.evaluacion.id,

                    diagnostico:
                        workflowData.evaluacion.datos.diagnosticoFisioterapeutico,

                    objetivoGeneral:
                        workflowData.evaluacion.datos.objetivosTratamiento,

                    tratamientoPropuesto:
                        workflowData.evaluacion.datos.tratamientoSugerido,

                    sesionesPlanificadas:
                        workflowData.evaluacion.datos.sesionesRecomendadas,

                    frecuenciaSemanal:
                        workflowData.evaluacion.datos.frecuenciaSemanal,

                }

            );

        }

    }, [

        workflowData.evaluacion.id,

        workflowData.paciente.id,

        workflowData.evaluacion.datos,

        workflowData.tratamiento.datos.evaluacionId,

        actualizarPaso,

    ]);

    useEffect(() => {
    
            const cargarFisioterapeutas = async () => {
    
                const data = await obtenerFisioterapeutasActivos();
    
                setFisioterapeutas(data);
    
            };
    
            cargarFisioterapeutas();
    
        }, []);

    const handleChange = (e) => {

        const {

            name,

            value,

        } = e.target;

        actualizarCampo(

            "tratamiento",

            name,

            value

        );

        setErrores(prev => ({

            ...prev,

            [name]: undefined,

        }));

        if (workflowData.tratamiento.guardado) {

            setEditando(true);

        }

    };

    const guardarTratamiento = async () => {

        if (guardando) {
            return;
        }

        try {

            setGuardando(true);

            let tratamiento;
            let mensaje = "";

            if (workflowData.tratamiento.guardado) {

                tratamiento = await actualizarTratamiento(

                    workflowData.tratamiento.id,

                    workflowData.tratamiento.datos

                );

                mensaje = "Tratamiento actualizado correctamente.";

            } else {

                tratamiento = await crearTratamiento(

                    workflowData.tratamiento.datos

                );

                mensaje = "Tratamiento registrado correctamente.";

            }

            guardarPaso(

                "tratamiento",

                tratamiento,

                tratamiento.id

            );

            setEditando(false);

            setEditarInformacion(false);

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

        <WorkflowTratamiento

            formData={workflowData.tratamiento.datos}

            errores={errores}

            pacientes={pacientes}

            fisioterapeutas={fisioterapeutas}

            evaluaciones={evaluaciones}

            guardado={workflowData.tratamiento.guardado}

            guardando={guardando}

            onGuardar={guardarTratamiento}

            editando={editando}

            editarInformacion={editarInformacion}

            setEditarInformacion={setEditarInformacion}

            onChange={handleChange}

        />

    );
}

export default WorkflowTratamientoContainer;