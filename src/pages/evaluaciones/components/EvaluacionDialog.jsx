import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import SubmitButton from "../../../components/common/SubmitButton";
import EvaluacionForm from "./EvaluacionForm";

function EvaluacionDialog({
    open,
    onClose,
    onGuardar,
    guardando,
    formData,
    onChange,
    errores,
    pacientes,
    fisioterapeutas,
    editando,
}) {
    return (
        <Dialog open={open}  onClose={guardando ? undefined : onClose}
         fullWidth maxWidth="lg" scroll="paper"
            slotProps={{
        paper: {
            sx: {
                borderRadius: 4, width: "95%", maxHeight: "90vh" } } }}>
            <DialogTitle sx={{ fontWeight: 700 }}>
                {editando ? "Editar evaluación" : "Nueva evaluación"}
            </DialogTitle>
            <DialogContent dividers>
                <EvaluacionForm formData={formData} onChange={onChange} errores={errores}
                    pacientes={pacientes} fisioterapeutas={fisioterapeutas} />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                onClick={onClose}
                disabled={guardando}
                >Cancelar
                </Button>
                <SubmitButton
                    loading={guardando}
                    onClick={onGuardar}
                >
                    {editando ? "Actualizar" : "Guardar"}
                </SubmitButton>
            </DialogActions>
        </Dialog>
    );
}

export default EvaluacionDialog;
