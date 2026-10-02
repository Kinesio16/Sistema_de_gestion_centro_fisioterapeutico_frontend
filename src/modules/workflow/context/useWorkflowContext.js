import { useContext } from "react";
import WorkflowContext from "./WorkflowContextInstance";

export default function useWorkflowContext() {
    return useContext(WorkflowContext);
}