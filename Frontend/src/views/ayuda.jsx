export const Ayuda = () => {
    return (
        <>
            {/*-- ==========================================================================
                Hero de ayuda
       ========================================================================== */}
            <section className="px-6 py-16 md:px-25 md:py-24 bg-gray-950 text-white text-center">
                <span
                    className="inline-block tip-chip text-blue-300 text-xs font-medium tracking-wide uppercase px-4 py-1.5 rounded-full mb-6 scroll-reveal">
                    Centro de ayuda
                </span>
                <h1 className="text-3xl md:text-5xl font-medium mb-5 leading-tight scroll-reveal">
                    Aprende a usar POS365<br className="hidden md:block" /> en 7 pasos
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto leading-relaxed scroll-reveal">
                    Desde la pantalla de inicio hasta tu primer reporte de ganancias. Sigue el recorrido en orden o salta
                    directo al tema que necesitas.
                </p>
            </section>

            {/*-- ==========================================================================
                Navegación rápida por temas
       ========================================================================== */}
            {/*
            <section className="px-6 md:px-25 pb-12 bg-gray-950">
                <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto scroll-reveal">
                    <a href="#paso-1"
                        className="quicknav-pill text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-full hover:text-white hover:border-blue-400/50">1.
                        Inicio</a>
                    <a href="#paso-2"
                        className="quicknav-pill text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-full hover:text-white hover:border-blue-400/50">2.
                        Vender</a>
                    <a href="#paso-3"
                        className="quicknav-pill text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-full hover:text-white hover:border-blue-400/50">3.
                        Cobrar</a>
                    <a href="#paso-4"
                        className="quicknav-pill text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-full hover:text-white hover:border-blue-400/50">4.
                        Ticket</a>
                    <a href="#paso-5"
                        className="quicknav-pill text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-full hover:text-white hover:border-blue-400/50">5.
                        Historial</a>
                    <a href="#paso-6"
                        className="quicknav-pill text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-full hover:text-white hover:border-blue-400/50">6.
                        Reportes</a>
                    <a href="#paso-7"
                        className="quicknav-pill text-sm text-slate-300 border border-slate-700 px-4 py-2 rounded-full hover:text-white hover:border-blue-400/50">7.
                        Configuración</a>
                </div>
            </section>
            */}
            {/*-- ==========================================================================
                Stepper: flujo de uso completo
       ========================================================================== */}
            <section className="px-6 py-8 md:px-25 md:py-12 bg-gray-950 text-white">
                <div className="step-rail max-w-5xl mx-auto">

                    {/*-- Paso 1 Inicio */}
                    <div id="paso-1" className="flex gap-5 md:gap-8 mb-14 md:mb-20 scroll-mt-28 scroll-reveal">
                        <div
                            className="step-dot w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-lg md:text-xl font-semibold">
                            1</div>
                        <div className="step-card rounded-2xl p-6 md:p-8 w-full">
                            <span className="text-xs font-medium tracking-widest uppercase text-blue-400 mb-2 block">Pantalla
                                principal</span>
                            <h2 className="text-xl md:text-2xl font-medium mb-3">Empieza desde la pantalla de Inicio</h2>
                            <p className="text-slate-400 leading-relaxed mb-5">
                                Al abrir POS365 verás un panel con accesos directos a cada función: Productos, Vender,
                                Historial de ventas, Reportes y Configuraciones. Desde el menú lateral izquierdo puedes
                                moverte entre secciones en cualquier momento.
                            </p>
                            <div className="frame-img rounded-xl p-3 mb-5">
                                <img src="assets/imgs/02.png" alt="Pantalla de inicio de POS365 con accesos directos"
                                    className="w-full rounded-lg" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="tip-chip text-blue-300 text-xs px-3 py-1.5 rounded-full"><i
                                    className="fa-solid fa-lightbulb mr-1.5"></i>El menú lateral está siempre
                                    disponible</span>
                            </div>
                        </div>
                    </div>

                    {/*-- Paso 2  Vender */}
                    <div id="paso-2" className="flex gap-5 md:gap-8 mb-14 md:mb-20 scroll-mt-28 scroll-reveal">
                        <div
                            className="step-dot w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-lg md:text-xl font-semibold">
                            2</div>
                        <div className="step-card rounded-2xl p-6 md:p-8 w-full">
                            <span className="text-xs font-medium tracking-widest uppercase text-blue-400 mb-2 block">Sección de
                                ventas</span>
                            <h2 className="text-xl md:text-2xl font-medium mb-3">Arma una orden en segundos</h2>
                            <p className="text-slate-400 leading-relaxed mb-5">
                                Entra a <strong className="text-slate-200">Vender</strong> desde el menú lateral. Usa el
                                buscador para encontrar un producto o tócalo directamente en la lista, y presiona <strong
                                    className="text-slate-200">Agregar +</strong> para sumarlo a la orden. El panel derecho se
                                actualiza al instante con cada producto que agregues.
                            </p>
                            <div className="frame-img rounded-xl p-3 mb-5">
                                <img src="assets/imgs/03.png" alt="Sección de ventas con buscador y panel de orden"
                                    className="w-full rounded-lg" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="tip-chip text-blue-300 text-xs px-3 py-1.5 rounded-full"><i
                                    className="fa-solid fa-lightbulb mr-1.5"></i>Usa + y �^' para ajustar cantidades sin
                                    borrar el producto</span>
                                <span className="tip-chip text-blue-300 text-xs px-3 py-1.5 rounded-full"><i
                                    className="fa-solid fa-lightbulb mr-1.5"></i>La X roja elimina el producto de la
                                    orden</span>
                            </div>
                        </div>
                    </div>

                    {/*-- Paso 3 �?" Cobrar */}
                    <div id="paso-3" className="flex gap-5 md:gap-8 mb-14 md:mb-20 scroll-mt-28 scroll-reveal">
                        <div
                            className="step-dot w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-lg md:text-xl font-semibold">
                            3</div>
                        <div className="step-card rounded-2xl p-6 md:p-8 w-full">
                            <span className="text-xs font-medium tracking-widest uppercase text-blue-400 mb-2 block">Método de
                                pago</span>
                            <h2 className="text-xl md:text-2xl font-medium mb-3">Completa el cobro</h2>
                            <p className="text-slate-400 leading-relaxed mb-5">
                                Cuando la orden esté lista, presiona <strong className="text-slate-200">Completar
                                    venta</strong>. Elige entre <strong className="text-slate-200">Tarjeta</strong>, <strong
                                        className="text-slate-200">Transferencia</strong> o <strong
                                            className="text-slate-200">Efectivo</strong>. Si seleccionas efectivo, escribe el monto
                                recibido y POS365 calculará el cambio automáticamente.
                            </p>
                            <div className="frame-img rounded-xl p-3 mb-5">
                                <img src="assets/imgs/04.png" alt="Modal de método de pago con cálculo de cambio"
                                    className="w-full rounded-lg" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="tip-chip text-blue-300 text-xs px-3 py-1.5 rounded-full"><i
                                    className="fa-solid fa-lightbulb mr-1.5"></i>Puedes cancelar la venta en cualquier
                                    momento antes de confirmar</span>
                            </div>
                        </div>
                    </div>

                    {/*-- Paso 4 �?" Ticket */}
                    <div id="paso-4" className="flex gap-5 md:gap-8 mb-14 md:mb-20 scroll-mt-28 scroll-reveal">
                        <div
                            className="step-dot w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-lg md:text-xl font-semibold">
                            4</div>
                        <div className="step-card rounded-2xl p-6 md:p-8 w-full">
                            <span
                                className="text-xs font-medium tracking-widest uppercase text-blue-400 mb-2 block">Comprobante</span>
                            <h2 className="text-xl md:text-2xl font-medium mb-3">Imprime o guarda el ticket</h2>
                            <p className="text-slate-400 leading-relaxed mb-5">
                                Al confirmar el pago, POS365 genera automáticamente el ticket con el nombre de tu negocio,
                                número de venta, fecha y hora, detalle de productos, subtotal, IVA y total. Presiona <strong
                                    className="text-slate-200">Imprimir ticket</strong> para entregarlo al cliente.
                            </p>
                            <div className="frame-img rounded-xl p-3 mb-5">
                                <img src="assets/imgs/05.png" alt="Ticket de venta generado con el detalle de la compra"
                                    className="w-full rounded-lg" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="tip-chip text-blue-300 text-xs px-3 py-1.5 rounded-full"><i
                                    className="fa-solid fa-lightbulb mr-1.5"></i>El nombre del negocio en el ticket se
                                    configura en el paso 7</span>
                            </div>
                        </div>
                    </div>

                    {/*-- Paso 5 �?" Historial */}
                    <div id="paso-5" className="flex gap-5 md:gap-8 mb-14 md:mb-20 scroll-mt-28 scroll-reveal">
                        <div
                            className="step-dot w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-lg md:text-xl font-semibold">
                            5</div>
                        <div className="step-card rounded-2xl p-6 md:p-8 w-full">
                            <span className="text-xs font-medium tracking-widest uppercase text-blue-400 mb-2 block">Registro de
                                ventas</span>
                            <h2 className="text-xl md:text-2xl font-medium mb-3">Consulta ventas anteriores</h2>
                            <p className="text-slate-400 leading-relaxed mb-5">
                                En <strong className="text-slate-200">Historial de ventas</strong> verás cada transacción
                                ordenada por fecha junto a su total. Presiona el ícono del ojo en cualquier fila para
                                reabrir el ticket completo de esa venta.
                            </p>
                            <div className="frame-img rounded-xl p-3 mb-5">
                                <img src="assets/imgs/06.png" alt="Tabla de historial de ventas con fecha y total"
                                    className="w-full rounded-lg" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="tip-chip text-blue-300 text-xs px-3 py-1.5 rounded-full"><i
                                    className="fa-solid fa-lightbulb mr-1.5"></i>�stil para resolver dudas o reclamos de
                                    clientes</span>
                            </div>
                        </div>
                    </div>

                    {/*-- Paso 6 �?" Reportes */}
                    <div id="paso-6" className="flex gap-5 md:gap-8 mb-14 md:mb-20 scroll-mt-28 scroll-reveal">
                        <div
                            className="step-dot w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-lg md:text-xl font-semibold">
                            6</div>
                        <div className="step-card rounded-2xl p-6 md:p-8 w-full">
                            <span className="text-xs font-medium tracking-widest uppercase text-blue-400 mb-2 block">Métricas
                                del negocio</span>
                            <h2 className="text-xl md:text-2xl font-medium mb-3">Revisa cómo va tu negocio</h2>
                            <p className="text-slate-400 leading-relaxed mb-5">
                                La sección <strong className="text-slate-200">Reportes</strong> muestra el resumen de hoy y del
                                mes: ventas, IVA, inversión y utilidad. Más abajo, la gráfica de ventas por día y la tabla
                                de productos más rentables te ayudan a identificar qué vender más. Exporta cualquier reporte
                                a Excel con el enlace correspondiente.
                            </p>
                            <div className="frame-img rounded-xl p-3 mb-5">
                                <img src="assets/imgs/07.png" alt="Reportes con métricas, gráfica de ventas y top productos"
                                    className="w-full rounded-lg" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="tip-chip text-blue-300 text-xs px-3 py-1.5 rounded-full"><i
                                    className="fa-solid fa-lightbulb mr-1.5"></i>Pasa el cursor sobre la gráfica para ver el
                                    detalle de un día</span>
                            </div>
                        </div>
                    </div>

                    {/*-- Paso 7 �?" Configuración */}
                    <div id="paso-7" className="flex gap-5 md:gap-8 scroll-mt-28 scroll-reveal">
                        <div
                            className="step-dot w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-lg md:text-xl font-semibold">
                            7</div>
                        <div className="step-card rounded-2xl p-6 md:p-8 w-full">
                            <span
                                className="text-xs font-medium tracking-widest uppercase text-blue-400 mb-2 block">Personalización</span>
                            <h2 className="text-xl md:text-2xl font-medium mb-3">Configura el nombre de tu negocio</h2>
                            <p className="text-slate-400 leading-relaxed mb-5">
                                Entra a <strong className="text-slate-200">Configuraciones</strong> y toca <strong
                                    className="text-slate-200">Nombre del negocio</strong>. Escribe el nombre que quieres que
                                aparezca en tus tickets y presiona <strong className="text-slate-200">Guardar nombre</strong>.
                                Si no lo configuras, tus tickets mostrarán "POS365" por defecto.
                            </p>
                            <div className="frame-img rounded-xl p-3 mb-5">
                                <img src="assets/imgs/09.png" alt="Formulario para configurar el nombre del negocio"
                                    className="w-full rounded-lg" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="tip-chip text-blue-300 text-xs px-3 py-1.5 rounded-full"><i
                                    className="fa-solid fa-triangle-exclamation mr-1.5"></i><strong>Restaurar de
                                        fábrica</strong> borra todos tus productos, ventas e historial</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/*-- ==========================================================================
                FAQ
       ========================================================================== */}
            <section className="px-6 py-16 md:px-25 md:py-24 bg-gray-950 text-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center scroll-reveal">Preguntas frecuentes</h2>

                    <div className="space-y-3 scroll-reveal">

                        <details className="step-card rounded-xl px-5 py-4 group">
                            <summary
                                className="flex items-center justify-between cursor-pointer list-none font-medium text-slate-200">
                                ¿Puedo usar POS365 sin conexión a internet?
                                <i
                                    className="fa-solid fa-chevron-down text-blue-400 text-sm faq-chevron transition-transform duration-200"></i>
                            </summary>
                            <p className="text-slate-400 mt-3 leading-relaxed">
                                Sí. POS365 funciona de forma local en tu computadora, por lo que puedes vender, cobrar y
                                consultar reportes sin depender de una conexión a internet.
                            </p>
                        </details>

                        <details className="step-card rounded-xl px-5 py-4 group">
                            <summary
                                className="flex items-center justify-between cursor-pointer list-none font-medium text-slate-200">
                                ¿Cómo agrego nuevos productos al catálogo?
                                <i
                                    className="fa-solid fa-chevron-down text-blue-400 text-sm faq-chevron transition-transform duration-200"></i>
                            </summary>
                            <p className="text-slate-400 mt-3 leading-relaxed">
                                Desde el menú lateral entra a <strong className="text-slate-200">Productos</strong>. Ahí puedes
                                agregar nombre, precio e imagen de cada artículo que quieras vender. Una vez guardado,
                                aparecerá disponible en la sección Vender.
                            </p>
                        </details>

                        <details className="step-card rounded-xl px-5 py-4 group">
                            <summary
                                className="flex items-center justify-between cursor-pointer list-none font-medium text-slate-200">
                                Restauré de fábrica por error, ¿puedo recuperar mis datos?
                                <i
                                    className="fa-solid fa-chevron-down text-blue-400 text-sm faq-chevron transition-transform duration-200"></i>
                            </summary>
                            <p className="text-slate-400 mt-3 leading-relaxed">
                                No, esta acción es permanente y elimina productos, ventas e historial. Por eso te lo
                                advertimos directamente en la pantalla de Configuraciones antes de confirmar.
                            </p>
                        </details>

                        <details className="step-card rounded-xl px-5 py-4 group">
                            <summary
                                className="flex items-center justify-between cursor-pointer list-none font-medium text-slate-200">
                                ¿Dónde reporto un error o pido una nueva función?
                                <i
                                    className="fa-solid fa-chevron-down text-blue-400 text-sm faq-chevron transition-transform duration-200"></i>
                            </summary>
                            <p className="text-slate-400 mt-3 leading-relaxed">
                                En el repositorio de GitHub del proyecto. Puedes abrir un issue describiendo el problema o
                                la mejora que te gustaría ver.
                            </p>
                        </details>

                    </div>
                </div>
            </section>

            {/*-- ==========================================================================
                CTA final
       ========================================================================== */}
            <section className="px-6 pb-20 md:px-25 md:pb-28 bg-gray-950 text-white text-center">
                <div className="step-card rounded-2xl p-10 md:p-14 max-w-3xl mx-auto scroll-reveal">
                    <h2 className="text-2xl md:text-3xl font-medium mb-3">¿Sigues con dudas?</h2>
                    <p className="text-slate-400 mb-7 max-w-md mx-auto">
                        Revisa el código fuente, reporta un problema o sugiere una mejora directamente en el repositorio del
                        proyecto.
                    </p>
                    <a href="https://github.com/CiberThanatos16/POS365" target="_blank" rel="noopener noreferrer"
                        className="mb-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg">
                        <i className="fa-brands fa-github"></i> Ir al repositorio de GitHub
                    </a>
                    <p>O</p>
                    <p className="mb-5">Reporta el error aquí</p>

                    <a href="https://forms.gle/vznYKhE94uz9U7PX6" target="_blank" rel="noopener noreferrer"
                        className="mb-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg">
                        <i className="fa-brands fa-google"></i> Reportar Error
                    </a>
                </div>
            </section>

        </>
    )
}
