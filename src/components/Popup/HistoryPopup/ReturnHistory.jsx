import React from "react";
import backgroundImage from "../../../assets/orderhistory/bg2.jpg";
import closeIcon from "../../../assets/orderhistory/close.png";
import TableContainer from "../../historypages/TableContainer.jsx";

const OrderHistoryPage = ({ show, onClose }) => {
    return (
        <div>
            {/* Modal Component */}
            {show && ( // Corrected from showModal to show
                <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    {/* Modal Content */}
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border-4 border-transparent relative">
                        <div className="w-full min-h-screen bg-transparent relative">
                            {/* Background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center backdrop-blur-md"
                                style={{ backgroundImage: `url(${backgroundImage})` }}
                            ></div>

                            {/* Modal Content */}
                            <div className="relative z-10 p-8">
                                {/* Close Button */}
                                <img
                                    src={closeIcon}
                                    alt="Close"
                                    className="absolute top-4 right-4 w-8 h-8 cursor-pointer"
                                    onClick={onClose} // Use onClose prop to close the modal
                                />
                                <p className="text-3xl font-bold text-center mb-6">
                                    Return History
                                </p>
                                <div className="container">
                                    {/* Table Header */}
                                    <div className="flex bg-200 mx-5 rounded-t-lg">
                                        <div className="w-1/5 text-black">Order ID</div>
                                        <div className="w-1/5 text-black">Date</div>
                                        <div className="w-1/5 text-black">Time</div>
                                        <div className="w-1/5 text-black">Status</div>
                                        <div className="w-1/5"></div>
                                    </div>
                                </div>
                                {/* Table Container */}
                                <TableContainer />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;