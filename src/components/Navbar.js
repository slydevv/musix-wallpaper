import { useState, useEffect  } from "react";
import { accessToken, logout} from '../spotify';


export default function NavBar() {
    const [navbar, setNavbar] = useState(null);
    const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://musix-wallpaper-api.onrender.com/login';
    
    useEffect(() => {
        setNavbar(accessToken)
    }, [])

    return (
        <nav className="w-full bg-gray-800 shadow-2xl">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="/">
                            <h2 className="text-2xl font-bold text-pry">LOGO</h2>
                        </a>
                        <div className="md:hidden">
                             <button className={!navbar?'hidden' : 'text-pry bg-gray-600 px-4 py-2 rounded-md'} onClick={logout}>Log Out</button>
                        </div>
                    </div>
                </div>
                <div>
                   
                </div>
                <div className="hidden space-x-2 md:inline-block">
                {!navbar?   <a
                        href={LOGIN_URI}
                        className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow lg:hover:bg-gray-200 lg:hover:text-black"
                    >
                        Sign in
                    </a>: 
                         <button className={!navbar?'hidden' : 'text-pry bg-gray-600 hover:bg-white px-4 py-2 rounded-md'} onClick={logout}>Log Out</button>

                    }
                   
                </div>
            </div>
        </nav>
    );
}