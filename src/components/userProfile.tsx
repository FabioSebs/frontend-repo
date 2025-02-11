"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Alert, Button } from "@mui/material";
import { fetchUser } from "@/apis/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export const UserProfile = () => {
    const [user, setUser] = useState<{
        username: string;
        firstName: string;
        lastName: string;
        email: string;
    } | null>(null);
    const { email, token } = useSelector((state: RootState) => state.userReducer);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    if (!email || !token ) { 
        router.push("/register")
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetchUser(email as string, token as string);
                setUser(response.data);
            } catch (err) {
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" align="center" gutterBottom>
                User Profile
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography><strong>Username:</strong> {user?.username}</Typography>
                <Typography><strong>First Name:</strong> {user?.firstName}</Typography>
                <Typography><strong>Last Name:</strong> {user?.lastName}</Typography>
                <Typography><strong>Email:</strong> {user?.email}</Typography>
            </Box>
            <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 2 }} 
                onClick={() => router.push("/update")}
            >
                Update
            </Button>
        </Paper>
    );
};
