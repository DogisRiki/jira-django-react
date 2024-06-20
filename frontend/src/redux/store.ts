import authReducer from "@/redux/auth/authSlice";
import taskReducer from "@/redux/task/taskSlice";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
    },
});

// RootStateの型
export type RootState = ReturnType<typeof store.getState>;

// Thunkアクションの型
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// Reduxのディスパッチ関数の型
export type AppDispatch = typeof store.dispatch;
