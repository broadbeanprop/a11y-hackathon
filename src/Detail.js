import {Fragment } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

import './Detail.css';

import moviesData from './data/movies';
import seriesData from './data/series';

//{ title, cover, background, slug, releaseYear, genre, description, language }

function Detail() {
    const params = useParams();
    const movie = moviesData.find(title => title.slug === params.slug);
    const serie = seriesData.find(title => title.slug === params.slug);
    const title = movie || serie;

    return (
        <Fragment>
            <Link className="detail__button-back has-click-region-xl gazing-click-region" to='/'>
                <span>Back</span>
            </Link>

            <div class="clear"></div>

            <img src={title.cover} alt={title.title} className="detail__cover" />

            <header className="detail__header">
                <h1 className="detail__title">{title.title}</h1>
            </header>

            <ul className="unlist inline">
                <li className="color--red">{title.releaseYear}</li>
                <li className="color--red">{title.genre}</li>
                <li className="color--red">{title.language}</li>
            </ul>

            <p className="detail__description">{title.description}</p>

            <a href="#" className="detail__play  has-click-region-m gazing-click-region">Afspelen</a>
            <a href="#" className="detail__add-to-list  has-click-region-m gazing-click-region">Toevoegen aan kijk lijst</a>

            <div className="detail__background-image" style={{ backgroundImage: `url(${title.background})`}} />
        </Fragment>
    );
}

export default Detail;
