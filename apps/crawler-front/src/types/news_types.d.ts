export interface IGetNewsResponse {
  news: INewsItem[]
  timeElapsed: string
}

export interface INewsItem {
  rank: number
  title: string
  points: number
  comments: number
}
