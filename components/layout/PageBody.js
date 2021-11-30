function PageBody (props) {
    return (
        <main className="page-body">
            <div className="container">
                {props.children}
            </div>
        </main>
    )
}

export default PageBody;