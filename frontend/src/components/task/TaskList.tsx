import { editTaskInitialValue, taskTableColumnValue } from "@/common/constants";
import { SortState } from "@/components/task/types";
import { selectLoginUser, selectProfiles } from "@/redux/auth/selectors";
import { AppDispatch } from "@/redux/store";
import { fetchAsyncDeleteTask } from "@/redux/task/operations";
import { selectTasks } from "@/redux/task/selectors";
import { editTask, initialState, selectTask } from "@/redux/task/taskSlice";
import { ReadTask } from "@/redux/task/types";
import { AddCircleOutlineOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Avatar, Badge, Button, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const TaskList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const loginUser = useSelector(selectLoginUser);
    const profiles = useSelector(selectProfiles);
    const tableColumns = tasks[0] && (Object.keys(tasks[0]) as (keyof ReadTask)[]);
    const [sortState, setSortState] = useState<SortState>({
        rows: tasks,
        order: "desc",
        activeKey: "",
    });

    // テーブルをソートする関数
    const handleClickSortColumn = (column: keyof ReadTask): void => {
        const isDesc = column === sortState.activeKey && sortState.order === "desc";
        const newOrder = isDesc ? "asc" : "desc";
        const sortedRows = Array.from(sortState.rows).sort((a, b) => {
            if (a[column] > b[column]) {
                return newOrder === "asc" ? 1 : -1;
            } else if (a[column] < b[column]) {
                return newOrder === "asc" ? -1 : 1;
            } else {
                return 0;
            }
        });
        setSortState({
            rows: sortedRows,
            order: newOrder,
            activeKey: column,
        });
    };

    // Reduxで管理しているタスクデータに変化があった際にローカルのステートも更新
    useEffect(() => {
        setSortState((state) => ({
            ...state,
            rows: tasks,
        }));
    }, [tasks]);

    // タスクのステータスに応じたバッジを付与する関数
    const renderBudge = (statusName: string): JSX.Element | null => {
        switch (statusName) {
            case "Not started":
                return (
                    <Badge variant="dot" color="error">
                        {statusName}
                    </Badge>
                );
            case "On going":
                return (
                    <Badge variant="dot" color="primary">
                        {statusName}
                    </Badge>
                );
            case "Done":
                return (
                    <Badge variant="dot" color="secondary">
                        {statusName}
                    </Badge>
                );
            default:
                return null;
        }
    };

    // ユーザーIDからテーブル内に描画するアバター画像を取得する関数
    const getAvatarImage = (userId: number): string | undefined => {
        const loginProfile = profiles.filter((prof) => prof.user_profile == userId)[0];
        return loginProfile?.img !== null ? loginProfile?.img : undefined;
    };
    return (
        <>
            <Button
                sx={{ margin: 3 }}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddCircleOutlineOutlined />}
                onClick={() => {
                    dispatch(editTask(editTaskInitialValue(loginUser.id)));
                    dispatch(selectTask(initialState.selectedTask));
                }}
            >
                Add new
            </Button>
            {tasks[0]?.task && (
                <Table size="small" sx={{ tableLayout: "fixed" }}>
                    {/* テーブルヘッダー */}
                    <TableHead>
                        <TableRow>
                            {tableColumns.map((column, columnIndex) => {
                                if (taskTableColumnValue.includes(column)) {
                                    return (
                                        <TableCell align="center" key={columnIndex}>
                                            <TableSortLabel
                                                active={sortState.activeKey === column}
                                                direction={sortState.order}
                                                onClick={() => handleClickSortColumn(column)}
                                            >
                                                <strong>{column}</strong>
                                            </TableSortLabel>
                                        </TableCell>
                                    );
                                }
                                return null;
                            })}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {/* テーブルボディ */}
                    <TableBody>
                        {sortState.rows.map((row, rowIndex) => (
                            <TableRow hover key={rowIndex}>
                                {Object.keys(row).map(
                                    (key, colmunIndex) =>
                                        (key === "task" ||
                                            key === "status_name" ||
                                            key === "category_item" ||
                                            key === "estimate") && (
                                            <TableCell
                                                align="center"
                                                sx={{ cursor: "pointer" }}
                                                key={`${rowIndex}+${colmunIndex}`}
                                                onClick={() => {
                                                    dispatch(selectTask(row));
                                                    dispatch(editTask(initialState.editedTask));
                                                }}
                                            >
                                                {key === "status_name" ? (
                                                    renderBudge(row[key])
                                                ) : (
                                                    <span>{row[key]}</span>
                                                )}
                                            </TableCell>
                                        ),
                                )}
                                {/* responsibleに描画するアバター画像 */}
                                <TableCell>
                                    <Avatar
                                        sx={{ margin: "auto", width: 24, height: 24 }}
                                        alt="resp"
                                        src={getAvatarImage(row["responsible"])}
                                    />
                                </TableCell>
                                {/* onwerに描画するアバター画像 */}
                                <TableCell>
                                    <Avatar
                                        sx={{ margin: "auto", width: 24, height: 24 }}
                                        alt="owner"
                                        src={getAvatarImage(row["owner"])}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    {/* 削除アイコン */}
                                    <Button
                                        sx={{
                                            cursor: "pointer",
                                            backgroundColor: "transparent",
                                            border: "none",
                                            outline: "none",
                                            fontSize: 20,
                                            marginTop: 1,
                                            color: "dimgray",
                                        }}
                                        onClick={() => {
                                            dispatch(fetchAsyncDeleteTask(row.id));
                                        }}
                                        disabled={row["owner"] !== loginUser.id}
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                    {/* 編集アイコン */}
                                    <Button
                                        sx={{
                                            cursor: "pointer",
                                            backgroundColor: "transparent",
                                            border: "none",
                                            outline: "none",
                                            fontSize: 20,
                                            marginTop: 1,
                                            color: "dimgray",
                                        }}
                                        onClick={() => dispatch(editTask(row))}
                                        disabled={row["owner"] !== loginUser.id}
                                    >
                                        <EditOutlined />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
};
