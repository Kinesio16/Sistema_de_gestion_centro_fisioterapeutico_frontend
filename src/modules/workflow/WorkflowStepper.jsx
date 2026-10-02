import {
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";

function WorkflowStepper({

    pasos,

    pasoActual,

}) {

    return (

        <Stepper
            activeStep={pasoActual}
            sx={{
                mb:4,
            }}
        >

            {pasos.map((paso) => (

                <Step key={paso}>

                    <StepLabel>

                        {paso}

                    </StepLabel>

                </Step>

            ))}

        </Stepper>

    );

}

export default WorkflowStepper;