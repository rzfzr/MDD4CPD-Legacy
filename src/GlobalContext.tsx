import { createContext } from "react";

export const GlobalContext = createContext({
    model: {} as Object,
    setModel: (a: any) => { },
});