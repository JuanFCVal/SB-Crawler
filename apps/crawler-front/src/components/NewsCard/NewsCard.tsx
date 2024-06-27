import { MessageCircle, ThumbsUp } from 'lucide-react'
import { INewsItem } from '../../types/news_types'

interface INewsCardProps {
    newsItem: INewsItem
}
const NewsCard = ({ newsItem }: INewsCardProps) => {
    return (
        <div className="w-full h-full p-4 bg-slate-200/65 rounded-md my-2 transition-transform duration-500 transform hover:scale-105 cursor-pointer">
            <h2 className="lg:text-xl md:text-lg line-clamp-2 font-semibold min-h-fit">{newsItem?.rank}. {newsItem?.title}</h2>
            <div className='flex justify-end text-gray-600 mt-2 items-end'>
                <div className='hover:text-blue-500 hover:font-medium flex cursor-pointer'>
                    {newsItem?.comments} comments
                    <MessageCircle className='mx-2' />
                </div>
                <div className='hover:text-blue-500 hover:font-medium flex cursor-pointer'>
                    {newsItem?.points} points
                    <ThumbsUp className='mx-2' />
                </div>
            </div>
        </div>
    )
}

export default NewsCard