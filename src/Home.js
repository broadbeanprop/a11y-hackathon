import { Fragment } from 'react';
import OverviewCategory from './OverviewCategory';
import OverviewCover from './OverviewCover';

import moviesData from './data/movies';
import seriesData from './data/series';
import './Home.css';

function createList(data) {
    return data.map((t, index) => {
        return (
            <li className="slider__item pull-left" key={index}>
                <OverviewCover {...t} key={index}/>
            </li>
        )
    });
}

const Movies = createList(moviesData);
const Series = createList(seriesData);

function Home() {
    return (
        <Fragment>
            <header className="visually-hidden">
                <h1>Home</h1>
            </header>

            <OverviewCategory title="Nieuw bij Videoland">
                <ul className="slider unlist">{Movies}</ul>
            </OverviewCategory>

            <OverviewCategory title="Bekroonde series">
                <ul className="slider unlist">{Series}</ul>
            </OverviewCategory>

        </Fragment>
    );
}

export default Home;
