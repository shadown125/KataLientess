const Notification = (props: {successMessage: string}) => {
    return (
        <div className={`notification is-active`}>
            <span>{props.successMessage}</span>
        </div>
    );
}

export default Notification;