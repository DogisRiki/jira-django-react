import { toggleMode } from "@/redux/auth/authSlice";
import { fetchAsyncCreateProfile, fetchAsyncLogin, fetchAsyncRegister } from "@/redux/auth/operations";
import { selectIsLoginView } from "@/redux/auth/selectors";
import { AppDispatch } from "@/redux/store";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Auth: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const isLoginView = useSelector(selectIsLoginView);
    const [credential, setCredential] = useState({ username: "", password: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const login = async () => {
        if (isLoginView) {
            await dispatch(fetchAsyncLogin(credential));
        } else {
            const result = await dispatch(fetchAsyncRegister(credential));
            if (fetchAsyncRegister.fulfilled.match(result)) {
                await dispatch(fetchAsyncLogin(credential));
                await dispatch(fetchAsyncCreateProfile());
            }
        }
    };

    return (
        <Box
            sx={{
                fontFamily: "serif",
                color: "dimgray",
                minHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                maxWidth: "400px",
                margin: "0 auto",
            }}
        >
            <Typography variant="h4">{isLoginView ? "Login" : "Register"}</Typography>
            <br />
            <TextField
                InputLabelProps={{ shrink: true }}
                label="Username"
                type="text"
                name="username"
                value={credential.username}
                onChange={handleInputChange}
                variant="standard"
                fullWidth
            />
            <br />
            <TextField
                InputLabelProps={{ shrink: true }}
                label="Password"
                type="password"
                name="password"
                value={credential.password}
                onChange={handleInputChange}
                variant="standard"
                fullWidth
            />
            <Button variant="contained" color="primary" size="small" onClick={login} sx={{ margin: 3 }}>
                {isLoginView ? "Login" : "Register"}
            </Button>
            <Typography sx={{ cursor: "pointer" }} onClick={() => dispatch(toggleMode())}>
                {isLoginView ? "Create new account?" : "Back to login"}
            </Typography>
        </Box>
    );
};
