import { Cred, Jwt, LoginUser, PostProfile, Profile, User } from "@/redux/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * ユーザーの認証情報を使用してJWTトークンを取得します
 * @param {Cred} auth - ユーザーの認証情報
 * @returns {Promise<Jwt>} JWTトークン
 */
export const fetchAsyncLogin = createAsyncThunk<Jwt, Cred>("auth/login", async (auth: Cred): Promise<Jwt> => {
    const res = await axios.post<Jwt>(`${import.meta.env.VITE_API_URL}authen/jwt/create/`, auth, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
});

/**
 * ユーザーを新規登録します
 * @param {Cred} auth - ユーザーの認証情報
 * @returns {Promise<User>} 新しく登録されたユーザー
 */
export const fetchAsyncRegister = createAsyncThunk<User, Cred>("auth/register", async (auth: Cred): Promise<User> => {
    const res = await axios.post<User>(`${import.meta.env.VITE_API_URL}api/create/`, auth, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
});

/**
 * ログインしているユーザーのプロファイルを取得します
 * @returns {Promise<LoginUser>} 現在ログインしているユーザーのプロファイル
 */
export const fetchAsyncGetLoginProfile = createAsyncThunk<LoginUser>("auth/loginuser", async (): Promise<LoginUser> => {
    const res = await axios.get<LoginUser>(`${import.meta.env.VITE_API_URL}api/loginuser/`, {
        headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

/**
 * プロファイルを新規作成します
 * @returns {Promise<Profile>} 新しく作成されたプロファイル
 */
export const fetchAsyncCreateProfile = createAsyncThunk<Profile>("auth/createProfile", async (): Promise<Profile> => {
    const res = await axios.post<Profile>(
        `${import.meta.env.VITE_API_URL}/api/create/`,
        { img: null },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        },
    );
    return res.data;
});

/**
 * すべてのプロファイルを取得します
 * @returns {Promise<Profile[]>} 取得されたプロファイルのリスト
 */
export const fetchAsyncGetProfiles = createAsyncThunk<Profile[]>("auth/getProfiles", async (): Promise<Profile[]> => {
    const res = await axios.get<Profile[]>(`${import.meta.env.VITE_API_URL}api/profile/`, {
        headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

/**
 * 指定されたプロファイルを更新します
 * @param {PostProfile} profile - 更新するプロファイルの情報
 * @returns {Promise<Profile>} 更新されたプロファイル
 */
export const fetchAsyncUpdateProfile = createAsyncThunk<Profile, PostProfile>(
    "auth/updateProfile",
    async (profile: PostProfile): Promise<Profile> => {
        const uploadData = new FormData();
        profile.img && uploadData.append("img", profile.img, profile.img.name);

        const res = await axios.put<Profile>(`${import.meta.env.VITE_API_URL}api/profile/${profile.id}/`, uploadData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });

        return res.data;
    },
);
