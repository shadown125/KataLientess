import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment, useRef} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";

function SettingsName() {
    const nameRef = useRef();
    const lastNameRef = useRef();
    
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredLastName = lastNameRef.current.value;

        const nameData = {
            firstName: enteredName,
            LastName: enteredLastName,
            id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
        }
        nameRef.current.value = '';
        lastNameRef.current.value = '';
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
                    <input type="text" name="first-name" id="first-name" placeholder="Your new name" ref={nameRef}/>
                    <label htmlFor="last-name">Change last name:</label>
                    <input type="text" name="last-name" id="last-name" placeholder="Your new last name" ref={lastNameRef}/>
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