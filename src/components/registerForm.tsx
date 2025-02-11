"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { registerUser } from "@/apis/userApi";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await registerUser(formData);
            const { data, error } = response;
            if (!error) {
                alert("registration successful!");
                router.push("/login");
            } else {
                alert("something went wrong!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, mx: "auto", mt: 5 }}
        >
            <Typography variant="h5" align="center">Register</Typography>

            <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                required
            />

            <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                required
            />

            <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
                required
            />

            <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
            </Button>
            <Button type="button" variant="contained" color="secondary"
                onClick={() => { router.push("/login") }}
                fullWidth>
                Login
            </Button>
        </Box>
    );
};
