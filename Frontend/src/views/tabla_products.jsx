import { useEffect, useState } from "react";
import { exportToExcel } from "../utils/exportExcel";
import Modal from "./modals";
import { formatCurrency } from "../utils/formatCurrency";

import api from "../api/api";

export const TablaProducts = () => {

    //estado de modales
    const [openUpdate, setOpenUpdate] = useState(false);//para el modal del update

    const [selected, setSelected] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

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

    const fetchData = async () => {
        const res = await api.get("/pos35X");
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

    //exportar archivo excel
    const handleExport = () => {

        const dataToExport = items.map(item => ({
            ID: item.id,
            name: item.name,
            price_sale: Number(item.price_sale),
            price_input: Number(item.price_input),
            Balance: Number(item.price_sale) - Number(item.price_input)
        }));

        exportToExcel(dataToExport, "inventario_pos35X", "Inventario");
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        await api.post("/pos35X/import", formData);

        alert("Archivo importado");
    };


    return (
        <>
            <div className="p-4 sm:p-6">
                <div>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center 
                                pr-10 pl-10 p-5 bg-blue-900 hover:bg-blue-400 
                                text-white rounded-lg 
                                transition duration-200 
                                active:scale-95
                                cursor-pointer"
                    >
                        <img src="icons/Arrow-Back.svg" alt="Back" className="w-7 h-7" />
                    </button>                </div>


                <div className="flex flex-col sm:flex-row justify-around gap-4 mb-8 mt-8">
                    <button
                        onClick={handleExport}
                        className="cursor-pointer flex bg-blue-700 p-2 rounded-2xl items-center">
                        <img src="icons/document-download.svg" alt="" className="w-10" /> Exportar hoja excel
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-2 border">id</th>
                                <th className="p-2 border">imagen</th>
                                <th className="p-2 border">Nombre</th>
                                <th className="p-2 border">Precio publico</th>
                                <th className="p-2 border">Precio de insumo</th>
                                <th className="p-2 border">Balance</th>
                                <th className="p-2 border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="p-2 border">{item.id}</td>
                                    <td className="p-2 border">
                                        <img
                                            src={`http://localhost:3000/uploads/${item.img}`}
                                            alt={item.name}
                                            className="w-20 h-20 "
                                        />
                                    </td>
                                    <td className="p-2 border">{item.name}</td>
                                    <td className="p-2 border">{formatCurrency(item.price_sale)}</td>
                                    <td className="p-2 border">{formatCurrency(item.price_input)}</td>
                                    <td className="p-2 border">{formatCurrency(Number(item.price_sale) - Number(item.price_input))}</td>
                                    <td className="p-2 border flex gap-5 justify-center">
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

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
                            <img src={preview} alt="preview" className="w-30 h-30 object-cover rounded mb-2" />
                        )}

                        <label htmlFor="">Seleccionar Imagen:</label><br />
                        <input type="file" className="bg-gray-700"
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

                    <button type="submit" className="bg-blue-800 p-1 rounded-sm">
                        Guardar cambios
                    </button>

                </form>

            </Modal>
        </>
    )
}