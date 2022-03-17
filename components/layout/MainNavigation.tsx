import Link from "next/link";
import Profile from "../elements/Profile";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";
import {Year} from "../elements/Year";
import {useState} from "react";
import DataPrivacy from "../elements/DataPrivacy";

function MainNavigation(props: {currentMainNavigationState: boolean}) {
    const [privacyPopupActive, setPrivacyPopupActive] = useState<boolean>(false);
    const router = useRouter();
    const navLinks = [
        {
            title: 'Today',
            path: '/',
            icon: 'icon-note',
        },
        {
            title: 'Done todos',
            path: '/done-todos',
            icon: 'icon-note-checked'
        },
        {
            title: 'Settings',
            path: '/settings',
            icon: 'icon-configs',
        }
    ]

    const logoutHandler = async () => {
        await router.push('/login');
        await signOut();
    }

    const openPrivacyPopup = () => {
        if (!privacyPopupActive) {
            setPrivacyPopupActive(true);

            return;
        }

        setPrivacyPopupActive(false);

        return;
    }

    const removePrivacyPopup = () => {
        setPrivacyPopupActive(false);
    }

    return (
        <>
            <aside className={`nav-aside${props.currentMainNavigationState ? ' is-active' : ''}`}>
                <nav className="main-navigation">
                    <Profile />
                    <ul className="actions">
                        {navLinks.map((item, index) => (
                            <li key={index}>
                                <Link href={item.path}>
                                    <a className={`link icon-link ${item.icon}${router.pathname === item.path ? ' is-active' : ''}`}>
                                        <span>{item.title}</span>
                                    </a>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button className="link icon-link icon-logout" onClick={logoutHandler}>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                    <div className="footer">
                        <div className="credits">&copy; {Year()} All rights reserved by Dawid Oleksiuk</div>
                        <ul className="legals">
                            <li>
                                <button className="link" onClick={openPrivacyPopup}>Privacy Policy</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
            <DataPrivacy active={privacyPopupActive} onRemovingActive={removePrivacyPopup} />
        </>
    );
}

export default MainNavigation;