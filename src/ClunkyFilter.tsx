
export default function ClunkyFilter({
    filter,
    setFilter,
    moreWordsFilter,
    setMoreWordsFilter,
}: {
    filter: string,
    setFilter: (filter: string) => void,
    moreWordsFilter: boolean,
    setMoreWordsFilter: (value: boolean) => void
}) {
    return (
        <div id="filter-container">
            <div className="filter-buttons">
                <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
                <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>Active</button>
                <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
            </div>
            <div className="filter-buttons">
                <button
                    onClick={() => setMoreWordsFilter(!moreWordsFilter)}
                    className={moreWordsFilter ? "active" : ""}
                >
                    More than one word: {moreWordsFilter ? "ON" : "OFF"}
                </button>
            </div>
        </div>
    );
}
