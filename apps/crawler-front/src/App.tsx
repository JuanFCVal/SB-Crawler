import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout"
import { getNews } from "./services/news_service"
import { INewsItem } from "./types/news_types";
import NewsList from "./components/NewsList/Newslist";
import { Combobox } from "./components/ComboBox/ComboBox";
import { IComboBoxItemWithFilter } from "./types/combo_box";
import { filters } from "./constants/filters";

function App() {
  const [newsElements, setNewsElements] = useState<INewsItem[]>()
  const [selectedFilter, setSelectedFilter] = useState<IComboBoxItemWithFilter>(filters[0])

  useEffect(() => {
    const handleLoadNews = async () => {
      const response = await getNews()
      setNewsElements(response.news)
    }
    handleLoadNews()
  }, [])

  const handleOnChangeFilter = (value: string) => {
    const selectedFilter = filters.find((filter) => filter.value === value)
    if (selectedFilter) {
      setSelectedFilter(selectedFilter)
    }
  }

  return (
    <Layout>
      <div className="w-full px-10 md:px-5 sm:px-2 py-10">
        <div className="z-10 w-full">
          <h1 className="text-3xl">Hacker news</h1>
          <div className="flex items-center mt-4">
            <label>Filters</label>
            <Combobox
              items={filters}
              onChange={(value) => handleOnChangeFilter(value)}
              value={selectedFilter.value}
            />
          </div>

        </div>
        <NewsList news={newsElements || []} filter={selectedFilter.filter} />
      </div>
    </Layout>
  )
}

export default App
