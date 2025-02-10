"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { loginUser } from "@/apis/userApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/reducers";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await loginUser(email, password)
            console.log(response)
            const { data, error } = response
            if (!error) {
                alert("login successful!")
                localStorage.setItem("token", data.token);
                dispatch(setUser({ email: email, token: data.token }));
                router.push("/")
            } else {
                alert("something went wrong!");
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, mx: "auto", mt: 5 }}
        >
            <Typography variant="h5" align="center">Login</Typography>

            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </Box>
    );
};
