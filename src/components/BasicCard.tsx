/* eslint-disable react/prop-types */
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { FC } from "react";

export const BasicCard: FC<{ onValueChange: (value: boolean) => void }> = ({ onValueChange }) => {
    return (
        <Box
            component="span"
            sx={{
                width: "100%",
                height: "100%",
                position: "fixed",
                display: "flex",
                justifyContent: "center",
                top: 0,
                left: 0,
                alignItems: "center",
                background: "#33333380",
            }}
        >
            <Card sx={{ minWidth: 275, position: "relative" }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Deseja Realmente excluir está tarefa?
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => {
                            onValueChange(true);
                        }}
                    >
                        Excluir
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                            onValueChange(false);
                        }}
                    >
                        Cancelar
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};
