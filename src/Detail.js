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
            <Link className="detail__button-back" to='/'>
                <span>Back</span>
            </Link>

            <header className="detail__header">
                <h1 className="detail__title">{title.title}</h1>
            </header>

            <p className="detail__description">{title.description}</p>

            <div className="detail__background-image" style={{ backgroundImage: `url(${title.background})`}} />
        </Fragment>
    );
}

export default Detail;
