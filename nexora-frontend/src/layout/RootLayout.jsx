import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import '../index.css'

const RootLayout = () => {
    return (
        <div>
            {/* navbar */}
            <nav>
                <Navbar />
            </nav>

            {/* website body */}
            <main className='main-body'>
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;