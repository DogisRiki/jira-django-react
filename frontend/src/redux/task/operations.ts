import { User } from "@/redux/auth/types";
import { Category, PostTask, ReadTask } from "@/redux/task/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * すべてのタスクを取得します
 * @returns {Promise<ReadTask[]>} 取得されたタスクのリスト
 */
export const fetchAsyncGetTasks = createAsyncThunk("task/getTask", async (): Promise<ReadTask[]> => {
    const res = await axios.get<ReadTask[]>(`${import.meta.env.VITE_API_URL}api/tasks/`, {
        headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

/**
 * すべてのユーザーを取得します
 * @returns {Promise<User[]>} 取得されたユーザーのリスト
 */
export const fetchAsyncGetUsers = createAsyncThunk("task/getUsers", async (): Promise<User[]> => {
    const res = await axios.get<User[]>(`${import.meta.env.VITE_API_URL}api/users/`, {
        headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

/**
 * すべてのカテゴリを取得します
 * @returns {Promise<Category[]>} 取得されたカテゴリのリスト
 */
export const fetchAsyncGetCategory = createAsyncThunk("task/getCategory", async (): Promise<Category[]> => {
    const res = await axios.get<Category[]>(`${import.meta.env.VITE_API_URL}api/category/`, {
        headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

/**
 * 新しいカテゴリを作成します
 * @param {string} item - 作成するカテゴリの名前
 * @returns {Promise<Category>} 作成されたカテゴリ
 */
export const fetchAsyncCreateCategory = createAsyncThunk(
    "task/createCategory",
    async (item: string): Promise<Category> => {
        const res = await axios.post<Category>(
            `${import.meta.env.VITE_API_URL}api/category/`,
            { item: item },
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            },
        );
        return res.data;
    },
);

/**
 * 新しいタスクを作成します
 * @param {PostTask} task - 作成するタスクの情報
 * @returns {Promise<ReadTask>} 作成されたタスク
 */
export const fetchAsyncCreateTask = createAsyncThunk("task/createTask", async (task: PostTask): Promise<ReadTask> => {
    const res = await axios.post<ReadTask>(`${import.meta.env.VITE_API_URL}api/tasks/`, task, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

/**
 * タスクを更新します
 * @param {PostTask} task - 更新するタスクの情報
 * @returns {Promise<ReadTask>} 更新されたタスク
 */
export const fetchAsyncUpdateTask = createAsyncThunk("task/updateTask", async (task: PostTask): Promise<ReadTask> => {
    const res = await axios.put<ReadTask>(`${import.meta.env.VITE_API_URL}api/tasks/${task.id}/`, task, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

/**
 * タスクを削除します
 * @param {number} id - 削除するタスクのID
 * @returns {Promise<number>} 削除されたタスクのID
 */
export const fetchAsyncDeleteTask = createAsyncThunk("task/deleteTask", async (id: number): Promise<number> => {
    await axios.delete(`${import.meta.env.VITE_API_URL}api/tasks/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return id;
});
