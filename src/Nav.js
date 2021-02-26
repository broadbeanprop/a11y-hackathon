function Nav() {
    return (
        <nav>
            <img className="logo" src="https://dev.videoland.com:8081/static/images/vl-logo.svg" alt="Videoland" />

            <ul className="pull-right inline-list unlist">
                <li>
                    <span className="icon icon-search">
                        <span className="visually-hidden">Zoeken</span>
                    </span>
                </li>

                <li>
                    <span className="icon icon-list">
                        <span className="visually-hidden">Mijn kijklijst</span>
                    </span>
                </li>

                <li>
                    <span className="icon icon-account">
                        <span className="visually-hidden">Account</span>
                    </span>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
