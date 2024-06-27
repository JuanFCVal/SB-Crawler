import { useState } from "react";
import Layout from "./components/Layout/Layout"
import { getNews } from "./services/news_service"
import { INewsItem } from "./types/news_types";
import NewsList from "./components/NewsList/Newslist";

function App() {
  const [newsElements, setNewsElements] = useState<INewsItem[]>()

  const handleLoadNews = async () => {
    const response = await getNews()
    setNewsElements(response.news)
  }

  return (
    <Layout>
      <div className="w-full px-10 md:px-5 sm:px-2">
        <h1 className="text-3xl mb-4">Hacker news</h1>
        <NewsList news={newsElements || []} />
        <button onClick={handleLoadNews}>
          Get news
        </button>
      </div>
    </Layout>
  )
}

export default App
