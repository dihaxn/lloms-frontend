import React from 'react';
import Addbox from "./Addbox.jsx";

const Navbarsidetext = () => {
    return (
        <div className="fixed right-[5%] top-1/2 -translate-y-1/2 transform text-right z-10">
            {/* Text Content */}
            <div>
                <span className="font-pacifico text-[30px] text-[#D07D00]">
                    Confectionery
                </span>
                <br/>
                <p className="font-['Quicksand'] text-[45px] leading-[1.2] m-0">
                    Make Your<br/>
                    Baking <br/>
                    Better <br/>
                    Tasting
                </p>
            </div>


        </div>
    );
};

export default Navbarsidetext;