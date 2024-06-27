import { MessageCircle, ThumbsUp } from 'lucide-react'
const NewsCard = () => {
    return (
        <div className="w-full p-4 bg-slate-200/65 rounded-md my-2 transition-transform duration-500 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center">
                <h2 className="text-xl font-semibold">1. The Forth Deck mini: a portable Forth computer with a discrete CPU</h2>
            </div>
            <div className='flex justify-end text-gray-600 mt-2'>
                <div className='hover:text-blue-500 hover:font-medium flex cursor-pointer '>
                    20 comments
                    <MessageCircle className='mx-2' />
                </div>
                <div className='hover:text-blue-500 hover:font-medium flex cursor-pointer '>
                    15 points
                    <ThumbsUp className='mx-2' />
                </div>
            </div>
        </div>
    )
}

export default NewsCard