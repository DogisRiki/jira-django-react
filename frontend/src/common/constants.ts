// タスク新規作成時の初期値
export const editTaskInitialValue = (loginUserId: number) => {
    return {
        id: 0,
        task: "",
        description: "",
        criteria: "",
        responsible: loginUserId,
        status: "1",
        category: 1,
        estimate: 0,
    };
};

// タスクのテーブルカラム
export const taskTableColumnValue = ["task", "status", "category", "estimate", "responsible", "owner"];
