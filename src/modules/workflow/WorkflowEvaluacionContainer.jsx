import { useEffect, useState } from "react";

import WorkflowEvaluacion from "./WorkflowEvaluacion";

import useWorkflowContext
from "./context/useWorkflowContext";

import {crearEvaluacion,actualizarEvaluacion,

} from "../../services/evaluacionService";

import validationErrorHandler
    from "../../utils/validationErrorHandler";

import {
    obtenerFisioterapeutasActivos,
} from "../../services/fisioterapeutaService";

function WorkflowEvaluacionContainer() {

    const {

        workflowData,

        actualizarCampo,

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

    const [fisioterapeutas, setFisioterapeutas] = useState([]);

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);

    const [editando, setEditando] = useState(false);


    useEffect(() => {

        if (

            workflowData.paciente.id &&

            !workflowData.evaluacion.datos.pacienteId

        ) {

            actualizarCampo(

                "evaluacion",

                "pacienteId",

                workflowData.paciente.id

            );

        }

    }, [

        workflowData.paciente.id,

        workflowData.evaluacion.datos.pacienteId,

        actualizarCampo,

    ]);

    useEffect(() => {

        const cargarFisioterapeutas = async () => {

            const data = await obtenerFisioterapeutasActivos();

            setFisioterapeutas(data);

        };

        cargarFisioterapeutas();

    }, []);


    const handleChange = (e)=>{

        const{

            name,

            value,

        }=e.target;

        actualizarCampo(

            "evaluacion",

            name,

            value

        );

        setErrores(prev => ({

            ...prev,

            [name]: undefined,

        }));

        if (workflowData.evaluacion.guardado) {

            setEditando(true);

        }

    };

    const guardarEvaluacion = async () => {

        if (guardando) {
            return;
        }

        try {

            setGuardando(true);

            let evaluacion;
            let mensaje = "";

            if (workflowData.evaluacion.guardado) {

                evaluacion = await actualizarEvaluacion(

                    workflowData.evaluacion.id,

                    workflowData.evaluacion.datos

                );

                mensaje = "Evaluación actualizada correctamente.";

            } else {

                evaluacion = await crearEvaluacion(

                    workflowData.evaluacion.datos

                );

                mensaje = "Evaluación registrada correctamente.";

            }

            guardarPaso(

                "evaluacion",

                evaluacion,

                evaluacion.id

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

    return(

        <WorkflowEvaluacion

            formData={workflowData.evaluacion.datos}

            errores={errores}

            pacientes={pacientes}

            fisioterapeutas={fisioterapeutas}

            onChange={handleChange}

            guardado={workflowData.evaluacion.guardado}

            guardando={guardando}

            editando={editando}

            onGuardar={guardarEvaluacion}

        />

    );

}

export default WorkflowEvaluacionContainer;