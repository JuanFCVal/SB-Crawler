import Layout from "./components/Layout/Layout"
import NewsList from "./components/NewsList/Newslist"

function App() {

  return (
    <Layout>
      <div className="w-full px-10 md:px-5 sm:px-2">
        <h1 className="text-3xl mb-4">Hacker news</h1>
        <NewsList />
      </div>
    </Layout>
  )
}

export default App
