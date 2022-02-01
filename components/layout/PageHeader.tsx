import {useState} from "react";
import Link from "next/link";

function PageHeader (props: {onSettingMainNavigationState: Function, onSettingModeState: Function, currentModeState: string}) {
    const currentState = props.onSettingModeState;
    const [ modeState, setModeState ] = useState<string>(props.currentModeState);
    const [ navigationIsOpen, setNavigationIsOpen ] = useState<boolean>(true);

    const modeSwitcher = () => {
        if (modeState !== 'light') {
            setModeState('light');
            props.onSettingModeState('light');
            return;
        }

        setModeState('dark');
        props.onSettingModeState('dark');
    }

    function setOpenNavigation() {
        if (!navigationIsOpen) {
            setNavigationIsOpen(true);
            props.onSettingMainNavigationState(navigationIsOpen);
            return
        }
        setNavigationIsOpen(false);

        props.onSettingMainNavigationState(navigationIsOpen);
    }

    return (
        <header className="page-header">
            <div className="container">
                <a href="https://www.akalientess.com/" className="image-wrapper" target="_blank" rel="external noopener noreferrer" data-testid="portfolio-website-link">
                    <img src="/brandLogo.png" alt="Logo" data-testid="brand-logo"/>
                </a>
                <h1 className="headline h1">KataLientesS</h1>
                <ul className="actions">
                    <li>
                        <button className={`button button--big${modeState === 'dark' ? ' icon-moon' : ' icon-light-up'}`} type="button" onClick={modeSwitcher}>
                            <span>Dark mode</span>
                        </button>
                    </li>
                    <li>
                        <Link href="/settings">
                            <a className="button button--big icon-configs" type="button" />
                        </Link>
                    </li>
                </ul>
                <ul className="actions-mobile">
                    <li>
                        <button className={`button button--medium${modeState === 'dark' ? ' icon-moon' : ' icon-light-up'}`} type="button" onClick={modeSwitcher}>
                            <span>Dark mode</span>
                        </button>
                    </li>
                    <li>
                        <button className={`button button--medium icon-menu${!navigationIsOpen ? ' is-active' : ''}`} type="button" onClick={setOpenNavigation}>
                            <span>Menu</span>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default PageHeader;