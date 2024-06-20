import { ReadTask } from "@/redux/task/types";

// ソートの種類を保持する
export interface SortState {
    rows: ReadTask[];
    order: "desc" | "asc";
    activeKey: string; // 有効になっているラベルのソーティング
}

// テーブルのカラム
export type TaskTableColumn = "task" | "status" | "category" | "estimate" | "responsible" | "owner";
