import NewsCard from "../NewsCard/NewsCard"

const NewsList = () => {
    const news = [1, 2, 3, 4, 5, 6]
    return (
        <div className="flex flex-wrap">
            {news.map(() => (
                <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                    <NewsCard />
                </div>
            ))}
        </div>

    )
}

export default NewsList