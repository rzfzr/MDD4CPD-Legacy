import { createContext } from "react";

export const GlobalContext = createContext({
    model: '' as string,
    setModel: (a: any) => { },
});