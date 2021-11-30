function PageBody (props) {
    return (
        <main>
            <div className="page-body">
                {props.children}
            </div>
        </main>
    )
}

export default PageBody;