import {createGlobalStyle} from "styled-components";
import {DarkTheme} from "./darkTheme";
import {LightTheme} from "./lightTheme";

export const GlobalTheme = createGlobalStyle<DarkTheme | LightTheme>`
    :root {
        --background-color: ${props => (props.theme.backgroundColor)};
        --main-navigation-background-color: ${props => (props.theme.mainNavigationBackgroundColor)};
        --main-background-color: ${props => (props.theme.mainBackgroundColor)};
        --page-header-color: ${props => (props.theme.pageHeaderColor)};
        --page-header-background-color: ${props => (props.theme.pageHeaderBackgroundColor)};
        --progression-bar-background-color: ${props => (props.theme.progressionBarBackgroundColor)};
        --progression-bar-progressed-bar: ${props => (props.theme.progressionBarProgressedBar)};
        --page-body-color: ${props => (props.theme.pageBodyColor)};
        --todos-background-color: ${props => (props.theme.todosBackgroundColor)};
        --button-background-color: ${props => (props.theme.buttonBackgroundColor)};
        --button-before-color: ${props => (props.theme.buttonBeforeColor)};
    }
`;