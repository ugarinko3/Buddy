function ListSeason({season, index}) {
    return (
        <div className={`season-mini-info`} key={index}>
            <div className={`number-season`}>
                {season.numberSeason}
            </div>
            <div className={`period`}>
                <p>{season.startDate}</p>
                <p>-</p>
                <p>{season.endDate}</p>

            </div>
        </div>

    );
}

export default ListSeason;