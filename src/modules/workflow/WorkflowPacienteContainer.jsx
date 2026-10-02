import { useState } from "react";

import WorkflowPaciente from "./WorkflowPaciente";

import useWorkflowContext
    from "./context/useWorkflowContext";

import { crearPaciente, 
         actualizarPaciente,
} from "../../services/pacienteService";
import validationErrorHandler
from "../../utils/validationErrorHandler";

function WorkflowPacienteContainer({
        onWorkflowChange,
    }) {

    const {

        workflowData,

        actualizarCampo,

        guardarPaso,

        mostrarSnackbar,

    } = useWorkflowContext();

    const [errores, setErrores] = useState({});

    const [guardando, setGuardando] = useState(false);

    const [editando, setEditando] = useState(false);

    const handleChange = (e) => {

        const {

            name,

            value,

        } = e.target;

        actualizarCampo(

            "paciente",

            name,

            value

        );

        setErrores(prev => ({

            ...prev,

            [name]: undefined,

        }));

        if (workflowData.paciente.guardado) {

            setEditando(true);

        }

    };

    const guardarPaciente = async () => {

        if (guardando) {
            return;
        }

        try {

            setGuardando(true);

            let paciente;
            let mensaje = "";

            if (workflowData.paciente.guardado) {

                paciente = await actualizarPaciente(

                    workflowData.paciente.id,

                    workflowData.paciente.datos

                );

                mensaje = "Paciente actualizado correctamente.";

            } else {

                paciente = await crearPaciente(

                    workflowData.paciente.datos

                );
                mensaje = "Paciente registrado correctamente.";

            }

            guardarPaso(

                "paciente",

                paciente,

                paciente.id

            );

            setEditando(false);

            mostrarSnackbar(mensaje);

            if (onWorkflowChange) {

                await onWorkflowChange();

            }

        } catch(error){

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

        <WorkflowPaciente

            formData={workflowData.paciente.datos}

            errores={errores}

            onChange={handleChange}

            guardado={workflowData.paciente.guardado}

            guardando={guardando}

            editando = {editando}

            onGuardar={guardarPaciente}

        />

    );

}

export default WorkflowPacienteContainer;