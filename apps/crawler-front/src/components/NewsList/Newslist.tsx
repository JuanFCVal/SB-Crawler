import { INewsItem } from "../../types/news_types"
import NewsCard from "../NewsCard/NewsCard"

interface INewsListProps {
    news: INewsItem[]
    filter: (news: INewsItem[]) => INewsItem[]
}
const NewsList = ({ news, filter }: INewsListProps) => {
    return (
        <div className="flex flex-wrap">
            {filter(news)?.map((newsItem) => (
                <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                    <NewsCard newsItem={newsItem} />
                </div>
            ))}
        </div>

    )
}

export default NewsList