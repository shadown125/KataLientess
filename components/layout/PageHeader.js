import { useState } from "react";

function PageHeader (props) {
    const [ navigationIsOpen, setNavigationIsOpen ] = useState(true);

    function setOpenNavigation() {
        if (navigationIsOpen === false) {
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
                <a href="https://www.akalientess.com/" className="image-wrapper" target="_blank" rel="external noopener noreferrer">
                    <img src="/brandLogo.png" alt="Logo"/>
                </a>
                <h1 className="headline h1">KataLientesS</h1>
                <ul className="actions">
                    <li>
                        <button className="button button--big icon-configs" type="button">
                            <span>Options</span>
                        </button>
                    </li>
                </ul>
                <button className={`button button--medium icon-menu${!navigationIsOpen ? ' is-active' : ''}`} type="button" onClick={setOpenNavigation}>
                    <span>Menu</span>
                </button>
            </div>
        </header>
    )
}

export default PageHeader;