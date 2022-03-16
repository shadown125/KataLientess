import {createContext, useReducer, Dispatch} from "react";

type Props = {
    children: JSX.Element[] | JSX.Element,
}

export const themeActionTypes = {
    setThemeMode: 'setThemeMode',
}

type ReducerAction = {
    type: typeof themeActionTypes.setThemeMode,
    payload: {
        theme: typeof themeActionTypes.setThemeMode
    },
    theme: typeof themeActionTypes.setThemeMode,
}

const initialState = {
    theme: 'dark',
}

const themeReducer = (state: {theme: string}, action: ReducerAction) => {
    switch (action.type) {
        case themeActionTypes.setThemeMode: {
            return {...state, theme: action.payload.theme};
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const ThemeContext = createContext<{
    state: typeof initialState;
    dispatch: Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

export const ThemeContextProvider = (props: Props) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ThemeContext.Provider>
    )
}