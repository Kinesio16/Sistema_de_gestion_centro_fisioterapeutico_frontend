import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";

import WorkflowStepper from "./WorkflowStepper";
import WorkflowPacienteContainer from "./WorkflowPacienteContainer";
import WorkflowEvaluacionContainer from "./WorkflowEvaluacionContainer";
import WorkflowTratamientoContainer from "./WorkflowTratamientoContainer";
import WorkflowVentaContainer from "./WorkflowVentaContainer";
import WorkflowSesionContainer from "./WorkflowSesionContainer";
import { WorkflowProvider } from "./context/WorkflowContext";

import useWorkflow from "./hooks/useWorkflow";
import useWorkflowContext from "./context/useWorkflowContext";

function WorkflowDialog({
        open,
        onClose,
        onWorkflowChange,
    }) {

        return (

            <WorkflowProvider>

                <WorkflowDialogContent

                    open={open}

                    onClose={onClose}

                    onWorkflowChange={onWorkflowChange}

                />

            </WorkflowProvider>

        );

    }
 

    function WorkflowDialogContent({
        open,
        onClose,
        onWorkflowChange,
    }) {

    const {

        pasos,

        pasoActual,

        siguiente,

        anterior,

        reiniciar,

    } = useWorkflow();

    const {

        workflowData,

        reiniciarWorkflow,

        snackbar,

        cerrarSnackbar,

    } = useWorkflowContext();

    const renderPaso = () => {

        switch (pasoActual) {

            case 0:

                return <WorkflowPacienteContainer 
                    onWorkflowChange={onWorkflowChange}
                />;

            case 1:

                return <WorkflowEvaluacionContainer
                    onWorkflowChange={onWorkflowChange}
                />

            case 2:

                return <WorkflowTratamientoContainer
                    onWorkflowChange={onWorkflowChange}
                />;

            case 3:

                return <WorkflowVentaContainer
                    onWorkflowChange={onWorkflowChange}
                />;

            case 4:

                return <WorkflowSesionContainer
                    onWorkflowChange={onWorkflowChange}
                />;

            default:

                return null;

        }

    };

    const handleFinalizar = () => {

        reiniciarWorkflow();

        reiniciar();

        onClose();

    };

    const procesoCompleto =

        workflowData.paciente.guardado &&
        workflowData.evaluacion.guardado &&
        workflowData.tratamiento.guardado &&
        workflowData.venta.guardado &&
        workflowData.sesiones.guardado;

    return (
        <>

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >

            <DialogTitle>

                Nuevo Proceso Clínico

            </DialogTitle>


                <DialogContent>

                    <WorkflowStepper

                        pasos={pasos}

                        pasoActual={pasoActual}

                    />

                    {renderPaso()}

                </DialogContent>

            <DialogActions>

                <Button

                    onClick={anterior}

                    disabled={pasoActual===0}

                >

                    Anterior

                </Button>

                {

                    pasoActual === pasos.length-1

                    ?

                    <Button

                        variant="contained"
                        onClick={handleFinalizar}
                        disabled={!procesoCompleto}
                    >

                        Finalizar

                    </Button>

                    :

                    <Button

                        variant="contained"

                        onClick={siguiente}

                    >

                        Siguiente

                    </Button>

                }

            </DialogActions>

        </Dialog>

        <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={cerrarSnackbar}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >

            <Alert
                severity={snackbar.severity}
                onClose={cerrarSnackbar}
                variant="filled"
                sx={{
                    width: "100%",
                }}
            >

                {snackbar.message}

            </Alert>

        </Snackbar>

        </>
    );

}

export default WorkflowDialog;