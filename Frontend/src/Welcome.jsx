import { Link } from "react-router-dom";

export const Welcome = () => {
    return (
        <>
            <div className="p-8 ">
                <img src="images/white_pos365.png" alt="POS365" className="w-28 sm:w-42" />
                <div className="flex justify-center items-center mt-[128px] " >
                    <div className="w-[128px] h-[128px] mb-9 object-contain">
                        <img src="icon_pos360.png" alt="pos-365" className="w-full h-full " />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link to="/dashboard"
                        className="block w-3xl bg-blue-700 p-5 text-center text-2xl rounded-2xl hover:bg-blue-950">Comenzar
                    </Link>
                </div>
            </div>
        </>
    );
};