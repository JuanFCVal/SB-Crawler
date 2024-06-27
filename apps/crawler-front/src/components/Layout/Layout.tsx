import Navbar from "../navbar/Navbar";

interface ILayoutProps {
    children: React.ReactNode

}
const Layout = ({ children }: ILayoutProps) => {
    return (
        <>
            <Navbar />
            <div className="w-full p-6">
                {children}
            </div>
        </>
    );
}

export default Layout