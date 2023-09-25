import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { App_Dispatch, App_Root_State } from "./store";

export const useAppSelector: TypedUseSelectorHook<App_Root_State> = useSelector;

export const useAppDispatch = ()=>useDispatch<App_Dispatch>()