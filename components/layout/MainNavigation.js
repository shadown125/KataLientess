import Link from "next/link";
import Profile from "../elements/Profile";

function MainNavigation(props) {

    function getFullYear() {
        return new Date().getFullYear();
    }

    return (
        <aside className={`nav-aside${props.currentMainNavigationState ? ' is-active' : ''}`}>
            <nav className="main-navigation">
                <Profile />
                <ul className="actions">
                    <li>
                        <Link href="/">
                            <a className="link icon-link icon-note">
                                <span>Today</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/done-todos">
                            <a className="link icon-link icon-note-checked">
                                <span>Done Todos</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings">
                            <a className="link icon-link icon-configs">
                                <span>Settings</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <button className="link icon-link icon-logout" type="button">
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
                <div className="credits">&copy; {getFullYear()} All rights reserved by Dawid Oleksiuk</div>
            </nav>
        </aside>
    );
}

export default MainNavigation;