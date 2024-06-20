// Task.tsx
import { TaskDisplay } from "@/components/task/TaskDisplay";
import { TaskForm } from "@/components/task/TaskForm";
import { TaskList } from "@/components/task/TaskList";
import { fetchAsyncGetLoginProfile, fetchAsyncGetProfiles, fetchAsyncUpdateProfile } from "@/redux/auth/operations";
import { selectLoginUser, selectProfiles } from "@/redux/auth/selectors";
import { AppDispatch } from "@/redux/store";
import { fetchAsyncGetCategory, fetchAsyncGetTasks, fetchAsyncGetUsers } from "@/redux/task/operations";
import { selectEditedTask } from "@/redux/task/selectors";
import { Leaderboard } from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Avatar, Grid, IconButton } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Task: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const editedTask = useSelector(selectEditedTask);
    const loginUser = useSelector(selectLoginUser);
    const loginProfile = useSelector(selectProfiles).filter((prof) => prof.user_profile === loginUser.id)[0];
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ログアウトする関数
    const logOut = (): void => {
        localStorage.removeItem("localJWT");
        navigate("/");
    };

    // プロフィール画像を保持する関数
    const handlerEditPicture = (): void => {
        fileInputRef.current?.click();
    };

    // プロフィール画像を更新する関数
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files[0]) {
            dispatch(
                fetchAsyncUpdateProfile({
                    id: loginProfile.id,
                    img: event.target.files[0],
                }),
            );
        }
    };

    // タスクデータ初期表示
    useEffect(() => {
        const fetchBootLoader = async () => {
            await dispatch(fetchAsyncGetTasks());
            await dispatch(fetchAsyncGetLoginProfile());
            await dispatch(fetchAsyncGetUsers());
            await dispatch(fetchAsyncGetCategory());
            await dispatch(fetchAsyncGetProfiles());
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <div
            style={{
                textAlign: "center",
                backgroundColor: "white",
                color: "dimgray",
                fontFamily: "serif",
                margin: 25,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Grid container>
                <Grid item xs={4}>
                    <Leaderboard sx={{ marginTop: 3, cursor: "pointer" }} />
                </Grid>
                <Grid item xs={4}>
                    <h1>Scrum Task Board</h1>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                        <IconButton
                            onClick={logOut}
                            style={{ backgroundColor: "transparent", color: "dimgray", marginTop: 4 }}
                        >
                            <ExitToAppIcon fontSize="large" />
                        </IconButton>
                        <input type="file" id="imageInput" ref={fileInputRef} hidden onChange={handleFileChange} />
                        <IconButton
                            onClick={handlerEditPicture}
                            style={{ backgroundColor: "transparent", paddingTop: 3 }}
                        >
                            <Avatar alt="avatar" src={loginProfile?.img || undefined} />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TaskList />
                </Grid>
                <Grid item xs={6}>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: "80vh" }}
                    >
                        <Grid item>{editedTask.status ? <TaskForm /> : <TaskDisplay />}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
