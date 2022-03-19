import Link from "next/link";
import Profile from "../elements/Profile";
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";

function SettingPanel() {
    const router = useRouter();

    const logoutHandler = async () => {
        await router.push('/login');
        await signOut();
    }

    return (
        <section className="settings">
            <Link href='/'>
                <a className="button button--medium icon-cross" data-testid="close-popup">
                    <span>Close popup</span>
                </a>
            </Link>
            <Profile />
            <ul>
                <li>
                    <Link href='/settings/name' passHref>
                        <a className="link" data-testid="change-name">Change name</a>
                    </Link>
                </li>
                <li>
                    <Link href='/settings/password' passHref>
                        <a className="link" data-testid="change-password">Change password</a>
                    </Link>
                </li>
                <li>
                    <Link href='/settings/image' passHref>
                        <a className="link" data-testid="change-image">Change image</a>
                    </Link>
                </li>
                <li>
                    <Link href='/settings/delete-account' passHref>
                        <a className="link link-delete" data-testid="delete-account">Delete Account</a>
                    </Link>
                </li>
                <li>
                    <Link href='/login' passHref>
                        <button className="link" onClick={logoutHandler} data-testid="settings-logout">Logout</button>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default SettingPanel;