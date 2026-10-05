import { Link } from "react-router-dom";
import { useInternetStatus } from "../hooks/internetStatus";
import { MessageCircleHeart, Cog, Store, HandHeart } from "lucide-react";


export const Payments = () => {
    const { handleClick } = useInternetStatus();
    return (
        <>
            <div className="m-auto">
                <div className="pb-5 pt-5 bg-gray-800 flex items-center justify-center">
                    <h1 className="text-2xl sm:text-3xl font-black">Tu contribución nos ayuda </h1>
                    <HandHeart className="w-10 h-10 sm:w-14 sm:h-14" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-15 p-5 sm:p-10">

                    <a href="https://www.paypal.com/donate/?hosted_button_id=58NR45VRMG8YL"
                        target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-3"
                        onClick={handleClick}>
                        <div className="content-icon bg-gray-800 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center">
                            <img src="icons/paypal.png" className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Paypal</p>
                    </a>

                    <a href="https://link.mercadopago.com.mx/pos360"
                        target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-3"
                        onClick={handleClick}>
                        <div className="content-icon bg-gray-800 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center">
                            <img src="icons/ML.png" className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Mercado Pago</p>
                    </a>

                    <a href="https://buy.stripe.com/7sY9AUc91bMc6WNeE9gUM00"
                        target="_blank" rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-3"
                        onClick={handleClick}>
                        <div className="content-icon bg-gray-800 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center">
                            <img src="icons/stripe.png" className="w-10 h-10 sm:w-14 sm:h-14" />
                        </div>

                        <p className="text-center">Stripe</p>
                    </a>


                </div>
            </div>
        </>
    );
};
