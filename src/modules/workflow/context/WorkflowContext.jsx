import { useState } from "react";
import WorkflowContext from "./WorkflowContextInstance";


const initialWorkflow = {

        paciente: {

            id: null,

            guardado: false,

            datos: {

                nombres: "",
                apellidos: "",
                cedula: "",
                celular: "",
                correo: "",
                direccion: "",
                fechaNacimiento: "",
                sexo: "",
                ocupacion: "",
                contactoEmergencia: "",
                telefonoEmergencia: "",
                observaciones: "",

            }

        },

        evaluacion: {

            id: null,

            guardado: false,

            datos: {

                pacienteId: "",

                fisioterapeutaId: "",

                fechaEvaluacion: "",

                motivoConsulta: "",

                antecedentes: "",

                escalaDolorEva: "",

                diagnosticoFisioterapeutico: "",

                objetivosTratamiento: "",

                inspeccion: "",

                palpacion: "",

                rangoMovimiento: "",

                fuerzaMuscular: "",

                pruebasFuncionales: "",

                sesionesRecomendadas: "",

                frecuenciaSemanal: "",

                tratamientoSugerido: "",

                observaciones: "",

            }

        },

        tratamiento: {

            id: null,

            guardado: false,

            datos: {

                pacienteId: "",

                fisioterapeutaId: "",

                evaluacionId: "",

                diagnostico: "",

                objetivoGeneral: "",

                tratamientoPropuesto: "",

                tecnicas: [],

                sesionesPlanificadas: "",

                frecuenciaSemanal: "",

                observaciones: "",

            }

        },

        venta: {

            id: null,

            guardado: false,

            datos: {

                pacienteId: "",

                fisioterapeutaId: "",

                servicioId: "",

                sucursalId: "",

                nombreServicio: "",

                precioUnitario: 0,

                cantidadSesiones: 0,

                descuento: 0,

                total: 0,

                promocion: false,

                formaPago: "",

                estadoPago: "",

                estadoFactura: "",

                observaciones: "",

            }

        },

        sesiones: {

            id: null,

            guardado: false,

            datos: {

                tratamientoId: "",

                nombrePaciente: "",

                nombreFisioterapeuta: "",

                fechaSesion: "",

                horaInicio: "",

                horaFin: "",

                evolucionClinica: "",

                observaciones: "",

                proximaSesionObservacion: "",

                evaAntes: null,

                evaDespues: null,

                tecnicasAplicadas: [],

                proximaSesion: "",

            }

        },

    };
    export function WorkflowProvider({ children }) {

        const [workflowData, setWorkflowData] =
            useState(initialWorkflow);


    const [snackbar, setSnackbar] = useState({

        open: false,

        message: "",

        severity: "success",

    });


    const actualizarCampo = (paso, name, value) => {

        setWorkflowData(prev => ({

            ...prev,

            [paso]: {

                ...prev[paso],

                datos: {

                    ...prev[paso].datos,

                    [name]: value,

                }

            }

        }));

    };

    const actualizarPaso = (paso, datos) => {

        setWorkflowData(prev => ({

            ...prev,

            [paso]: {

                ...prev[paso],

                datos: {

                    ...prev[paso].datos,

                    ...datos,

                }

            }

        }));

    };

    const guardarPaso = (paso, datos, id) => {

        setWorkflowData(prev => ({

            ...prev,

            [paso]: {

                ...prev[paso],

                id,

                guardado: true,

                datos: {

                    ...prev[paso].datos,

                    ...datos,

                }

            }

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

    const cerrarSnackbar = () => {

        setSnackbar(prev => ({

            ...prev,

            open: false,

        }));

    };

    const reiniciarWorkflow = () => {

        setWorkflowData(initialWorkflow);

    };



    return (

        <WorkflowContext.Provider
            value={{

                workflowData,

                actualizarCampo,

                actualizarPaso,

                guardarPaso,

                reiniciarWorkflow,

                snackbar,

                mostrarSnackbar,

                cerrarSnackbar,

            }}
        >
            {children}
        </WorkflowContext.Provider>

    );

}