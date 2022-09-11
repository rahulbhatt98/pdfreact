

const authChangeEvent = global.window ? new Event('auth_change') : null;

export interface IUserInfo {
    id: string;
    username?: string;
    email: string;
   
}
export default class Auth {
    static authToken: string | null;
    static userInfo: IUserInfo | null;
    static isAuthenticated: boolean | null ;
    static getAuthToken() {
        if (global.window && authChangeEvent) {
            if (Auth.authToken) {
                return Auth.authToken;
            }
            Auth.authToken = localStorage.getItem('authBearer');
            return Auth.authToken;
        }
    }

    static logout() {
        if (global.window && authChangeEvent) {
            localStorage.removeItem('authBearer');
            // Dispatch logout to auth change listeners
            Auth.authToken = null;
            Auth.userInfo = null;
            Auth.isAuthenticated=false;
            window.dispatchEvent(authChangeEvent);
        }
    }

    static login(token: string) {
        if (global.window && authChangeEvent) {
            localStorage.setItem('user', token);
            Auth.authToken = token;
            Auth.isAuthenticated=true;
            // Dispatch login to auth change listeners
            window.dispatchEvent(authChangeEvent);
        }
    }

    // Fetch user information
   
}

if (global.window) {
    (window as any).Auth = Auth;
}
