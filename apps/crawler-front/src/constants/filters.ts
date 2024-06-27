import { IComboBoxItemWithFilter } from '@/types/combo_box'
import { INewsItem } from '@/types/news_types'

export const filters: IComboBoxItemWithFilter[] = [
  {
    value: 'ALL',
    label: 'All news',
    filter: (news: INewsItem[]) => news,
  },
  {
    value: 'FILTER_BY_COMMENTS',
    label: 'More than five words, order by comments',
    filter: (news: INewsItem[]) =>
      news
        .filter((newsItem) => newsItem.comments > 5)
        .sort((a, b) => b.comments - a.comments),
  },
  {
    value: 'FILTER_BY_POINTS',
    label: 'Less or equal than five words, order by points',
    filter: (news: INewsItem[]) =>
      news
        .filter((newsItem) => newsItem.points <= 5)
        .sort((a, b) => b.points - a.points),
  },
]
