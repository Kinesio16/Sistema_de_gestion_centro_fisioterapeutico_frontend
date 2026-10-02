import { useState } from "react";

const pasos = [
    "Paciente",
    "Evaluación",
    "Tratamiento",
    "Venta",
    "Sesiones",
];

function useWorkflow() {

    const [pasoActual, setPasoActual] = useState(0);

    const siguiente = () => {

        setPasoActual((prev) =>
            Math.min(prev + 1, pasos.length - 1)
        );

    };

    const anterior = () => {

        setPasoActual((prev) =>
            Math.max(prev - 1, 0)
        );

    };

    const reiniciar = () => {

        setPasoActual(0);
        
    };

    return {

        pasos,

        pasoActual,

        siguiente,

        anterior,

        reiniciar,

    };

}

export default useWorkflow;