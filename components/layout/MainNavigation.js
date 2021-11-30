import Link from "next/link";

function MainNavigation(props) {

    function getFullYear() {
        return new Date().getFullYear();
    }

    return (
        <aside>
            <nav className={`main-navigation${props.currentMainNavigationState ? ' is-active' : ''}`}>
                <div className="profile">
                    <div className="image-wrapper">
                        <img src="dummyProfileImage.jpg" alt="Profile Image"/>
                    </div>
                    <div className="content">
                        <div>Dawid</div>
                        <div>Ol</div>
                    </div>
                </div>
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
                        <button className="link icon-link icon-configs" type="button">
                            <span>Settings</span>
                        </button>
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