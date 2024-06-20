import { AppDispatch } from "@/redux/store";
import { fetchAsyncCreateCategory, fetchAsyncCreateTask, fetchAsyncUpdateTask } from "@/redux/task/operations";
import { selectCategory, selectEditedTask, selectUsers } from "@/redux/task/selectors";
import { editTask, initialState, selectTask } from "@/redux/task/taskSlice";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import {
    Box,
    Button,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const TaskForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector(selectUsers);
    const category = useSelector(selectCategory);
    const editedTask = useSelector(selectEditedTask);
    const [isOpen, setIsOpen] = useState(false);
    const [inputCategoryText, setInputCategoryText] = useState("");

    // モーダルを開く
    const handleOpen = (): void => {
        setIsOpen(true);
    };

    // モーダルを閉じる
    const handleClose = (): void => {
        setIsOpen(false);
    };

    // タスク作成モーダルのSaveボタンを有効化にするかどうかを判断するためのフラグ
    const isDisabled =
        editedTask.task.length === 0 || editedTask.description.length === 0 || editedTask.criteria.length === 0;

    // カテゴリ作成モーダルのSaveボタンを有効化にするかどうかを判断するためのフラグ
    const isCategoryDisabled = inputCategoryText.length === 0;

    // カテゴリ作成モーダルの入力状態を保持
    const handleInputCategoryTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputCategoryText(e.target.value);
    };

    // タスク作成モーダルのテキストフィールド(task, description, criteria)の状態をdispatch
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let value: string | number = e.target.value;
        const name = e.target.name;
        if (name === "estimate") {
            value = Number(value);
        }
        dispatch(editTask({ ...editedTask, [name]: value }));
    };

    // タスク作成モーダルのresponsibleの状態をdispatch
    const handleSelectResponsibleChange = (e: SelectChangeEvent<number>): void => {
        const value = e.target.value as number;
        dispatch(editTask({ ...editedTask, responsible: value }));
    };

    // タスク作成モーダルのstatusの状態をdispatch
    const handleSelectStatusChange = (e: SelectChangeEvent<string>): void => {
        const value = e.target.value as string;
        dispatch(editTask({ ...editedTask, status: value }));
    };

    // タスク作成モーダルのcategoryの状態をdispatch
    const handleSelectCategoryChange = (e: SelectChangeEvent<number>): void => {
        const value = e.target.value as number;
        dispatch(editTask({ ...editedTask, category: value }));
    };

    // ユーザー一覧をリストで表示させる
    const userOptions = users.map((user) => (
        <MenuItem key={user.id} value={user.id}>
            {user.username}
        </MenuItem>
    ));

    // カテゴリー一覧をリストで表示させる
    const categoryOptions = category.map((cat) => (
        <MenuItem key={cat.id} value={cat.id}>
            {cat.item}
        </MenuItem>
    ));

    return (
        <div>
            {/* フォームタイトル */}
            <h2>{editedTask.id ? "Update Task" : "New Task"}</h2>
            {/* estimate入力フィールド */}
            <TextField
                sx={{ margin: 2, minWidth: 240 }}
                label="Estimate [days]"
                type="number"
                name="estimate"
                InputProps={{ inputProps: { min: 0, max: 1000 } }}
                InputLabelProps={{ shrink: true }}
                value={editedTask.estimate}
                onChange={handleInputChange}
                variant="standard"
            />
            {/* task入力フィールド */}
            <TextField
                sx={{ margin: 2, minWidth: 240 }}
                InputLabelProps={{ shrink: true }}
                label="Task"
                type="text"
                name="task"
                value={editedTask.task}
                onChange={handleInputChange}
                variant="standard"
            />
            <br />
            {/* description入力フィールド */}
            <TextField
                sx={{ margin: 2, minWidth: 240 }}
                InputLabelProps={{ shrink: true }}
                label="Description"
                type="text"
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                variant="standard"
            />
            {/* criteria入力フィールド */}
            <TextField
                sx={{ margin: 2, minWidth: 240 }}
                InputLabelProps={{ shrink: true }}
                label="Criteria"
                type="text"
                name="criteria"
                value={editedTask.criteria}
                onChange={handleInputChange}
                variant="standard"
            />
            <br />
            {/* responsible選択ドロップダウン */}
            <FormControl sx={{ margin: 2, minWidth: 240 }} variant="standard">
                <InputLabel>Responsible</InputLabel>
                <Select name="responsible" onChange={handleSelectResponsibleChange} value={editedTask.responsible}>
                    {userOptions}
                </Select>
            </FormControl>
            {/* status選択ドロップダウン */}
            <FormControl sx={{ margin: 2, minWidth: 240 }} variant="standard">
                <InputLabel>Status</InputLabel>
                <Select name="status" value={editedTask.status} onChange={handleSelectStatusChange}>
                    <MenuItem value={1}>Not started</MenuItem>
                    <MenuItem value={2}>On going</MenuItem>
                    <MenuItem value={3}>Done</MenuItem>
                </Select>
            </FormControl>
            <br />
            {/* category選択ドロップダウン */}
            <FormControl sx={{ margin: 2, minWidth: 240 }} variant="standard">
                <InputLabel>Category</InputLabel>
                <Select name="category" value={editedTask.category} onChange={handleSelectCategoryChange}>
                    {categoryOptions}
                </Select>
            </FormControl>
            {/* カテゴリ追加ボタン */}
            <Fab size="small" color="primary" onClick={handleOpen} sx={{ marginTop: 3, marginLeft: 2 }}>
                <AddIcon />
            </Fab>
            {/* カテゴリ作成モーダル */}
            <Modal open={isOpen} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        textAlign: "center",
                        width: 400,
                        backgroundColor: "background.paper",
                        boxShadow: 24,
                        padding: 4,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <TextField
                        sx={{ margin: 2, minWidth: 240 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="New category"
                        type="text"
                        value={inputCategoryText}
                        onChange={handleInputCategoryTextChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ marginTop: 4, marginLeft: 2 }}
                        startIcon={<SaveIcon />}
                        disabled={isCategoryDisabled}
                        onClick={() => {
                            dispatch(fetchAsyncCreateCategory(inputCategoryText));
                            handleClose();
                        }}
                    >
                        SAVE
                    </Button>
                </Box>
            </Modal>
            <br />
            {/* セーブor更新ボタン */}
            <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ margin: 3 }}
                startIcon={<SaveIcon />}
                disabled={isDisabled}
                onClick={
                    editedTask.id !== 0
                        ? () => dispatch(fetchAsyncUpdateTask(editedTask))
                        : () => dispatch(fetchAsyncCreateTask(editedTask))
                }
            >
                {editedTask.id !== 0 ? "Update" : "Save"}
            </Button>
            {/* キャンセルボタン */}
            <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={() => {
                    dispatch(editTask(initialState.editedTask));
                    dispatch(selectTask(initialState.selectedTask));
                }}
            >
                Cancel
            </Button>
        </div>
    );
};
