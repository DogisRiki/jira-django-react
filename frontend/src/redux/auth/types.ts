// ログインユーザー
export interface LoginUser {
    id: number;
    username: string;
}

// アバター画像アップロード
export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

// プロフィール
export interface Profile {
    id: number;
    user_profile: number;
    img: string | null;
}

// プロフィールポスト用
export interface PostProfile {
    id: number;
    img: File | null;
}

// ログイン情報
export interface Cred {
    username: string;
    password: string;
}

// JWTトークン
export interface Jwt {
    refresh: string;
    access: string;
}

// ユーザー情報
export interface User {
    id: number;
    username: string;
}

// Reduxで管理するステート
export interface AuthState {
    isLoginView: boolean; // ログインモード/新規登録モードの切り替え用フラグ
    loginUser: LoginUser;
    profiles: Profile[];
}
