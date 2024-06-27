import { INewsItem } from './news_types'

export interface IComboBoxItem {
  value: string
  label: string
}

export interface IComboBoxItemWithFilter extends IComboBoxItem {
  filter: (news: INewsItem[]) => INewsItem[]
}
