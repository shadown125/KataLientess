import Link from "next/link";

function LoginPage () {
    /**
     * @returns {number}
     */
    function getFullYear() {
        return new Date().getFullYear();
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <main>
            <section className="intro-panel">
                <div className="container">
                    <h1 className="headline h2">Login</h1>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="login">Login:</label>
                        <input type="email" className="login-input" name="login" id="login" placeholder="E-Mail"/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password"/>
                        <div className="buttons-container">
                            <Link href="/register">
                                <a className="button button-primary">Register</a>
                            </Link>
                            <button className="button button-primary" type="submit">Login</button>
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
        </main>
    )
}

export default LoginPage;