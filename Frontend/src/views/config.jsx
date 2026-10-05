import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircleHeart, Cog, Store, HandHeart, FolderX, TriangleAlert } from "lucide-react";

export const Configuraciones = () => {
    const [showModal, setShowModal] = useState(false);

    const handleReset = async () => {
        if (!window.electronAPI) {
            alert("Esta función solo está disponible dentro de la aplicación de escritorio (Electron).");
            return;
        }
        await window.electronAPI.resetApp();
    };

    return (
        <>
            <div className="m-auto">
                <div className="pb-5 pt-5 bg-gray-800 flex items-center justify-center">
                    <h1 className="text-2xl sm:text-3xl font-black">Configuraciones</h1>
                    <Cog className="w-10 h-10 sm:w-14 sm:h-14" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-15 p-5 sm:p-10">

                    <Link to="/dashboard/NameBusiness" className="flex flex-col items-center justify-center gap-3">
                        <div className="content-icon bg-gray-800 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center">
                            <Store className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>
                        <p className="text-center">Nombre del negocio</p>
                    </Link>

                    {/* Botón restaurar — sin Link, usa onClick */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex flex-col items-center justify-center gap-3 cursor-pointer"
                    >
                        <div className="content-icon bg-gray-800 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center hover:bg-red-900 transition-colors">
                            <FolderX className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>
                        <p className="text-center">Restaurar de fábrica</p>
                    </button>

                </div>
            </div>

            {/* Modal de confirmación */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-5">
                        <TriangleAlert className="w-14 h-14 text-red-400" />
                        <h2 className="text-xl font-bold text-center">¿Restaurar de fábrica?</h2>
                        <p className="text-gray-400 text-center text-sm">
                            Se eliminarán <span className="text-white font-semibold">todos los datos</span> de la aplicación: productos, ventas, configuración y usuarios. Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition-colors font-bold"
                            >
                                Restaurar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};