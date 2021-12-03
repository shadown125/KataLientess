import Link from "next/link";
import {useRef} from 'react';

function Register() {
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const repeatPasswordInputRef = useRef();

    /**
     * @returns {number}
     */
    function getFullYear() {
        return new Date().getFullYear();
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredRepeatPassword = repeatPasswordInputRef.current.value;

        const userData = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmail,
            password: enteredPassword,
            repeatPassword: enteredRepeatPassword,
        }
        firstNameInputRef.current.value = '';
        lastNameInputRef.current.value = '';
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        repeatPasswordInputRef.current.value = '';
    }

    return (
        <section className="intro-panel register">
            <div className="container">
                <h1 className="headline h2">Login</h1>
                <form onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-half">
                            <label htmlFor="first-name">First name:*</label>
                            <input type="text" name="first-name" id="first-name" ref={firstNameInputRef} placeholder="Name"/>
                        </div>
                        <div className="col-half">
                            <label htmlFor="last-name">Last name:</label>
                            <input type="text" name="last-name" id="last-name" ref={lastNameInputRef} placeholder="Last name"/>
                        </div>
                    </div>
                    <label htmlFor="email">E-Mail:*</label>
                    <input type="email" name="email" id="email" ref={emailInputRef} placeholder="E-Mail"/>
                    <label htmlFor="password">Password:*</label>
                    <input type="password" name="password" id="password" ref={passwordInputRef} placeholder="Password"/>
                    <label htmlFor="repeat-password">Repeat password:*</label>
                    <input type="password" name="repeat-password" id="repeat-password" ref={repeatPasswordInputRef} placeholder="Repeat the entered password"/>
                    <div className="buttons-container">
                        <Link href="/login">
                            <a className="button button-primary">Back to login</a>
                        </Link>
                        <button className="button button-primary" type="submit">Submit</button>
                    </div>
                </form>
                <div className="footer">
                    <ul className="social-links">
                        <li>
                            <a href="https://github.com/shadown125" rel="external noopener noreferrer" target="_blank" className="link icon-link icon-github">
                                <span>Github</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/DawidOleksiuk" rel="external noopener noreferrer" target="_blank" className="link icon-link icon-twitter">
                                <span>Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/dawid-ol-2478311a4/" rel="external noopener noreferrer" target="_blank" className="link icon-link icon-linkedin">
                                <span>Linkedin</span>
                            </a>
                        </li>
                    </ul>
                    <div className="credits">&copy; {getFullYear()} All rights reserved by Dawid Oleksiuk</div>
                </div>
            </div>
        </section>
    );
}

export default Register;