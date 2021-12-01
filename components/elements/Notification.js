function Notification(props) {
    console.log(props.successMessage)

    return (
        <div className={`notification${props.successMessage ? ' is-active' : ''}`}>
            <span>Your new Todo was added successfully</span>
        </div>
    );
}

export default Notification;