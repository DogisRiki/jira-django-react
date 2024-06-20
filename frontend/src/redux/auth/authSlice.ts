import {
    fetchAsyncGetLoginProfile,
    fetchAsyncGetProfiles,
    fetchAsyncLogin,
    fetchAsyncUpdateProfile,
} from "@/redux/auth/operations";
import { AuthState, Jwt, LoginUser, Profile } from "@/redux/auth/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
    isLoginView: true,
    loginUser: {
        id: 0,
        username: "",
    },
    profiles: [{ id: 0, user_profile: 0, img: null }],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // ログインモードと新規登録モードの切り替え
        toggleMode(state) {
            state.isLoginView = !state.isLoginView;
        },
    },
    extraReducers: (builder) => {
        // ログインが成功したときの後処理
        builder.addCase(fetchAsyncLogin.fulfilled, (_, action: PayloadAction<Jwt>) => {
            localStorage.setItem("localJWT", action.payload.access);
            action.payload.access && (window.location.href = "/tasks");
        });
        // プロファイルの取得が成功したときの後処理
        builder.addCase(fetchAsyncGetLoginProfile.fulfilled, (state, action: PayloadAction<LoginUser>) => {
            return {
                ...state,
                loginUser: action.payload,
            };
        });
        // すべてのプロファイルの取得が成功したときの後処理
        builder.addCase(fetchAsyncGetProfiles.fulfilled, (state, action: PayloadAction<Profile[]>) => {
            return {
                ...state,
                profiles: action.payload,
            };
        });
        // プロファイルの更新が成功したときの後処理
        builder.addCase(fetchAsyncUpdateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
            return {
                ...state,
                profiles: state.profiles.map((prof) => (prof.id === action.payload.id ? action.payload : prof)),
            };
        });
    },
});

export const { toggleMode } = authSlice.actions;

export default authSlice.reducer;
