'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios from 'axios';
import { signInFormSchema } from '../validators';
import * as z from "zod/v4";

const BASE_URL = process.env.BASE_URL

export async function signInAction(prevState, formData) {

    const raw = Object.fromEntries(formData);

    const result = signInFormSchema.safeParse(raw);

    if (!result.success) {

        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors, data: raw };
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

        let message = 'Unknown error occurred';

        if (axios.isAxiosError(error)) {
            console.log(axios.isAxiosError(error));
            console.log(error.response);
            if (error.response) {
                // A szerver válaszolt, pl. 401 vagy 503
                if (error.response.status === 401) {
                    message = 'Invalid username or password';
                } else if (error.response.status === 503) {
                    message = 'Server is waking up. Please try again in a few seconds.';
                } else {
                    message = error.response.data?.detail || 'Unexpected server error';
                }
            } else {
                // A kérés nem jutott el a szerverig
                message = 'Could not connect to the server. Please check your connection or try again later.';
            }
        } else {
            message = 'An unknown error occurred.';
        }

        return {
            success: false,
            message,
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