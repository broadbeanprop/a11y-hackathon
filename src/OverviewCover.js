import { Link } from "react-router-dom";
import './OverviewCover.css';


function OverviewCover({ title, cover, releaseYear, genre, language, slug }) {
    return (
        <article className="overview-cover">
            <Link to={`/series/${slug}`} title={title}>
                <figure>
                    <img alt={title} src={cover}/>
                </figure>

                <header>
                    <h3>{title}</h3>
                </header>

                <aside>{releaseYear} • {genre}, {language}</aside>
            </Link>
        </article>
    )
}

export default OverviewCover;
