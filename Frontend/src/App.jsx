import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './styles/App.css'
import { Welcome } from './Welcome'
import { Menu } from "./views/menu";
import { Dashboard } from "./views/dashboard";
import { Admin_Product } from "./views/Admin_product";
import { Vender } from "./views/vender";
import { Historial_Ventas } from "./views/historial_ventas";
import { TablaProducts } from "./views/tabla_products";
import { Reportes } from "./views/reportes";
import { Configuraciones } from "./views/config";
import { NameBusiness } from "./components/Config/NameBusiness";
import { Payments } from "./views/payments";
import { Ayuda } from "./views/ayuda";

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/dashboard" element={<Dashboard />}>
					<Route index element={<Menu />} />
					<Route path="menu" element={<Menu />} />
					<Route path="Admin_product" element={<Admin_Product />} />
					<Route path="vender" element={<Vender />} />
					<Route path="historial_Ventas" element={<Historial_Ventas />} />
					<Route path="tabla_products" element={<TablaProducts />} />
					<Route path="reportes" element={<Reportes />} />
					<Route path="configuraciones" element={<Configuraciones />} />
					<Route path="NameBusiness" element={<NameBusiness />} />
					<Route path="Payments" element={<Payments />} />
					<Route path="ayuda" element={<Ayuda />} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App
