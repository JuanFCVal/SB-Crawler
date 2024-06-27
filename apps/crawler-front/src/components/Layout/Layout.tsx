import Navbar from "../navbar/Navbar";

interface ILayoutProps {
    children: React.ReactNode

}
const Layout = ({ children }: ILayoutProps) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="w-full mt-24">
                {children}
            </div>
        </div>
    );
}

export default Layout