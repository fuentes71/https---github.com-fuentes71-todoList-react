import { Alert, Stack } from "@mui/material";
import { FC } from "react";

interface AlertProps {
    text: string;
    severity: "error" | "success" | "warning";
}

const Alerts: FC<AlertProps> = ({ text, severity }) => {
    return (
        <Stack sx={{ position: "fixed", left: "25px", top: "5rem", zIndex: 9999 }} spacing={2}>
            <Alert severity={severity}>{text}</Alert>
        </Stack>
    );
};

export default Alerts;
