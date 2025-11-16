import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/sidebar/Sidebar';
import Navbar from '../components/common/Navbar';
import { useState } from 'react';

const RootLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-y-hidden">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <main className="flex-1 flex flex-col h-full max-w-[100vw] overflow-hidden">
                <Navbar
                    setSidebarOpen={setSidebarOpen}
                    sidebarOpen={sidebarOpen}
                />
                <div
                    className={`flex-1 min-h-0 relative ${
                        sidebarOpen
                            ? 'max-h-full overflow-y-hidden'
                            : 'overflow-y-auto'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                >
                    {sidebarOpen && (
                        <div className="absolute w-full h-full lg:hidden bg-black/30 z-1"></div>
                    )}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default RootLayout;
