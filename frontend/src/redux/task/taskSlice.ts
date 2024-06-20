import { User } from "@/redux/auth/types";
import {
    fetchAsyncCreateCategory,
    fetchAsyncCreateTask,
    fetchAsyncDeleteTask,
    fetchAsyncGetCategory,
    fetchAsyncGetTasks,
    fetchAsyncGetUsers,
    fetchAsyncUpdateTask,
} from "@/redux/task/operations";
import { Category, PostTask, ReadTask, TaskState } from "@/redux/task/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: TaskState = {
    tasks: [
        {
            id: 0,
            task: "",
            description: "",
            criteria: "",
            owner: 0,
            owner_username: "",
            responsible: 0,
            responsible_username: "",
            estimate: 0,
            category: 0,
            category_item: "",
            status: "",
            status_name: "",
            created_at: "",
            updated_at: "",
        },
    ],
    editedTask: {
        id: 0,
        task: "",
        description: "",
        criteria: "",
        responsible: 0,
        estimate: 0,
        category: 0,
        status: "",
    },
    selectedTask: {
        id: 0,
        task: "",
        description: "",
        criteria: "",
        owner: 0,
        owner_username: "",
        responsible: 0,
        responsible_username: "",
        estimate: 0,
        category: 0,
        category_item: "",
        status: "",
        status_name: "",
        created_at: "",
        updated_at: "",
    },
    users: [
        {
            id: 0,
            username: "",
        },
    ],
    category: [
        {
            id: 0,
            item: "",
        },
    ],
};

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // 編集中のタスクステートを更新する
        editTask(state, action: PayloadAction<PostTask>) {
            state.editedTask = action.payload;
        },
        // 選択中のタスクステートを更新する
        selectTask(state, action: PayloadAction<ReadTask>) {
            state.selectedTask = action.payload;
        },
    },
    extraReducers: (builder) => {
        // 全てのタスクの取得が成功したときの後処理
        builder.addCase(fetchAsyncGetTasks.fulfilled, (state, action: PayloadAction<ReadTask[]>) => {
            return {
                ...state,
                tasks: action.payload,
            };
        });
        // タスクの取得が失敗したときの後処理: JWTの有効期限が切れている場合なのでログイン画面へ遷移させる
        builder.addCase(fetchAsyncGetTasks.rejected, () => {
            window.location.href = "/";
        });
        // 全てのユーザーの取得が成功したときの後処理
        builder.addCase(fetchAsyncGetUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            return {
                ...state,
                users: action.payload,
            };
        });
        // 全てのカテゴリーの取得が成功したときの後処理
        builder.addCase(fetchAsyncGetCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
            return {
                ...state,
                category: action.payload,
            };
        });
        // カテゴリーの新規作成が成功したときの後処理
        builder.addCase(fetchAsyncCreateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
            return {
                ...state,
                category: [...state.category, action.payload],
            };
        });
        // カテゴリーの新規作成が失敗したときの後処理: JWTの有効期限が切れている場合なのでログイン画面へ遷移させる
        builder.addCase(fetchAsyncCreateCategory.rejected, () => {
            window.location.href = "/";
        });
        // タスクの新規作成が成功したときの後処理
        builder.addCase(fetchAsyncCreateTask.fulfilled, (state, action: PayloadAction<ReadTask>) => {
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                editedTask: initialState.editedTask,
            };
        });
        // タスクの新規作成が失敗したときの後処理: JWTの有効期限が切れている場合なのでログイン画面へ遷移させる
        builder.addCase(fetchAsyncCreateTask.rejected, () => {
            window.location.href = "/";
        });
        // タスクの更新が成功したときの後処理
        builder.addCase(fetchAsyncUpdateTask.fulfilled, (state, action: PayloadAction<ReadTask>) => {
            return {
                ...state,
                tasks: state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t)),
                editedTask: initialState.editedTask,
                selectedTask: initialState.selectedTask,
            };
        });
        // タスクの更新が失敗したときの後処理: JWTの有効期限が切れている場合なのでログイン画面へ遷移させる
        builder.addCase(fetchAsyncUpdateTask.rejected, () => {
            window.location.href = "/";
        });
        // タスクの削除が成功したときの後処理
        builder.addCase(fetchAsyncDeleteTask.fulfilled, (state, action: PayloadAction<number>) => {
            return {
                ...state,
                tasks: state.tasks.filter((t) => t.id !== action.payload),
                editedTask: initialState.editedTask,
                selectedTask: initialState.selectedTask,
            };
        });
        // タスクの削除が失敗したときの後処理: JWTの有効期限が切れている場合なのでログイン画面へ遷移させる
        builder.addCase(fetchAsyncDeleteTask.rejected, () => {
            window.location.href = "/";
        });
    },
});

export const { editTask, selectTask } = taskSlice.actions;

export default taskSlice.reducer;
