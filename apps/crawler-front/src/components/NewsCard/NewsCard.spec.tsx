import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewsCard from './NewsCard';

describe('NewsCard', () => {
    it('should render a card with rank, title, comments and points', async () => {
        const newsCardItem = {
            "title": "This is a example",
            "rank": 1,
            "comments": 100,
            "points": 10,
            "count_words_title": 4
        }
        render(<NewsCard newsItem={newsCardItem} />)
        expect(screen.getByText(/1\. This is a example/)).toBeInTheDocument();
        expect(screen.getByText(/100 comments/)).toBeInTheDocument();
        expect(screen.getByText(/10 points/)).toBeInTheDocument()
    })

})
