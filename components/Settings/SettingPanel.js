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
                <a className="button button--medium icon-cross" />
            </Link>
            <Profile />
            <ul>
                <li>
                    <Link href='/settings/name'>
                        <a className="link">Change name</a>
                    </Link>
                </li>
                <li>
                    <Link href='/settings/password'>
                        <a className="link">Change password</a>
                    </Link>
                </li>
                <li>
                    <Link href='/settings/image'>
                        <a className="link">Change image</a>
                    </Link>
                </li>
                <li>
                    <Link href='/login'>
                        <button className="link" onClick={logoutHandler}>Logout</button>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default SettingPanel;