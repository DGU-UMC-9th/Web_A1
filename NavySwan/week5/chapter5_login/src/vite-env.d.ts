/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDV_KEY: string; // readonly -> 바뀌지 않게 , 5주차 3강에는 이게 없음.
    readonly VITE_SERVER_API_URL: string;
    // 다른 환경 변수들에 대한 TYPE 정의...
};

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
