
import { render, waitFor } from '@testing-library/react';
import App from './App';
import { getNews } from './services/news_service';
import '@testing-library/jest-dom'

jest.mock('../src/services/news_service', () => ({
    getNews: jest.fn()
}))
describe('App', () => {
    it('should call getNews on mount', async () => {
        const mockedGetNews = getNews as jest.MockedFunction<typeof getNews>;
        mockedGetNews.mockResolvedValue({ news: [], timeElapsed: '25ms' }); // Mock the resolved value
        render(<App />)
        await waitFor(() => {
            expect(mockedGetNews).toHaveBeenCalledTimes(1)
        })
    })
    it('should render "All" filter by default', async () => {
        const mockedGetNews = getNews as jest.MockedFunction<typeof getNews>;
        mockedGetNews.mockResolvedValue({ news: [], timeElapsed: '25ms' }); // Mock the resolved value
        const { getByText } = render(<App />)
        await waitFor(() => {
            expect(getByText('All news')).toBeInTheDocument()
        })
    })

    it('should render the news list', async () => {
        const mockedGetNews = getNews as jest.MockedFunction<typeof getNews>;
        mockedGetNews.mockResolvedValue({
            news: [
                {
                    title: 'This is a example 1',
                    points: 10,
                    comments: 5,
                    count_words_title: 5,
                    rank: 1
                }
            ], timeElapsed: '25ms'
        });
        const { getByText } = render(<App />)
        await waitFor(() => {
            expect(getByText(/1\. This is a example/)).toBeInTheDocument()
        })
    })
})