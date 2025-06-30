"use server"

import axios from 'axios';
import { cookies } from 'next/headers'
import { todoFormSchema } from '../validators';
import { revalidatePath } from 'next/cache';

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

export async function createTodo(prevState, formData) {

    const rawFormData = Object.fromEntries(formData);

    if (rawFormData.deadline === "") {
        rawFormData.deadline = null;
    }

    const result = todoFormSchema.safeParse(rawFormData);

    if (!result.success) {

        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors, data: rawFormData };
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.post(`${BASE_URL}/api/v1/todo/create`, rawFormData, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}` // Explicit cookie beállítás!
            },
            withCredentials: true
        });

        return {
            success: true,
            message: 'Todo successfully created!',
            errors: {},
            data: {}
        };

    } catch (error) {
        console.error('Todo creation failed:', error);
        return {
            success: false,
            message: 'Failed to create todo',
            errors: {},
            data: rawFormData
        };
    }

}

export async function updateTodo(prevState, todoId, formData) {

    const rawFormData = Object.fromEntries(formData);

    if (rawFormData.deadline === "") {
        rawFormData.deadline = null;
    }

    const result = todoFormSchema.safeParse(rawFormData);

    if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        return { success: false, errors: fieldErrors, data: rawFormData };
    }

    try {

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        await axios.patch(`${BASE_URL}/api/v1/todo/${todoId}`, rawFormData, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            withCredentials: true
        });

        return {
            success: true,
            message: 'Todo successfully updated!',
            errors: {},
            data: {}
        };

    } catch (error) {
        console.error('Todo update failed:', error);
        return {
            success: false,
            message: 'Failed to update todo',
            errors: {},
            data: rawFormData
        };
    }
}

export async function deleteTodo(todoId) {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            throw new Error('No token – the user is not logged in.');
        }

        const response = await axios.delete(`${BASE_URL}/api/v1/todo/${todoId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${token}`
            },
            withCredentials: true
        });

        revalidatePath('/todos/personal')

        return {
            success: true,
            message: 'Todo successfully deleted!'
        };

    } catch (error) {
        console.error('Todo deletion failed:', error);
        if (error.response?.status === 401) {
            return {
                success: false,
                message: 'Session expired, please log in again'
            };
        }

        if (error.response?.status === 404) {
            return {
                success: false,
                message: 'Todo not found'
            };
        }

        return {
            success: false,
            message: 'Failed to delete todo'
        };
    }

}

