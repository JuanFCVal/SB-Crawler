
const Navbar = () => {
    return (
        <header className="fixed w-full bg-white z-10">
            <div className="w-full flex px-8 py-2 items-center border-b-sky-200 border-2 min-h-24">
                <div className="flex-1">
                    <img className="transition-transform duration-500 transform hover:scale-105 cursor-pointer" src="https://cdn.stackbuilders.com/media/images/Logo-Website.original.png" alt="logo" />
                </div>
                <div >
                    <span className="font-medium text-md">Juan Francisco Cevallos</span>
                </div>
            </div>
        </header>
    )
}

export default Navbar