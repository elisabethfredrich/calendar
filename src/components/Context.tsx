import { createContext } from "react";

export interface AppContext{
    month:Date,
    selected:Date,
    currentEvents: string[],
}

export const Context = createContext<AppContext>({
    month: new Date(),
    selected: new Date(),
    currentEvents: [],
});