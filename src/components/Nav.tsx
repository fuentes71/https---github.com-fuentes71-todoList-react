import { Box, Button, Grid } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { logoutUser } from "../shared/store/modules/userLoggedSlice";

export const Nav: FC<{ bgcolor?: string }> = ({ bgcolor }) => {
    const navigate = useNavigate();
    const userLogged = useAppSelector((state) => state.userLogged);
    const dispatch = useAppDispatch();

    return (
        <>
            <Box
                height="5vh"
                width="100%"
                justifyContent="center"
                alignItems="center"
                display="flex"
                position="fixed"
                zIndex={100}
            >
                {userLogged.conected ? (
                    <>
                        <Grid
                            container
                            justifyContent="space-around "
                            bgcolor={bgcolor}
                            boxShadow={2}
                            zIndex={100}
                            alignItems="center"
                            height="100%"
                        >
                            <Grid item>
                                <Button
                                    sx={{ color: "whitesmoke" }}
                                    onClick={() => dispatch(logoutUser())}
                                >
                                    Sair
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid container justifyContent="center " alignItems="center" height="100%">
                            <Grid item>
                                <Button onClick={() => navigate("/")}>Login</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => navigate("/signup")}>Cadastrar</Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>
        </>
    );
};
