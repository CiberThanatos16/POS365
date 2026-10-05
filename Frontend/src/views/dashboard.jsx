import { Link, Outlet } from "react-router-dom";
import { Receipt, House, Box, ChartPie, ChartNoAxesCombined, Cog, Menu, X } from "lucide-react";
import { useState } from "react";

export const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navLinks = [
        { to: "menu", icon: <House />, label: "Inicio" },
        { to: "vender", icon: <Receipt />, label: "Vender" },
        { to: "Admin_product", icon: <Box />, label: "Productos" },
        { to: "historial_ventas", icon: <ChartPie />, label: "Historial de ventas" },
        { to: "reportes", icon: <ChartNoAxesCombined />, label: "Reportes" },
        { to: "configuraciones", icon: <Cog />, label: "Configuraciones" },
    ];

    return (
        <>
            <div className="flex">

                {/* BOTÓN HAMBURGER - solo móvil */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="xl:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-lg text-white hover:bg-blue-700 transition"
                >
                    <Menu size={24} />
                </button>

                {/* OVERLAY - solo móvil cuando sidebar abierto */}
                {sidebarOpen && (
                    <div
                        className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* BARRA DE NAVEGACION */}
                <aside className={`
                    bg-gray-950 w-52 flex flex-col py-9 h-screen fixed top-0 left-0 z-50
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    xl:translate-x-0
                `}>

                    {/* BOTÓN CERRAR - solo móvil */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="xl:hidden absolute top-4 right-4 text-gray-400 hover:text-white transition"
                    >
                        <X size={20} />
                    </button>

                    {/* MENU */}
                    <nav className="flex flex-col gap-2 px-3 text-gray-200 h-full">
                        {/* LOGO */}
                        <div className="flex justify-center mb-10">
                            <img src="images/white_pos365.png" alt="POS365" className="w-28" />
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition"
                            >
                                {link.icon}
                                <span className="text-sm font-semibold">{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* VENTANA DINAMICA */}
                <main className="flex-1 bg-gray-950 xl:ml-52">
                    <Outlet />
                </main>

            </div>
        </>
    );
};