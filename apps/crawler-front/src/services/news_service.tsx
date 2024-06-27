import { IGetNewsResponse } from "../types/news_types";

export const getNews = async (): Promise<IGetNewsResponse> => {
    const response = await fetch('/api/scrapper');
    return await response.json();
}