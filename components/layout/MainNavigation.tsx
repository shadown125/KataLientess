import Link from "next/link";
import Profile from "../elements/Profile";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";
import {useContext} from "react";
import DataPrivacy from "../elements/DataPrivacy";
import FullActiveBackdrop from "./FullActiveBackdrop";
import {BackgroundFilterContext} from "../context/backgroundFilterContext";
import Footer from "./Footer";

function MainNavigation(props: {currentMainNavigationState: boolean}) {
    const {state} = useContext(BackgroundFilterContext);
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
                    <Footer/>
                </nav>
            </aside>
            <DataPrivacy active={state} />
            {state ? <FullActiveBackdrop /> : ''}
        </>
    );
}

export default MainNavigation;