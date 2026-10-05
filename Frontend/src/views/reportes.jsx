import api from "../api/api";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { exportToReports } from "../utils/exportReports";
import { Cat, Rabbit, CreditCard, Banknote, ArrowLeftRight } from "lucide-react";

// Helper para convertir los números a formato de moneda
const formatCurrency = (value) => {
    if (value === undefined || value === null) return "$0.00";
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
};


export const Reportes = () => {

    //Formateo de fechas
    const formatDay = (date) => {
        // Agregar T00:00:00 fuerza interpretación local en vez de UTC
        const localDate = new Date(date + 'T00:00:00');
        return localDate.toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'short'
        });
    };

    const [summary, setSummary] = useState(null);
    const [salesDay, setSalesDay] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    // Nuevos estados para HOY
    const [todaySummary, setTodaySummary] = useState(null);
    const [salesByType, setSalesByType] = useState([]);


    //Llamada a la API para obtener datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const todayRes = await api.get("/pos35X/sale/day");
                setTodaySummary(todayRes.data);

                const monthRes = await api.get("/pos35X/sale/month");
                setSummary(monthRes.data);

                const historyRes = await api.get("/pos35X/sale/history");
                console.log("Datos de ventas:", historyRes.data);
                setSalesDay(historyRes.data);

                const topRes = await api.get("/pos35X/sale/top");
                setTopProducts(topRes.data);

                const typeRes = await api.get("/pos35X/sale/type");
                setSalesByType(typeRes.data);

            } catch (error) {
                console.error("Error al obtener reportes", error);
            }
        };

        fetchData();
    }, []);

    //exportar archivo excel reportes de hoy
    const handleExportToExcel = () => {

        if (!todaySummary) return;

        const dataToExport = [
            {
                Ventas_del_dia: todaySummary.sales,
                Total_de_ventas: Number(todaySummary.totalSales),
                IVA_generado: Number(todaySummary.ivaGenerated),
                Inversion: Number(todaySummary.total_input),
                Utilidad: Number(todaySummary.sales) - Number(todaySummary.ivaGenerated) - Number(todaySummary.total_input)
            }
        ];
        // Fecha actual
        const today = new Date();
        const formattedDate = today.toLocaleDateString();
        exportToReports(dataToExport, `reporte del dia ${formattedDate}`, "Reporte");
    };

    //exportar archivo excel reportes mensuales
    const handleMontToExcel = () => {
        if (!todaySummary) return;
        const dataToExport = [
            {
                Ventas_del_mes: summary?.monthlySales,
                Total_de_ventas: Number(summary?.totalSales),
                IVA_generado: Number(summary?.ivaGenerated),
                Inversion: Number(summary?.total_inputm),
                Utilidad: Number(summary?.monthlySales) - Number(summary?.ivaGenerated) - Number(summary?.total_inputm)
            }
        ];
        // Fecha actual
        const today = new Date();
        const formattedDate = today.toLocaleDateString();
        exportToReports(dataToExport, `reporte del mes ${formattedDate}`, "Reporte");

    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6 overflow-y-auto pt-14 xl:pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Reportes</h1>

            </div>


            {/* Cards de HOY */}
            <h2 className="text-xl font-bold mb-4 text-gray-200 border-b border-gray-800 pb-2">Resumen de Hoy</h2>
            <button
                onClick={handleExportToExcel}
                className="cursor-pointer flex decoration underline items-center mb-5">
                <img src="icons/document-download.svg" alt="" className="w-5" /> Exportar reporte de hoy
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-900/60 to-gray-900 p-5 rounded-2xl shadow-xl border border-indigo-800/50 hover:border-indigo-500/50 transition-colors">
                    <p className="text-indigo-200 text-sm mb-1 font-medium pb-1 border-b border-indigo-800/50">Ventas de Hoy</p>
                    <h2 className="text-2xl font-black text-white mt-2">{formatCurrency(todaySummary?.sales)}</h2>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/60 to-gray-900 p-5 rounded-2xl shadow-xl border border-indigo-800/50 hover:border-indigo-500/50 transition-colors">
                    <p className="text-indigo-200 text-sm mb-1 font-medium pb-1 border-b border-indigo-800/50">Total Ventas</p>
                    <h2 className="text-2xl font-black text-white mt-2">{todaySummary?.totalSales} Ventas</h2>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/60 to-gray-900 p-5 rounded-2xl shadow-xl border border-indigo-800/50 hover:border-indigo-500/50 transition-colors">
                    <p className="text-indigo-200 text-sm mb-1 font-medium pb-1 border-b border-indigo-800/50">IVA de Hoy</p>
                    <h2 className="text-2xl font-black text-emerald-400 mt-2">{formatCurrency(todaySummary?.ivaGenerated)}</h2>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/60 to-gray-900 p-5 rounded-2xl shadow-xl border border-indigo-800/50 hover:border-indigo-500/50 transition-colors">
                    <p className="text-indigo-200 text-sm mb-1 font-medium pb-1 border-b border-indigo-800/50">Inversion</p>
                    <h2 className="text-2xl font-black text-red-400 mt-2">{formatCurrency(todaySummary?.total_input)} </h2>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/60 to-gray-900 p-5 rounded-2xl shadow-xl border border-indigo-800/50 hover:border-indigo-500/50 transition-colors">
                    <p className="text-indigo-200 text-sm mb-1 font-medium pb-1 border-b border-indigo-800/50">Utilidad (Ganancias hoy)</p>
                    <h2 className="text-2xl font-black text-emerald-400 mt-2">{formatCurrency(todaySummary?.sales - todaySummary?.ivaGenerated - todaySummary?.total_input)} </h2>
                </div>
            </div>


            {/* Cards resumen Mensual/Filtro */}
            <h2 className="text-xl font-bold mb-4 text-gray-200 border-b border-gray-800 pb-2">
                Resumen del mes
            </h2>
            <button
                onClick={handleMontToExcel}
                className="cursor-pointer flex decoration underline items-center mb-5">
                <img src="icons/document-download.svg" alt="" className="w-5" /> Exportar reporte del mes
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 opacity-90">
                <div className="bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-800">
                    <p className="text-gray-400 text-sm mb-1">Ventas del Mes</p>
                    <h2 className="text-2xl font-bold text-indigo-400">{formatCurrency(summary?.monthlySales)}</h2>
                </div>

                <div className="bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-800">
                    <p className="text-gray-400 text-sm mb-1">Total Ventas</p>
                    <h2 className="text-2xl font-bold text-indigo-400">{summary?.totalSales || 0} Ventas</h2>
                </div>

                <div className="bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-800">
                    <p className="text-gray-400 text-sm mb-1">IVA Generado</p>
                    <h2 className="text-2xl font-bold text-emerald-400">{formatCurrency(summary?.ivaGenerated)}</h2>
                </div>


                <div className="bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-800">
                    <p className="text-gray-400 text-sm mb-1">Inversion</p>
                    <h2 className="text-2xl font-bold text-red-400">
                        {formatCurrency(summary?.total_inputm)}
                    </h2>
                </div>

                <div className="bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-800">
                    <p className="text-gray-400 text-sm mb-1">Utilidad (Ganancias)</p>
                    <h2 className="text-2xl font-bold text-emerald-400">
                        {formatCurrency(summary?.monthlySales - summary?.ivaGenerated - summary?.total_inputm)}
                    </h2>
                </div>
            </div>

            {/* Sección inferior */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">

                {/* Gráfica Ventas */}
                <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
                    <h3 className="mb-4 text-lg font-semibold border-b border-gray-800 pb-2">
                        Ventas por Día
                    </h3>

                    {salesDay && salesDay.length > 0 ? (
                        <ResponsiveContainer width="100%" height={320}>
                            <AreaChart data={salesDay} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>

                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />

                                <XAxis
                                    dataKey="day"
                                    tickFormatter={formatDay}
                                    stroke="#9ca3af"
                                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                    minTickGap={30}
                                />
                                <YAxis
                                    domain={[0, 'auto']}
                                    stroke="#9ca3af"
                                    tickFormatter={(value) => `$${value}`}
                                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dx={-10}
                                />
                                <Tooltip
                                    formatter={(value, name) => [
                                        formatCurrency(value),
                                        name === "total" ? "Ventas" : "Ganancias"
                                    ]}
                                    labelFormatter={(label) => `Fecha: ${formatDay(label)}`}
                                    contentStyle={{
                                        backgroundColor: "rgba(17, 24, 39, 0.8)",
                                        backdropFilter: "blur(8px)",
                                        borderColor: "#374151",
                                        borderRadius: "12px",
                                        color: "#f3f4f6",
                                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                                    }}

                                    cursor={{ stroke: '#4b5563', strokeWidth: 1, strokeDasharray: '3 3' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={0.6}
                                    fill="url(#colorTotal)"
                                    activeDot={{ r: 6, fill: "#818cf8", stroke: "#ffffff", strokeWidth: 2 }}
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                />

                                <Area
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={0.6}
                                    fill="url(#colorProfit)"
                                    activeDot={{ r: 6, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
                            "No hay ventas registradas aún. Empieza a vender para ver estadísticas aquí."
                            <Rabbit className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                    )}
                </div>

                {/* Tabla de Productos Top */}
                <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 flex flex-col">
                    <h3 className="mb-4 text-lg font-semibold border-b border-gray-800 pb-2">
                        Top productos con mas ganancias
                    </h3>

                    {topProducts && topProducts.length > 0 ? (
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-sm text-left">
                                <thead className="text-gray-400 capitalize">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Producto</th>
                                        <th className="px-4 py-3 font-medium">Cantidad</th>
                                        <th className="px-4 py-3 font-medium">Ingresos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts.map((product) => (
                                        <tr key={product.id || product.name} className="border-b border-gray-800/60 hover:bg-gray-800/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-200">
                                                {product.name}
                                            </td>
                                            <td className="px-4 py-3 text-gray-300">
                                                <span className="bg-gray-800 px-2 py-1 rounded-md text-xs font-semibold">{product.quantity}</span>
                                            </td>
                                            <td className="px-4 py-3 text-emerald-400 font-medium tracking-wide">
                                                {formatCurrency(product.revenue)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm py-12">
                            "No hay datos aún. Empieza a vender para ver los productos más vendidos."
                            <Cat className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                    )}
                </div>
            </div>

            {/* Ventas por Tipo de Pago */}
            <h2 className="text-xl font-bold mb-4 text-gray-200 border-b border-gray-800 pb-2 mt-2">
                Ventas por Método de Pago (Mes actual)
            </h2>

            {salesByType && salesByType.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                    {salesByType.map((item) => {
                        const type = item.tipe_sale;

                        const config = {
                            tarjeta: {
                                icon: <CreditCard className="w-8 h-8" />,
                                gradient: "from-blue-900/60 to-gray-900",
                                border: "border-blue-700/50",
                                hoverBorder: "hover:border-blue-500",
                                accent: "text-blue-400",
                                badge: "bg-blue-500/20 text-blue-300",
                                label: "Tarjeta"
                            },
                            efectivo: {
                                icon: <Banknote className="w-8 h-8" />,
                                gradient: "from-emerald-900/60 to-gray-900",
                                border: "border-emerald-700/50",
                                hoverBorder: "hover:border-emerald-500",
                                accent: "text-emerald-400",
                                badge: "bg-emerald-500/20 text-emerald-300",
                                label: "Efectivo"
                            },
                            transferencia: {
                                icon: <ArrowLeftRight className="w-8 h-8" />,
                                gradient: "from-purple-900/60 to-gray-900",
                                border: "border-purple-700/50",
                                hoverBorder: "hover:border-purple-500",
                                accent: "text-purple-400",
                                badge: "bg-purple-500/20 text-purple-300",
                                label: "Transferencia"
                            }
                        };

                        const c = config[type] || {
                            icon: <CreditCard className="w-8 h-8" />,
                            gradient: "from-gray-800 to-gray-900",
                            border: "border-gray-700",
                            hoverBorder: "hover:border-gray-500",
                            accent: "text-gray-400",
                            badge: "bg-gray-500/20 text-gray-300",
                            label: type
                        };

                        return (
                            <div
                                key={type}
                                className={`bg-gradient-to-br ${c.gradient} p-6 rounded-2xl shadow-xl border ${c.border} ${c.hoverBorder} transition-all duration-300`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`${c.badge} p-2.5 rounded-xl`}>
                                            {c.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{c.label}</h3>
                                            <p className="text-gray-400 text-sm">{item.totalSales} ventas</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm">Ingresos</p>
                                        <p className={`text-xl font-bold ${c.accent}`}>{formatCurrency(item.revenue)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm">IVA</p>
                                        <p className="text-gray-300 font-medium">{formatCurrency(item.iva)}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm">Inversión</p>
                                        <p className="text-red-400 font-medium">{formatCurrency(item.investment)}</p>
                                    </div>
                                    <hr className="border-gray-700/50" />
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-300 text-sm font-semibold">Utilidad</p>
                                        <p className="text-emerald-400 text-lg font-bold">{formatCurrency(item.profit)}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 text-center text-gray-500 mb-12">
                    No hay datos de ventas por método de pago aún.
                </div>
            )}
        </div>
    );
};