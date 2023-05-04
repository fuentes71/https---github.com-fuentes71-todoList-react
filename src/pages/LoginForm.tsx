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
import { FC, useState } from "react";

import Alerts from "../components/Alerts";
import { Nav } from "../components/Nav";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { saveUser } from "../shared/store/modules/userLoggedSlice";

export const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const accounts = useAppSelector((state) => state.accounts);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case "email":
                setEmail(value);
                break;
            default:
                setPassword(value);
                break;
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!accounts.ids.some((user) => user === email)) {
            setError("E-mail não cadastrado");
            return;
        }
        if (
            accounts.entities[email]?.email === email &&
            accounts.entities[email]?.password === password
        ) {
            dispatch(saveUser(accounts.entities[email]?.email));
        } else {
            setError("E-mail ou senha errado!");
        }
    };

    return (
        <>
            <Nav />
            {error ? <Alerts severity="error" text={error} /> : ""}
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
                            label="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            margin="normal"
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

                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    );
};
