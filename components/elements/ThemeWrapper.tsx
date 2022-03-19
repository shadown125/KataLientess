import {useContext} from "react";
import {ThemeContext} from "../context/themeContext";

type Props = {
    children: JSX.Element[] | JSX.Element,
}

const ThemeWrapper = ({ children }: Props) => {
    const {state: {theme}} = useContext(ThemeContext);

    return (
        <div className={`app ${theme === 'light' ? '' : 'is-dark'}`}>
            {children}
        </div>
    )
}

export default ThemeWrapper;