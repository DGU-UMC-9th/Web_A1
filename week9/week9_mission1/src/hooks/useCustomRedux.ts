import { useDispatch as usedefaultDispatch, useSelector as useDefaultSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useDispatch:()=>AppDispatch = usedefaultDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;