import { User } from "@/redux/auth/types";

// タスク情報
export interface ReadTask {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    status_name: string;
    category: number;
    category_item: string;
    estimate: number;
    responsible: number;
    responsible_username: string;
    owner: number;
    owner_username: string;
    created_at: string;
    updated_at: string;
}

// タスク作成
export interface PostTask {
    id: number;
    task: string;
    description: string;
    criteria: string;
    status: string;
    category: number;
    estimate: number;
    responsible: number;
}

// カテゴリ
export interface Category {
    id: number;
    item: string;
}

// ステートで管理するタスク情報
export interface TaskState {
    tasks: ReadTask[];
    editedTask: PostTask; // 編集中のタスクデータを保持
    selectedTask: ReadTask; // タスク一覧から選択したタスクデータを保持
    users: User[];
    category: Category[];
}
