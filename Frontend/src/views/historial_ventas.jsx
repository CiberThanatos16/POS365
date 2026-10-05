import api from "../api/api";
import { useEffect, useState } from "react";
import { Eye, Clock } from "lucide-react";
import Modal from "./modals";
import { formatCurrency } from "../utils/formatCurrency";
import '../styles/ticket.css';

export const Historial_Ventas = () => {

    //Obtener nombre del negocio
    const [businessName, setBusinessName] = useState("POS365");

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await api.get("/pos365/business");
                if (res.data[0]?.name_business) {
                    setBusinessName(res.data[0].name_business);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBusiness();
    }, []);

    //Modal tiket
    const [openTiket, setOpenTiket] = useState(false);//para el modal del update

    const [selected, setSelected] = useState(null);
    const [preview, setPreview] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/pos365/sale");
            setItems(res.data);
        } catch (error) {
            console.error("Error al obtener ventas:", error);
        } finally {
            setLoading(false);
        }
    };

    const viewSale = async (id) => {
        try {
            setPreview(null);
            setOpenTiket(true);
            const res = await api.get(`/pos365/sale/${id}`);
            setPreview(res.data);
            setSelected(id);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="p-4 sm:p-6 pt-14 xl:pt-6">

            <h1 className="text-xl sm:text-2xl font-bold mb-4">Historial de ventas</h1>

            <div className="w-full">
                {/* Encabezados */}
                <div className="grid grid-cols-3 gap-4 mb-3 px-3 font-bold">
                    <h2 className="text-left">Fecha de venta</h2>
                    <h2 className="text-center">Total de venta</h2>
                    <h2 className="text-right">Acciones</h2>
                </div>

                {/* Items */}
                {loading ? (
                    <p className="text-center p-4">Cargando ventas...</p>
                ) : items.length === 0 ? (
                    <p className="text-center p-4">No hay ventas registradas aún.
                    </p>


                ) : (
                    items.map((item) => (
                        <div key={item.id} className="grid grid-cols-3 gap-4 py-2 px-2 text-gray-300 shadow-md shadow-b-gray-700  border-b border-gray-700 items-center">
                            <p className="text-left text-sm">{new Date(item.created_at).toLocaleDateString()}</p>
                            <p className="text-center font-semibold">{formatCurrency(item.total)}</p>
                            <div className="text-right">
                                <button
                                    className="cursor-pointer hover:text-blue-400 transition-colors p-2"
                                    onClick={() => viewSale(item.id)}
                                    title="Ver detalle de venta"
                                >
                                    <Eye size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal isOpen={openTiket} onClose={() => setOpenTiket(false)}>
                {!preview && <p className="text-white text-center p-4">Cargando detalles...</p>}
                {preview && (

                    <div id="ticket" className="bg-gray-900 p-4 mt-5 w-full rounded text-white">

                        <h2 className="text-center font-bold text-gray-300 border-b border-gray-700 mb-2">
                            {businessName}
                        </h2>
                        <div className="flex justify-between border-b border-gray-700">
                            <p className="mb-5 text-[14px]">Venta #{preview.sale.id}</p>
                            <p className="mb-5 text-[12px]">{preview.sale.created_at}</p>
                        </div>
                        {preview.items.map((item, index) => (
                            <div
                                key={item.id || index}
                                className="flex justify-between items-center border-b border-gray-700 py-2 font-light py-4">
                                <p className="flex-1 break-words pr-4 w-[30%]" title={item.name}>{item.name}</p>
                                <p className="w-[30%] text-center break-words">x{item.quantity}</p>
                                <p className="w-[30%] text-right">{formatCurrency(item.price)}</p>
                            </div>
                        ))}

                        <div className="mt-4 pt-5 font-light text-[14px]">

                            <div className="flex justify-between mb-3 ">
                                <p className="w-[50%]">Subtotal: </p> <p className="w-50%">{formatCurrency(preview.sale.subtotal)}</p>
                            </div>
                            <div className="flex justify-between mb-3">
                                <p>IVA: </p> <p>{formatCurrency(preview.sale.iva)}</p>
                            </div>
                            <div className="flex justify-between font-bold text-[16px]">
                                <p className="">
                                    Total:
                                </p>
                                <p>
                                    {formatCurrency(preview.sale.total)}
                                </p>
                            </div>

                        </div>

                    </div>

                )}

                {preview && (
                    <button
                        onClick={() => window.print()}
                        className="bg-blue-600 px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
                    >
                        Imprimir ticket
                    </button>
                )}


            </Modal>

        </div>
    );
}