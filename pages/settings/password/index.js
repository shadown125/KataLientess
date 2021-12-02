import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment, useState} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";

function SettingsPassword() {
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredRepeatPassword, setEnteredRepeatPassword] = useState('');

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const repeatPasswordChangeHandler = (event) => {
        setEnteredRepeatPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const passwordData = {
            title: enteredPassword,
            description: enteredRepeatPassword,
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        }
        setEnteredPassword('');
        setEnteredRepeatPassword('');
    }

    return (
        <Fragment>
            <HomePage />
            <section className="settings">
                <Link href='/'>
                    <a className="button button--medium icon-cross" />
                </Link>
                <Profile />
                <form onSubmit={submitHandler}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="New password" value={enteredPassword} onChange={passwordChangeHandler}/>
                    <label htmlFor="repeat-password">Repeat new password:</label>
                    <input type="password" name="repeat-password" id="repeat-password" placeholder="Repeat new password" value={enteredRepeatPassword} onChange={repeatPasswordChangeHandler}/>
                    <div className="buttons-container">
                        <Link href="/settings">
                            <a className="button button-primary">Back</a>
                        </Link>
                        <button className="button button-primary" type="submit">Save</button>
                    </div>
                </form>
            </section>
            <FullActiveBackdrop />
        </Fragment>
    );
}

export default SettingsPassword;