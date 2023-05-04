/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unsafe-optional-chaining */
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { updateAccount } from "../shared/store/modules/accountsSlice";
import { task } from "../shared/types";
import generateID from "../shared/utils/generateID";
import Alerts from "./Alerts";

const AddTask: FC<{ IdChange: number; onIdChange: (id: number) => void }> = ({
    IdChange,
    onIdChange,
}) => {
    const [description, setDescription] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const accounts = useAppSelector((state) => state.accounts);
    const id = useAppSelector((state) => state.userLogged.value);
    const tasks = accounts.entities[id]?.tasks;
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        const taskEdit = tasks?.filter((task) => task.id === IdChange);
        if (taskEdit!.length) {
            setDescription(taskEdit![0]?.description);
            setDetail(taskEdit![0]?.detail);
            setIsEdit(true);
        }
    }, [IdChange]);

    const handleEditSubmit = (e: any) => {
        e.preventDefault();
        if (!description.length) {
            setError("preencha todos os campos.");
            return;
        }
        if (description.length <= 7) {
            setWarning("Descrição precisa ter no minimo 7 caracteres.");
            return;
        }
        if (detail.length <= 3) {
            setWarning("Detalhe precisa ter no minimo 3 caracteres.");
            return;
        }
        setSuccess("Tarefa Editada com sucesso!");

        const taskEdit = tasks?.map((task) => {
            if (task.id === IdChange) {
                return {
                    ...task,
                    description,
                    detail,
                };
            }
            return task;
        });
        dispatch(
            updateAccount({
                id,
                changes: { tasks: taskEdit },
            }),
        );
        setDescription("");
        setDetail("");
        setIsEdit(false);
        onIdChange(0);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!description.length) {
            setError("preencha todos os campos.");
            return;
        }
        if (description.length <= 7) {
            setWarning("Descrição precisa ter no minimo 7 caracteres.");
            return;
        }
        if (detail.length <= 3) {
            setWarning("Detalhe precisa ter no minimo 3 caracteres.");
            return;
        }

        setSuccess("Tarefa cadastrada com sucesso!");
        const userTasks = tasks! || [];
        const newTasks: task[] = [
            ...userTasks,
            {
                id: generateID(),
                description,
                detail,
                favorite: false,
            },
        ];

        dispatch(
            updateAccount({
                id,
                changes: { tasks: newTasks },
            }),
        );
        setDescription("");
        setDetail("");
    };
    return (
        <>
            {error ? <Alerts severity="error" text={error} /> : ""}
            {warning ? <Alerts severity="warning" text={warning} /> : ""}
            {success ? <Alerts severity="success" text={success} /> : ""}
            <Box
                onSubmit={isEdit ? handleEditSubmit : handleSubmit}
                component="form"
                height="100%"
                display="flex"
                alignItems="center"
                flexDirection="column"
                p={5}
                boxShadow={4}
            >
                <Typography variant="h4">TODO LIST</Typography>
                <Grid container flexDirection="column" mt={50} gap={2}>
                    <Grid item>
                        <TextField
                            value={description}
                            fullWidth
                            onChange={(e) => setDescription(e.target.value)}
                            variant="filled"
                            sx={{ background: "white" }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={detail}
                            fullWidth
                            onChange={(e) => setDetail(e.target.value)}
                            variant="filled"
                            sx={{ background: "white" }}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            {isEdit ? "Salvar edição" : "Adicionar tarefa"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default AddTask;
