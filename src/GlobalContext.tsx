import { createContext } from "react";

export const GlobalContext = createContext({
    model: {} as object,
    setModel: (a: any) => { },
});