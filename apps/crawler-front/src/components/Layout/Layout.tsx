import Navbar from "../navbar/Navbar";

interface ILayoutProps {
    children: React.ReactNode

}
const Layout = ({ children }: ILayoutProps) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="w-full mt-24 mb-12">
                {children}
            </div>
            <div className="flex-col items-center justify-center w-full fixed bottom-0 bg-sky-100 py-2 text-gray-600 hover:text-black">
                <a href="https://github.com/JuanFCVal/SB-Crawler-Monorepo"> <p className="text-center">Made with <span className="animate-pulse">💚</span> and React</p>
                    <p className="text-center ">Find the code here</p></a>
            </div>
        </div>
    );
}

export default Layout