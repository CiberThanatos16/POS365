import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import api from "../api/api";
import Modal from "./modals";
import { formatCurrency } from "../utils/formatCurrency";

export const Admin_Product = () => {

    //estado de modales
    const [openUpdate, setOpenUpdate] = useState(false);//para el modal del update
    const [OpenInsumos, setOpenInsumos] = useState(false);//para el modal del Insumos

    const [insumos, setInsumos] = useState([
        { nombre: "", precio: "" }
    ]);

    const agregarInsumo = () => {
        setInsumos([...insumos, { nombre: "", precio: "" }]);
    };

    const handleInsumoChange = (index, field, value) => {
        const nuevos = [...insumos];
        nuevos[index][field] = value;
        setInsumos(nuevos);
    };

    const totalInsumos = insumos.reduce((acc, item) => {
        return acc + (parseFloat(item.precio) || 0);
    }, 0);

    const [nombreInsumos, setNombreInsumos] = useState("");

    const [selected, setSelected] = useState(null);//
    const [preview, setPreview] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    //variables para datos que se usan
    const [img, setImg] = useState(null);
    const [name, setName] = useState("");
    const [price_sale, setPriceSale] = useState("");
    const [price_input, setPriceInput] = useState("");

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    //obtener datos de productos de la base de datos
    const fetchData = async () => {
        const res = await api.get("/pos35X");
        setItems(res.data);
    };



    //El que MANDA los datos (guardar)
    //Evita que el formulario recargue la página
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price_sale) return;

        const formData = new FormData();
        formData.append("img", img);
        formData.append("name", name);
        formData.append("price_sale", price_sale);
        formData.append("price_input", price_input);

        await api.post("/pos35X", formData);

        setImg(null);
        setName("");
        setPriceSale("");
        setPriceInput("");

        fetchData();
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

    //Actualizar los datos
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!selected) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price_sale", price_sale);
        formData.append("price_input", price_input);

        if (img) formData.append("img", img);

        await api.put(`/pos35X/${selected.id}`, formData);

        setOpenUpdate(false);
        setImg(null);
        fetchData();
    };


    // (Eliminar) datos de la tabla
    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este producto?")) return;

        try {
            await api.delete(`/pos35X/${id}`);
            fetchData(); // recargar productos
        } catch (error) {
            console.error(error);
            alert("Error al eliminar");
        }
    };

    return (
        <>
            <div className="p-4 sm:p-5 flex flex-col xl:flex-row gap-6 mt-10 xl:mt-0">
                <div className="p-2 sm:p-5 w-full xl:flex-1">
                    {/* HEAD */}
                    <div className="items-center ">
                        <div className="flex flex-col sm:flex-row justify-between w-full mb-10 gap-4">
                            <h1 className="text-xl sm:text-2xl font-bold">Administra tus productos</h1>
                            <div className="flex gap-2">
                                <input onChange={(e) => setSearchTerm(e.target.value)} type="search" value={searchTerm} placeholder="Busca en el menu" className="bg-gray-800 p-3 rounded-2xl w-full sm:w-80" />
                                <button onClick={handleSearch} className="bg-blue-500 p-3 rounded-2xl w-full sm:w-20">Buscar</button>
                            </div>
                        </div>

                        {/* FORMULARIO DE PRODUCTO */}
                        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 w-full">

                            <div className="">
                                <label htmlFor="">Elige una imagen:</label> <br />
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setImg(file);

                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                    className="bg-gray-700 p-1 w-full sm:w-52 cursor-pointer rounded-sm border border-orange-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="">Nombre:</label><br />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-gray-700 p-1 w-full sm:w-52" placeholder="Nombre"
                                />
                            </div>

                            {/*
                            <div>
                                <label htmlFor="">Cantidad</label><br />
                                <input 
                                    type="number"
                                    className="bg-gray-700 p-1 w-full sm:w-52" placeholder="Cantidad" />
                            </div>
                            */}
                            <div>
                                <label htmlFor="">Precio al publico</label><br />
                                <input
                                    type="number"
                                    required
                                    value={price_sale}
                                    onChange={(e) =>
                                        setPriceSale(e.target.value === "" ? "" : Number(e.target.value))
                                    }
                                    className="bg-gray-700 p-1 w-full sm:w-52"
                                    placeholder="Precio público"
                                />
                            </div>

                            <div>
                                <label htmlFor="">Precio de insumos</label><br />
                                <div className="flex">
                                    <input
                                        type="number"
                                        required
                                        value={price_input}
                                        onChange={(e) =>
                                            setPriceInput(e.target.value === "" ? "" : Number(e.target.value))
                                        }
                                        className="bg-gray-700 p-1 w-full sm:w-52 rounded-l-sm"
                                        placeholder="Precio de insumos"
                                    />
                                    <button title="Es lo que gastastes por el producto o servicio"
                                        type="button">
                                        <img src="icons/question-circle-svgrepo-com.svg"
                                            className="w-8 bg-blue-300 rounded-r-sm cursor-pointer" alt="" />
                                    </button>
                                </div>
                            </div>
                            <br />
                            <div className="flex flex-col sm:flex-row justify-between py-5 gap-3 sm:gap-5">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setNombreInsumos(name);
                                        setOpenInsumos(true);
                                    }}
                                    className="p-2 bg-blue-800 rounded-2xl cursor-pointer w-full sm:w-52" >
                                    calcular insumos
                                </button>

                                <button
                                    type="submit"
                                    className="bg-blue-800 p-2 rounded-2xl w-full sm:w-52 cursor-pointer"
                                >
                                    Guardar
                                </button>
                            </div>

                        </form>

                    </div>

                    {/* ================LINEA DE OPCIONES */}

                    <div className="flex justify-between mt-1 mb-3">

                        <Link to="/dashboard/tabla_products" className="text-blue-200 flex items-center gap-1 cursor-pointer text-sm sm:text-base">
                            <img src="icons/table.svg" alt="table_products" className="w-8" />
                            Ver tabla de productos
                        </Link>

                    </div>

                    {/*========================================= MENU =========================================== */}

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                        {items.map((item) => (
                            <div key={item.id} className="min-w-auto bg-gray-800 rounded-2xl p-3 shadow-md">
                                <div className="w-full h-36">
                                    <img
                                        src={item.img ? `http://localhost:3000/uploads/${item.img}` : "icon_pos360.png"}
                                        alt={item.name}
                                        className="w-full h-full rounded-xl mb-2 object-contain border border-blue-500"
                                    />
                                </div>

                                <p className="text-gray-200 text-sm font-bold wrap-break-word">{item.name}</p>
                                <p className="text-xl text-amber-500 font-bold">{formatCurrency(item.price_sale)}</p>


                                <div className="mb-2 mt-5 flex gap-2">

                                    <button
                                        onClick={() => {
                                            setSelected(item);

                                            setPreview(`http://localhost:3000/uploads/${item.img}`);

                                            setName(item.name);
                                            setPriceSale(item.price_sale);
                                            setPriceInput(item.price_input);
                                            setOpenUpdate(true);
                                        }} className="bg-blue-800" title="Modificar">

                                        <img src="icons/pencil-svgrepo-com.svg" className="w-8" alt="Modificar" />
                                    </button>



                                    <button onClick={() => handleDelete(item.id)}
                                        className=" bg-red-600" title="Eliminar">
                                        <img src="icons/trash-bin-trash-svgrepo-com.svg" className="w-8" alt="Eliminar" />
                                    </button>


                                </div>
                            </div>

                        ))}
                    </div>


                    {/* ======MODAL PARA UPDATE======== */}

                    <Modal isOpen={openUpdate} onClose={() => setOpenUpdate(false)}>
                        <h2 className="text-xl font-bold mb-2 text-white">Editar producto</h2>
                        <form onSubmit={handleUpdate}>


                            <div className="flex gap-3.5 mb-2">
                                <label htmlFor="name">Id:</label>
                                <input type="text"
                                    value={selected?.id || ""} disabled className="bg-gray-600 text-gray-200"
                                />
                            </div>

                            <div className="mb-2">
                                {preview && (
                                    <img src={preview}
                                        alt="Sin Imagen"
                                        className="w-30 h-30 object-contain mb-2"
                                    />
                                )}

                                <label htmlFor="" className="">Seleccionar Imagen:</label><br />
                                <input type="file" className="bg-gray-700 cursor-pointer"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setImg(file);
                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex gap-3.5 justify-between mb-2">
                                <label htmlFor="name">Nombre:</label>
                                <input type="text" id="name" className="bg-gray-700"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-3.5 justify-between mb-2">
                                <label htmlFor="name">precio publico:</label>
                                <input type="text" className="bg-gray-700"
                                    value={price_sale}
                                    onChange={(e) => setPriceSale(e.target.value)} />
                            </div>

                            <div className="flex gap-3.5 justify-between mb-2">
                                <label htmlFor="name">Precio de insumo:</label>
                                <input type="text" className="bg-gray-700"
                                    value={price_input}
                                    onChange={(e) => setPriceInput(e.target.value)} />
                            </div>

                            <button type="submit" className="bg-blue-800 p-1 rounded-sm cursor-pointer">
                                Guardar cambios
                            </button>

                        </form>

                    </Modal>


                    {/* ====== CALCULAR INSUMOS ======== */}
                    <Modal isOpen={OpenInsumos} onClose={() => setOpenInsumos(false)}>

                        <h2 className="text-xl font-bold mb-5 text-white">
                            Calcula tus insumos
                        </h2>

                        <div className="w-full mb-2">
                            <input
                                type="text"
                                value={nombreInsumos}
                                onChange={(e) => setNombreInsumos(e.target.value)}
                                className="bg-gray-700 p-1 w-full"
                                placeholder="Nombre del producto"
                            />
                        </div>

                        <div className="overflow-y-auto max-h-96  mb-5 my-5 space-y-3">

                            {insumos.map((insumo, index) => (

                                <div key={index} className="flex justify-between ">

                                    <div>
                                        <label>Nombre insumo:</label><br />

                                        <input
                                            type="text"
                                            value={insumo.nombre}
                                            onChange={(e) => handleInsumoChange(index, "nombre", e.target.value)}
                                            className="bg-gray-600 text-gray-200 w-44"
                                        />

                                    </div>

                                    <div>
                                        <label>Precio insumo:</label><br />

                                        <input
                                            type="number"
                                            value={insumo.precio}
                                            onChange={(e) => handleInsumoChange(index, "precio", e.target.value)}
                                            className="bg-gray-600 text-gray-200 w-44"
                                        />

                                    </div>
                                </div>

                            ))}

                        </div>


                        <div className="flex justify-between mb-5">

                            <label>Total de insumos</label>

                            <span className="text-white font-bold">
                                {formatCurrency(totalInsumos)}
                            </span>

                        </div>


                        <button
                            onClick={agregarInsumo}
                            className="bg-blue-800 p-2 rounded-sm w-full mb-2"
                        >
                            Agregar insumo
                        </button>

                        <button
                            onClick={() => {
                                setPriceInput(totalInsumos);
                                if (nombreInsumos.trim()) setName(nombreInsumos);
                                setNombreInsumos("");
                                setOpenInsumos(false);
                            }}
                            className="bg-blue-700 hover:bg-blue-600 p-2 rounded-sm w-full mb-2 font-bold transition-colors"
                        >
                            Aplicar total al precio de insumos ({formatCurrency(totalInsumos)})
                        </button>

                        {/*
                        <button
                            className="bg-blue-800 p-2 rounded-sm w-full mb-2"
                        >
                            Guardar calculo de insumos
                        </button>
                        */}

                        {/*
                        <Link className="text-gray-400">
                            ¿Como calcular tus insumos?
                        </Link>
                        */}
                        <p className="text-gray-400 text-sm mt-4">
                            * Los precios de los insumos pueden actualizarse.
                        </p>
                    </Modal>
                </div >

                {/* VIEW DE producto */}
                <div className="w-full xl:w-1/3 bg-gray-950 p-4 rounded-2xl text-white flex flex-col xl:h-[95vh] xl:sticky xl:top-1 border-t xl:border-t-0 xl:border-l border-blue-400">
                    <h2 className="text-2xl font-bold mb-4">Vista previa</h2>

                    <div className="bg-gray-800 p-5 rounded-2xl">

                        <div className="w-full mb-4">
                            {preview ? (
                                <div className="w-full h-52 flex justify-center items-center">
                                    <img src={preview} className="w-full h-full rounded-xl object-contain" />
                                </div>
                            ) : (
                                <div className="w-full h-full bg-gray-700 rounded-xl flex items-center justify-center">
                                    Sin imagen
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between mb-3">
                            <p>{name || "Nombre del producto"}</p>
                        </div>

                        <div className="flex justify-between text-lg font-bold mb-3">
                            <p>{formatCurrency(price_sale)}</p>
                        </div>

                        <div className="flex justify-between text-lg font-bold mb-3">
                            <p>{formatCurrency(price_input)}</p>
                        </div>

                        <div className="flex justify-between text-lg font-bold">
                            <p>
                                Balance: {formatCurrency(price_sale && price_input ? price_sale - price_input : 0)}
                            </p>
                        </div>

                    </div>
                </div>

            </div >
        </>
    );
};