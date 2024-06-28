import NewsList from "./Newslist"
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";

describe('NewsList', () => {
    const news = [{
        "title": "This is a example",
        "rank": 1,
        "comments": 100,
        "points": 10,
        "count_words_title": 4
    },
    {
        "title": "This is a example 2",
        "rank": 2,
        "comments": 200,
        "points": 20,
        "count_words_title": 5
    },
    {
        "title": "This is a example example 3",
        "rank": 3,
        "comments": 300,
        "points": 30,
        "count_words_title": 6
    },
    {
        "title": "This is a example example example 4",
        "rank": 4,
        "comments": 400,
        "points": 40,
        "count_words_title": 7
    }
    ]
    it('should render the full list of news ', () => {
        const { getByText } = render(<NewsList news={news} filter={(news) => news} />)
        expect(getByText(/1\. This is a example/)).toBeInTheDocument();
        expect(getByText(/100 comments/)).toBeInTheDocument();
        expect(getByText(/10 points/)).toBeInTheDocument()
        expect(getByText(/2\. This is a example 2/)).toBeInTheDocument();
        expect(getByText(/200 comments/)).toBeInTheDocument();
        expect(getByText(/20 points/)).toBeInTheDocument
    })
    it('should render the news filtered more than five words, ordered by comments number', () => {
        const { getByText } = render(<NewsList news={news} filter={(news) => news.filter(news => news.count_words_title > 5).sort((a, b) => b.comments - a.comments)} />)
        expect(getByText(/4\. This is a example example example 4/)).toBeInTheDocument();
        expect(getByText(/400 comments/)).toBeInTheDocument();
        expect(getByText(/40 points/)).toBeInTheDocument()
        expect(getByText(/3\. This is a example example 3/)).toBeInTheDocument();
        expect(getByText(/300 comments/)).toBeInTheDocument();
        expect(getByText(/30 points/)).toBeInTheDocument()
    })
    it.only('should render the news filtered less or equal than five words, ordered by points number', () => {
        const { getByText } = render(<NewsList news={news} filter={(news) => news.filter(news => news.count_words_title <= 5).sort((a, b) => b.points - a.points)} />)
        expect(getByText(/2\. This is a example 2/)).toBeInTheDocument();
        expect(getByText(/200 comments/)).toBeInTheDocument();
        expect(getByText(/20 points/)).toBeInTheDocument()
        expect(getByText(/1\. This is a example/)).toBeInTheDocument();
        expect(getByText(/100 comments/)).toBeInTheDocument();
        expect(getByText(/10 points/)).toBeInTheDocument()
    })
})