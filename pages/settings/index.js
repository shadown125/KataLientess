import HomePage from "../index";
import SettingPanel from "../../components/Settings/SettingPanel";
import FullActiveBackdrop from "../../components/layout/FullActiveBackdrop";
import {Fragment} from "react";

function Settings() {
    return (
        <Fragment>
            <HomePage />
            <SettingPanel />
            <FullActiveBackdrop />
        </Fragment>
    );
}

export default Settings;