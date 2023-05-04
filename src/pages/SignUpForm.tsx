/* eslint-disable @typescript-eslint/no-unused-vars */

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

import Alerts from "../components/Alerts";
import { Nav } from "../components/Nav";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { addAccount } from "../shared/store/modules/accountsSlice";

export const SignUpForm: FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const accounts = useAppSelector((state) => state.accounts);
    const dispatch = useAppDispatch();

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/g;
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("");
            }, 1500);
        }
        if (success) {
            setTimeout(() => {
                setSuccess("");
            }, 1500);
        }
        if (warning) {
            setTimeout(() => {
                setWarning("");
            }, 1500);
        }
    }, [error, success, warning]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        switch (name) {
            case "email":
                setEmail(value);
                break;

            case "password":
                setPassword(value);
                break;

            case "name":
                setName(value);
                break;

            default:
                setRePassword(value);
                break;
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (accounts.ids.some((id) => id === email)) {
            setError("Email já cadastrado!");
            return;
        }
        dispatch(addAccount({ email, name, password, tasks: [] }));
        setSuccess("Conta cadastrada com sucesso");
    };

    return (
        <>
            <Nav />
            {error ? <Alerts severity="error" text={error} /> : ""}
            {success ? <Alerts severity="success" text={success} /> : ""}
            {warning ? <Alerts severity="warning" text={warning} /> : ""}
            <Box
                width="100%"
                height="100vh"
                justifyContent="center"
                alignItems="center"
                display="flex"
            >
                <Card sx={{ maxWidth: 345, padding: "20px" }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            margin="normal"
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            margin="normal"
                            error={!!error}
                            required
                            fullWidth
                        />
                        <FormControl fullWidth sx={{ mt: 2, width: "100%" }} variant="outlined">
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                sx={{
                                    backgroundColor: "#fff",
                                    padding: "0 8px",
                                    marginLeft: "-10px",
                                }}
                            >
                                Password *
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((show) => !show)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <TextField
                            label="Repita a senha"
                            name="rePassword"
                            value={rePassword}
                            type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            margin="normal"
                            required
                            fullWidth
                        />

                        <Button type="submit" variant="contained" color="primary">
                            Cadastrar
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    );
};
