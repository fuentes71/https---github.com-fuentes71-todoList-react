import { Box, Grid } from "@mui/material";
import { useState } from "react";

import AddTask from "../components/AddTask";
import ListCard from "../components/ListCard";
import { Nav } from "../components/Nav";

const todo = () => {
    const [taskId, setTaskId] = useState(0);

    return (
        <>
            <Nav bgcolor={taskId ? "#ed6c02" : "#ff4040"} />
            <Box height="100vh" position="relative" width="100%">
                <Grid container width="100%" height="100%" mt="3vh">
                    <Grid
                        item
                        xs={6}
                        bgcolor={taskId ? "#ed6c02" : "#ff4040"}
                        position="fixed"
                        height="100%"
                        width="50%"
                    >
                        <AddTask
                            IdChange={taskId}
                            onIdChange={(id) => {
                                setTaskId(id);
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        p={2}
                        xs={6}
                        height="100%"
                        width="50%"
                        position="absolute"
                        right={0}
                        mt="3vh"
                    >
                        <ListCard
                            onValueChange={(id) => {
                                setTaskId(id);
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default todo;
