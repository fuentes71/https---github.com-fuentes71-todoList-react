/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { updateAccount } from "../shared/store/modules/accountsSlice";
import { task } from "../shared/types";
import { BasicCard } from "./BasicCard";

const ListCard: FC<{ onValueChange: (value: number) => void }> = ({ onValueChange }) => {
    const id = useAppSelector((state) => state.userLogged.value);
    const accounts = useAppSelector((state) => state.accounts);
    const tasks = accounts.entities[id]?.tasks;
    const dispatch = useAppDispatch();

    const [deletCard, setDeletCard] = useState<boolean>(false);
    const [confirmDelet, setConfirmDelet] = useState<boolean>(false);
    const [taskId, setTaskId] = useState<number>(0);

    useEffect(() => {
        console.log(confirmDelet);

        if (confirmDelet) {
            console.log("deu bom");
            // setConfirmDelet(false);
        }
    }, [tasks]);
    const handleDelet = (id: number) => {
        setDeletCard(true);
        setTaskId(id);
    };
    const handleValueChange = (value: boolean) => {
        if (!value) {
            setDeletCard(false);
            return;
        }
        const index = tasks?.findIndex((item: { id: number }) => item.id === taskId);
        tasks?.splice(index!, 1);
        const userTasks = tasks! || [];
        const newTasks: task[] = [...userTasks];

        setConfirmDelet(true);
        setDeletCard(false);

        dispatch(
            updateAccount({
                id,
                changes: { tasks: newTasks },
            }),
        );
    };

    return (
        <>
            <Box>
                {tasks!.length ? (
                    tasks!.map((task: task, index: number) => {
                        return (
                            <Card
                                key={task.id}
                                sx={{
                                    minWidth: 275,
                                    display: "flex",
                                    flexDirection: "column",
                                    marginBottom: 2,
                                }}
                            >
                                <CardContent>
                                    <Grid container flexDirection="column">
                                        <Grid item>
                                            <Grid
                                                container
                                                flexDirection="row"
                                                justifyContent="space-around"
                                            >
                                                <Grid item xs={9}>
                                                    <Typography
                                                        variant="h5"
                                                        component="div"
                                                        width="auto"
                                                        sx={{ wordBreak: "break-all" }}
                                                    >
                                                        {index + 1} - {task.description}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Chip
                                                        variant="outlined"
                                                        color="warning"
                                                        label="Editar"
                                                        icon={<Edit />}
                                                        onClick={() => {
                                                            onValueChange(task.id);
                                                        }}
                                                    />
                                                    <Chip
                                                        variant="outlined"
                                                        color="error"
                                                        label="Excluir"
                                                        icon={<Delete />}
                                                        onClick={() => {
                                                            handleDelet(task.id);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="body2"
                                                sx={{ wordBreak: "break-all" }}
                                            >
                                                {task.detail}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <Box margin={5}>
                        <Typography variant="h6">Nenhum recado existente!</Typography>
                    </Box>
                )}
            </Box>
            {deletCard ? <BasicCard onValueChange={handleValueChange} /> : ""}
        </>
    );
};

export default ListCard;
