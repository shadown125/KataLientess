import { useState } from "react";
import Link from "next/link";

function PageHeader (props: {onSettingMainNavigationState: Function}) {
    const [ navigationIsOpen, setNavigationIsOpen ] = useState<boolean>(true);

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
                        <Link href="/settings">
                            <a className="button button--big icon-configs" type="button" />
                        </Link>
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