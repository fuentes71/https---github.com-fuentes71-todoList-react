import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "../config/layout/DefaultLayout";
import { LoginForm, SignUpForm, todo } from "../pages";
import { useAppSelector } from "../shared/store/hooks";

const AppRoutes: React.FC = () => {
    const userLogged = useAppSelector((state) => state.userLogged);

    return (
        <BrowserRouter>
            <Routes>
                {userLogged.conected ? (
                    <Route path="/" element={<DefaultLayout component={todo} />} />
                ) : (
                    <>
                        <Route path="/" element={<DefaultLayout component={LoginForm} />} />
                        <Route path="/signup" element={<DefaultLayout component={SignUpForm} />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
