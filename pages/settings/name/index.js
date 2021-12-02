import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment, useState} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";

function SettingsName() {
    const [enteredName, setEnteredName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    }

    const lastNameChangeHandler = (event) => {
        setEnteredLastName(event.target.value);
    }
    
    const submitHandler = (event) => {
        event.preventDefault();

        const nameData = {
            firstName: enteredName,
            LastName: enteredLastName,
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        }
        setEnteredName('');
        setEnteredLastName('');
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
                    <label htmlFor="first-name">Change first name:</label>
                    <input type="text" name="first-name" id="first-name" placeholder="Your new name" value={enteredName} onChange={nameChangeHandler}/>
                    <label htmlFor="last-name">Change last name:</label>
                    <input type="text" name="last-name" id="last-name" placeholder="Your new last name" value={enteredLastName} onChange={lastNameChangeHandler}/>
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

export default SettingsName;