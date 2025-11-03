import type { RequestSigninDto } from "../types/auth.ts";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";     // 강의에서는 createContext, useContext, useState과 묶어서 import 했지만, ts에서 타입만 import 할 때는 'import type'으로 해주는 것이 좋음
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { postLogout, postSignin } from "../apis/auth";

// 5주차

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login:(signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;   

}

// ✅ Context 생성 시 타입 제네릭 적용
const AuthContext = createContext<AuthContextType | null>(null);   


export const AuthContextType : React.Context<AuthContextType> = createContext<AuthContextType>({
    accessToken: null, // accessToken이 있으면 로그인 되어 있는 상태임을 의미
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

// local storage에서 토큰을 가져오는 훅 선언
export const AuthProvider = ({children}: PropsWithChildren) => {

    // getItem: '~' -> '' 안에 이름 바꿔서 쓸 수 있음
    const { 
        getItem: getAccessTokenFromStorage, 
        setItem: setAccessTokenInStorage, 
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);


    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);


    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage()
    ); // getAccessTokenFromStorage()으로 함수 열어주면서 '지연 초기화'

    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage()
    );

    // 로그인 함수
    const login = async (signinData: RequestSigninDto) => {
        
        try {
            const {data} = await postSignin(signinData);
            
            if(data){
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken); 

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken); 
                alert("로그인에 성공했습니다.");
                window.location.href = "/my"; // 로그인 성공 시 마이페이지로 이동 (navigate 대신 사용)
            }            

        } catch (error) {
            console.log("로그인 오류", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");    
        }
    };


    // 로그아웃 함수
    const logout = async () => {
        try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);
            alert("로그아웃 되었습니다.");


        } catch (error) {
            console.log("로그아웃 오류", error);
            alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );


};

// useAuth를 통해 로그인 함수를 가져올 수 있음
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context;
}