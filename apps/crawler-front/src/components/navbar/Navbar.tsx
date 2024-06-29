
const Navbar = () => {
    return (
        <header className="fixed w-full bg-white z-10" data-testid="navbar">
            <div className="w-full flex flex-col md:flex-row px-8 py-2 items-center border-b-sky-200 border-2 min-h-24">
                <div className="flex-1">
                    <img className="transition-transform duration-500 transform hover:scale-105 cursor-pointer" src="https://cdn.stackbuilders.com/media/images/Logo-Website.original.png" alt="logo" />
                </div>
                <div className="flex gap-4 items-center">
                    <span className="font-medium text-md text-gray-600 md:text-xl sm:text-normal">Juan Francisco Cevallos</span>
                    <a href="https://www.linkedin.com/in/juanfcval/">
                        <img className="cursor-pointer hover:scale-110" src="https://iconape.com/wp-content/files/yd/367773/svg/logo-linkedin-logo-icon-png-svg.png" width={30} height={30} alt="Linkedin logo" />
                    </a>
                    <a href="https://github.com/JuanFCVal">
                        <img className="cursor-pointer hover:scale-110" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width={30} height={30} alt="Github logo" />
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Navbar