import {createContext, Dispatch, FC, useState} from "react";

const initialState: boolean = false;

export const BackgroundFilterContext = createContext<{
    state: boolean;
    setState: Dispatch<any>;
}>({
    state: initialState,
    setState: () => null
});

export const BackgroundFilterContextProvider: FC = ({ children }) => {
    const [state, setState] = useState(initialState);

    return (
        <BackgroundFilterContext.Provider value={{state, setState}}>
            {children}
        </BackgroundFilterContext.Provider>
    )
}