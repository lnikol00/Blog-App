import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Layout = () => {
    return (
        <main className="App" >
            <Header />
            <div className='main-container'>
                <Outlet />
            </div>
        </main>
    )
}

export default Layout