import './OverviewCategory.css';

function OverviewCategory({children, title}) {
    return (
        <section className="overview-category">
            <header className="overview-category__header">
                <h2 className="overview-category__title">{title}</h2>
            </header>
            {children}
        </section>
    )
}

export default OverviewCategory;
