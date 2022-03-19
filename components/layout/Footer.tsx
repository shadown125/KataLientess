import {Year} from "../elements/Year";
import {useContext} from "react";
import {BackgroundFilterContext} from "../context/backgroundFilterContext";

const Footer = () => {
    const {state, setState} = useContext(BackgroundFilterContext);

    const openPrivacyPopup = () => {
        if (!state) {
            setState(true);

            return;
        }

        setState(false);

        return;
    }

    return (
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
            <div className="credits">&copy; {Year()} All rights reserved by Dawid Oleksiuk</div>
            <ul className="meta-nav">
                <li>
                    <button className="link" onClick={openPrivacyPopup}>Privacy Policy</button>
                </li>
            </ul>
        </div>
    )
}

export default Footer;