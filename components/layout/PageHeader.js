function PageHeader () {
    return (
        <header className="page-header">
            <div className="container">
                <div className="image-wrapper">
                    <img src="brandLogo.png" alt="Logo"/>
                </div>
                <h1 className="headline h1">KataLientesS</h1>
                <ul className="actions">
                    <li>
                        <button className="button button--big icon-configs" type="button">
                            <span>Options</span>
                        </button>
                    </li>
                </ul>
                <button className="button button--medium icon-menu" type="button">
                    <span>Menu</span>
                </button>
            </div>
        </header>
    )
}

export default PageHeader;