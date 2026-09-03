import Button from "@mui/material/Button";

function SubmitButton({
    loading = false,
    children,
    onClick,
    type = "button",
    variant = "contained",
    color = "warning",
    ...props
}) {
    return (
        <Button
            loading={loading}
            loadingPosition="center"
            variant={variant}
            color={color}
            type={type}
            onClick={onClick}
            disabled={loading}
            {...props}
        >
            {children}
        </Button>
    );
}

export default SubmitButton;