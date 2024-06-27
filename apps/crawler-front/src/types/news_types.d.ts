export interface IGetNewsResponse {
  news: INewsItem[]
  timeElapsed: string
}

export interface INewsItem {
  count_words_title: number
  rank: number
  title: string
  points: number
  comments: number
}
