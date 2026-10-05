import { Link } from "react-router-dom";
import { useInternetStatus } from "../hooks/internetStatus";
import {
    Receipt, House, Box, ChartPie, ChartNoAxesCombined,
    Cog, HandHeart, MessageCircleHeart, CircleQuestionMark
} from "lucide-react";

export const Menu = () => {
    const { isOnline, handleClick } = useInternetStatus();
    return (
        <>
            <div className="m-auto">
                <div className="pb-8 pt-8 sm:pb-15 sm:pt-15 bg-gray-800 flex items-center justify-center">
                    <h1 className="text-2xl sm:text-3xl font-black">Bienvenido</h1>
                    <img src="icon_pos360.png" alt="pos360" className="w-14 sm:w-18" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-15 p-5 sm:p-10">

                    <Link to="/dashboard/Admin_product" className="flex flex-col items-center justify-center gap-3">
                        <div className="content-icon bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                            <Box className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Productos</p>
                    </Link>


                    <Link to="/dashboard/vender" className="flex flex-col items-center justify-center gap-3">
                        <div className="content-icon bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                            <Receipt className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Vender</p>
                    </Link>

                    <Link to="/dashboard/historial_ventas" className="flex flex-col items-center justify-center gap-3">
                        <div className="content-icon bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                            <ChartPie className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Historial de ventas</p>
                    </Link>

                    <Link to="/dashboard/reportes" className="flex flex-col items-center justify-center gap-3">
                        <div className="content-icon bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                            <ChartNoAxesCombined className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Reportes</p>
                    </Link>

                    <Link to="/dashboard/configuraciones" className="flex flex-col items-center justify-center gap-3">
                        <div className="content-icon bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                            <Cog className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Configuraciones</p>
                    </Link>

                    <Link to={"/dashboard/ayuda"}
                        className="flex flex-col items-center justify-center gap-3">
                        <div className="content-icon bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                            <CircleQuestionMark className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Ayuda</p>
                    </Link>

                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfCIW_c6b0EdhmR5auWTusFKxS70USDgEYMteTZw7Aa36yctg/viewform?usp=dialog"
                        target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-3"
                        onClick={handleClick}>
                        <div className="content-icon bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                            <MessageCircleHeart className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Tu opinión es importante</p>
                    </a>

                    <Link to="/dashboard/payments" className="flex flex-col items-center justify-center gap-3">
                        <div className="content-icon bg-gray-800 w-32 h-32 rounded-full flex items-center justify-center">
                            <HandHeart className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">¿Gustas apoyar al desarrollador?</p>
                    </Link>

                </div>
            </div >
        </>
    );
};
