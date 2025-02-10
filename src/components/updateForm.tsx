"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { fetchUser, updateUser } from "@/apis/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export const UpdateProfileForm = () => {
    const { email, token } = useSelector((state: RootState) => state.userReducer);
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetchUser(email as string, token as string);
                setFormData(response.data);
            } catch (err) {
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            await updateUser(email as string, token as string, formData);
            setSuccessMessage("Profile updated successfully!");
            router.push("/")
        } catch (err) {
            setError("Failed to update profile");
        }
    };

    if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Update Profile
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                />

                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                />

                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Save Changes
                </Button>

                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
        </Paper>
    );
};
