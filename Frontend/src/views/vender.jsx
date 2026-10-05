import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import api from "../api/api";
import Modal from "./modals";
import { CreditCard, Banknote, Wallet, QrCode } from "lucide-react";
import '../styles/ticket.css';
import { formatCurrency } from "../utils/formatCurrency";


export const Vender = () => {

    //Obtener nombre del negocio
    const [businessName, setBusinessName] = useState("POS 365");

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await api.get("/pos35X/business");
                if (res.data[0]?.name_business) {
                    setBusinessName(res.data[0].name_business);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBusiness();
    }, []);

    //estados de modal
    const [openVenta, setOpenVenta] = useState(false);
    const [openTiket, setOpenTiket] = useState(false);
    const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
    const [preview, setPreview] = useState(null);

    //estado del search
    const [searchTerm, setSearchTerm] = useState("");



    //estado de carrito
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    //estado para seleccionar producto
    const [selected, setSelected] = useState(null);
    const [file, setFile] = useState(null);

    //variables para datos que se leen y usan
    const [img, setImg] = useState(null);
    const [name, setName] = useState("");
    const [price_sale, setPriceSale] = useState();
    const [price_input, setPriceInput] = useState();

    const [items, setItems] = useState([]);

    //lectura de datos
    useEffect(() => {
        fetchData();
    }, []);

    //función para leer los datos
    const fetchData = async () => {
        const res = await api.get("/pos35X");
        setItems(res.data);
    };

    //Añadir al carrito
    const addToCart = (product) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);

            if (existing) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            subtotal: (item.quantity + 1) * item.price_sale,
                            total_input: (item.quantity + 1) * item.price_input
                        }
                        : item
                );
            } else {
                return [
                    ...prevCart,
                    {
                        ...product,
                        quantity: 1,
                        subtotal: product.price_sale,

                    }
                ];
            }
        });
    };

    //buscar productos por nombre
    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            fetchData();
            return;
        }

        const res = await api.get(`/pos35X/search?name=${searchTerm}`);
        setItems(res.data);
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //función del botón para restar cantidad
    const decreaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                            subtotal: (item.quantity - 1) * item.price_sale,
                            total_input: (item.quantity - 1) * item.price_input
                        }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    //Eliminar producto directamente
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    //swich metodo de pago
    const [metodo, setMetodo] = useState("tarjeta");

    const options = [
        { id: "tarjeta", label: "Tarjeta" },
        { id: "transferencia", label: "Transferencia" },
        { id: "efectivo", label: "Efectivo" }
    ];

    // Cálculo dinámico de totales
    const subtotal = cart.reduce(
        (acc, item) => acc + item.quantity * item.price_sale,
        0
    );

    const iva = subtotal * 0.16;
    const total = subtotal;

    //estado para el pago en efectivo
    const [pago, setPago] = useState("");
    const [cambio, setCambio] = useState(0);

    useEffect(() => {
        if (metodo === "efectivo") {
            const pagoNum = Number(pago);
            const calcCambio = pagoNum - total;

            setCambio(calcCambio >= 0 ? calcCambio : 0);
        }
    }, [pago, total, metodo]);

    //Completar venta
    const completeSale = async () => {

        if (cart.length === 0) {
            alert("Aún no hay productos cargados al carrito");
            return; // detiene la ejecución
        }

        if (metodo === "efectivo" && Number(pago) < total) {
            alert("El dinero recibido es menor al total");
            return;
        }

        try {
            const res = await api.post("/pos35X/sale", {
                cart,
                subtotal,
                iva,
                total,
                metodo_pago: metodo,
                pago,
                cambio
            });

            if (res.data.saleId) {
                const resTicket = await api.get(`/pos35X/sale/${res.data.saleId}`);
                setPreview(resTicket.data);
                setOpenTiket(true);
            }

            alert("Venta completada");

            setOpenVenta(false);

            setCart([]);
            setPago(0);
            setCambio(0);
            setMetodo("tarjeta");
            localStorage.removeItem("cart");
        } catch (error) {
            console.error(error);
            alert("Error al guardar venta");
        }

    };

    //Cancelar compra (limpiar carrito)
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        setPago(0);
        setCambio(0);
        setMetodo("tarjeta");
        setOpenCancelConfirm(false);
    };


    return (
        <>
            <section id="ventas" className="p-4 sm:p-6 flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto">
                <div className="p-2 w-full xl:flex-1">
                    {/* HEAD */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-14 gap-4 mt-10 xl:mt-0">
                        <h1 className="text-xl sm:text-2xl font-bold">Seccion de ventas</h1>

                        <div className="flex gap-2">
                            <input onChange={(e) => setSearchTerm(e.target.value)} type="search" value={searchTerm} placeholder="Busca en el menu" className="bg-gray-800 p-3 rounded-2xl w-full sm:w-80" />
                            <button onClick={handleSearch} className="bg-blue-500 p-3 rounded-2xl w-full sm:w-20">Buscar</button>
                        </div>
                    </div>

                    {/* MENU */}

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="min-w-auto bg-gray-800 rounded-2xl p-3 shadow-md"
                            >
                                <div className="w-full h-36">
                                    <img
                                        src={item.img ? `http://localhost:3000/uploads/${item.img}` : "icon_pos360.png"}
                                        alt={item.name}
                                        className="w-full h-full rounded-xl mb-2 object-contain border border-blue-500"
                                    />
                                </div>
                                <p className="text-gray-200 text-sm font-bold wrap-break-word">{item.name}</p>
                                <p className="text-xl text-amber-500 font-bold">{formatCurrency(item.price_sale)}</p>

                                <div className="flex mt-3">
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="mt-3 w-full bg-blue-700 hover:bg-blue-800 p-2 rounded-xl font-semibold transition"
                                    >
                                        Agregar +
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>

                </div>

                {/* VIEW DE VENTA */}
                <div className="w-full xl:w-1/3 bg-gray-950 p-4 rounded-2xl text-white flex flex-col xl:h-[95vh] xl:sticky xl:top-1 border-t xl:border-t-0 xl:border-l border-blue-400">

                    <h2 className="text-2xl font-bold mb-4">Orden</h2>

                    {/* LISTADO DEL CARRITO */}
                    <div className="flex-1 overflow-y-auto pr-2">

                        {cart.map((item) => (
                            <div key={item.id} className="bg-gray-800 p-4 rounded-xl mb-4 shadow">

                                <div className="flex items-center justify-between">
                                    <img
                                        src={item.img ? `http://localhost:3000/uploads/${item.img}` : "icon_pos360.png"}
                                        alt={item.name}
                                        className="w-14 h-14 object-cover rounded-xl"
                                    />

                                    <p className="flex-1 ml-3">{item.name}</p>

                                    <div>
                                        <p className="font-semibold">
                                            {formatCurrency(item.subtotal)}
                                        </p>

                                        <div className="flex gap-1.5">
                                            <p>Cantidad:</p>
                                            <p className="text-gray-300">
                                                x{item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="border border-blue-700 hover:bg-blue-700 px-2 py-1 rounded font-bold"
                                    >
                                        -
                                    </button>

                                    <span>x{item.quantity}</span>

                                    <button
                                        onClick={() => addToCart(item)}
                                        className="border border-blue-700 hover:bg-blue-700 px-2 py-1 rounded font-bold"
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded font-bold"
                                    >
                                        x
                                    </button>
                                </div>

                            </div>
                        ))}

                    </div>

                    {/* TOTALES DEL CARRITO */}
                    <div className=" p-2 rounded-2xl mt-4 shadow-lg">

                        <div className="flex justify-between mb-3">
                            <p>Sub Total:</p>
                            <p>{formatCurrency(subtotal)}</p>
                        </div>

                        <div className="flex justify-between mb-5">
                            <p>IVA (16%):</p>
                            <p>{formatCurrency(iva)}</p>
                        </div>

                        <hr className="border-gray-600 mb-5" />

                        <div className="flex justify-between text-xl font-bold mb-6 text-green-400">
                            <p>Total:</p>
                            <p>{formatCurrency(total)}</p>
                        </div>

                        <button
                            onClick={() => {
                                setOpenVenta(true);

                            }} className="border border-blue-700 hover:bg-blue-700 p-2 
                                            mb-2 rounded font-bold w-full"
                        >
                            Completar venta
                        </button>

                        <button
                            onClick={() => {
                                if (cart.length === 0) {
                                    return;
                                }
                                setOpenCancelConfirm(true);
                            }} className="border border-red-700 hover:bg-red-700 p-2 
                                            mb-2 rounded font-bold w-full"
                        >
                            Cancelar Compra
                        </button>

                    </div>

                </div>

                {/*=============MODAL DE VENTA=================*/}
                <Modal isOpen={openVenta} onClose={() => setOpenVenta(false)} size="lg">

                    <div className="flex items-center gap-2 mb-4">
                        <Wallet className="w-8 h-8" />
                        <h3 className="text-xl font-bold">Metodo de pago</h3>
                    </div>

                    <div className="bg-blue-950 p-2 rounded-xl flex justify-between gap-0 w-full">
                        {options.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setMetodo(opt.id)}
                                className={`px-0 py-1 rounded-xl font-semibold w-full transition
                        ${metodo === opt.id
                                        ? "bg-blue-600 shadow text-black"
                                        : "text-gray-200"}

                                        ${metodo === "efectivo" && (
                                        <>
                                            {/* inputs de pago y cambio */}
                                        </>
                                    )}
                    `}

                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <Banknote className="w-8 h-8" />
                        <h3 className="text-xl font-bold">efectivo</h3>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-300 mb-2">Pago con:</label>
                        <input
                            type="number"
                            value={pago}
                            onChange={(e) => setPago(e.target.value)}
                            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:border-blue-500 outline-none"
                            placeholder="0.00"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-300 mb-2">Cambio:</label>
                        <input
                            type="number"
                            value={cambio}
                            readOnly
                            className="w-full bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none"
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            className="border border-red-700 w-full p-1 rounded-xl font-bold text-lg transition text-red-500 
                                        hover:bg-red-500 hover:text-white cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={completeSale}
                            className="border border-blue-700 w-full p-1 rounded-xl font-bold text-lg transition text-blue-500 
                                        hover:bg-blue-800 hover:text-white cursor-pointer"
                        >
                            Completar venta
                        </button>
                    </div>

                </Modal>

                <Modal isOpen={openTiket} onClose={() => setOpenTiket(false)}>
                    {preview && (

                        <div id="ticket" className="bg-gray-900 p-4 mt-5 w-full rounded text-white">

                            <h2 className="text-center font-bold">
                                {businessName}
                            </h2>

                            <p className="mb-2">Venta #{preview.sale.id}</p>
                            <p className="mb-5">{preview.sale.created_at}</p>

                            {preview.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b py-2 px-2">
                                    <p className="flex-1 break-words pr-4" title={item.name}>{item.name}</p>
                                    <p className="w-20 text-center break-words">x{item.quantity}</p>
                                    <p className="w-24 text-right">{formatCurrency(item.price)}</p>
                                </div>
                            ))}

                            <div className="mt-4 border-t pt-5">

                                <div className="flex justify-between mb-3 ">
                                    <p>Subtotal: </p> <p>{formatCurrency(preview.sale.subtotal)}</p>
                                </div>
                                <div className="flex justify-between mb-3">
                                    <p>IVA: </p> <p>{formatCurrency(preview.sale.iva)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-bold">
                                        Total:
                                    </p>
                                    <p>
                                        {formatCurrency(preview.sale.total)}
                                    </p>
                                </div>

                            </div>

                        </div>

                    )}

                    <button
                        onClick={() => window.print()}
                        className="bg-blue-600 hover:bg-blue-700 w-full font-bold px-4 py-2 rounded mt-4 cursor-pointer"
                    >
                        Imprimir ticket
                    </button>


                </Modal>

                {/*=============MODAL DE CONFIRMACIÓN CANCELAR=================*/}
                <Modal isOpen={openCancelConfirm} onClose={() => setOpenCancelConfirm(false)}>
                    <div className="text-center py-4">
                        <div className="flex justify-center mb-4">
                            <div className="bg-red-500/20 p-4 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">¿Cancelar compra?</h3>
                        <p className="text-gray-400 mb-6">Se eliminarán todos los productos del carrito. Esta acción no se puede deshacer.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setOpenCancelConfirm(false)}
                                className="border border-gray-600 hover:bg-gray-700 w-full p-2 rounded-xl font-bold text-lg transition cursor-pointer"
                            >
                                No, volver
                            </button>
                            <button
                                onClick={clearCart}
                                className="bg-red-600 hover:bg-red-700 w-full p-2 rounded-xl font-bold text-lg transition cursor-pointer"
                            >
                                Sí, cancelar
                            </button>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
};