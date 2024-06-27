import { INewsItem } from "../../types/news_types"
import NewsCard from "../NewsCard/NewsCard"

interface INewsListProps {
    news: INewsItem[]
}
const NewsList = ({ news }: INewsListProps) => {
    return (
        <div className="flex flex-wrap">
            {news?.map((newsItem) => (
                <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                    <NewsCard newsItem={newsItem} />
                </div>
            ))}
        </div>

    )
}

export default NewsList