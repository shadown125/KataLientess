import HomePage from "../../index";
import FullActiveBackdrop from "../../../components/layout/FullActiveBackdrop";
import {Fragment, useRef} from "react";
import Link from "next/link";
import Profile from "../../../components/elements/Profile";

function SettingsImage() {
    const imageInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredImage = imageInputRef.current.value;

        const imageData = {
            image: enteredImage,
        }
        imageInputRef.current.value = '';
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
                    <label htmlFor="image">Change profile image:</label>
                    <input type="file" name="image" id="image" ref={imageInputRef} />
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

export default SettingsImage;