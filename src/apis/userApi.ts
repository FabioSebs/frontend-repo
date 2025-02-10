import axios from "axios";
import { User } from "../constants/user"

const base = process.env.NEXT_PUBLIC_BASE_API

export async function fetchUser(email: string, token: string) {
    try {
        const res = await axios.get(`${base}/v1/fetch-user-data/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        console.error("failed to fetch user :", error)
    }
}

export async function updateUser(email: string, token: string, user: Partial<User>) {
    try {
        const res = await axios.patch(`${base}/v1/update-user-data/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            ...user
        })
        return res.data
    } catch (error) {
        console.error("failed to fetch user :", error)
    }
}

export async function registerUser(user: Partial<User>) {
    try {
        const res = await axios.post(`${base}/v1/register`, user)
        return res.data
    } catch (error) {
        console.error("failed to create user :", error)
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const res = await axios.post(`${base}/v1/login`, {
            email,
            password
        })
        return res.data
    } catch (error) {
        console.error("failed to login user :", error)
    }
}