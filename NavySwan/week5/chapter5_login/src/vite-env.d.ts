/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDV_KEY: string; // readonly -> 바뀌지 않게
};

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
