import { Link } from "react-router-dom";
import './OverviewCover.css';


function OverviewCover({ title, cover, releaseYear, genre, language, slug }) {
    return (
        <article className="overview-cover">
            <Link to={`/series/${slug}`} title={title} className="gazing-click-region has-click-region">
                <figure>
                    <img alt={title} src={cover}/>
                </figure>

                <header>
                    <h3>{title}</h3>
                </header>

                <ul className="unlist inline labels">
                    <li>{releaseYear}</li>
                    <li>{genre}</li>
                    <li>{language}</li>
                </ul>
            </Link>
        </article>
    )
}

export default OverviewCover;
