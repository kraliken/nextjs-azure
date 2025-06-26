import axios from 'axios';
import { cookies } from 'next/headers'

const BASE_URL = process.env.BASE_URL

export async function getTodos(category = null, status = null) {

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const url = new URL(`${BASE_URL}/api/v1/todo/all`);

        if (category) url.searchParams.append("category", category);
        if (status) url.searchParams.append("status", status);

        console.log(url.toString());

        const response = await axios.get(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
        });

        return response.data;

    } catch (error) {
        console.error('Todo fetch error:', error);
        throw new Error('Failed to fetch todos');
    }
}

export async function getTodoStats() {

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.get(`${BASE_URL}/api/v1/todo/stats`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}` // Explicit cookie beállítás!
            },
        });

        const stats = response.data

        return stats;

    } catch (error) {
        console.error('Stats fetch error:', error);
        throw new Error('Failed to fetch stats');
    }

}