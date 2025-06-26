'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL

export async function signInAction(prevState, formData) {

    const raw = Object.fromEntries(formData);
    const username = formData.get('username');
    const password = formData.get('password');


    // Validáció
    const errors = {};
    if (!username || username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }
    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: 'Please fix the errors below',
            errors,
            data: { username, password } // Ne küldd vissza a jelszót!
        };
    }

    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            // withCredentials: true,
        });

        const { access_token, token_type, user } = response.data;

        const cookieStore = await cookies();

        cookieStore.set('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        cookieStore.set('user_data', JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });


    } catch (error) {
        console.log('Login Failed:', error);
        return {
            success: false,
            message: 'Invalid username or password',
            errors: {},
            data: raw
        };
    }

    redirect('/');

}

export async function signout() {

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const user = cookieStore.get("user_data");

    if (token) {
        cookieStore.set("access_token", "", { maxAge: -1, path: "/" });
        if (user) {
            cookieStore.set("user_data", "", { maxAge: -1, path: "/" });
        }
    }

    redirect("/sign-in");
}

export async function getCurrentUser() {

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    try {
        const response = await axios.get(`${BASE_URL}/auth/me`, {
            headers: {
                Cookie: `access_token=${token}`,
            }
        });

        return { user: response.data }
    } catch (error) {

        console.error('Current user fetch error:', error);
        throw new Error('Failed to fetch current user');

    }
}