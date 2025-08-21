import React from "react";
import { FaMapMarkerAlt, FaPhone, FaInfoCircle, FaClock, FaStar } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import defaultImage from "../../assets/Empty image.jpg";

function OutletCard({ outlet }) {
    const getImageUrl = () => {
        if (!outlet.imageUrl) return defaultImage;
        try {
            return outlet.imageUrl;
        } catch (error) {
            console.error('Error processing image URL:', error);
            return defaultImage;
        }
    };

    const imageSrc = getImageUrl();

    // Status text formatting
    const statusText = outlet.status
        ? outlet.status.charAt(0).toUpperCase() + outlet.status.slice(1).toLowerCase()
        : "Inactive";

    // Status color based on status
    const getStatusColor = () => {
        switch (outlet.status?.toLowerCase()) {
            case 'open':
                return 'bg-green-500';
            case 'closed':
                return 'bg-red-500';
            case 'active':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="outlet-card">
            {/* Card Header with Image and Status */}
            <div className="card-header">
                <div className="image-container">
                    <img
                        src={imageSrc}
                        alt={outlet.outletName}
                        className="outlet-image"
                        onError={(e) => {
                            e.target.src = defaultImage;
                            e.target.onerror = null;
                        }}
                    />
                    {outlet.status === "Open" && (
                        <div className="status-badge open">
                            <MdOutlineVerified className="status-icon" />
                            <span>Open</span>
                        </div>
                    )}
                    {outlet.status === "Closed" && (
                        <div className="status-badge closed">
                            <span>Closed</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="card-content">
                <h3 className="outlet-name">
                    {outlet.outletName}
                </h3>

                {/* Location */}
                <div className="info-row">
                    <FaMapMarkerAlt className="info-icon location" />
                    <span className="info-text">{outlet.location}</span>
                </div>

                {/* Opening Hours */}
                <div className="info-row">
                    <FaClock className="info-icon hours" />
                    <span className="info-text">{outlet.openingHours}</span>
                </div>

                {/* Phone */}
                {outlet.phone && (
                    <div className="info-row">
                        <FaPhone className="info-icon phone" />
                        <span className="info-text">{outlet.phone}</span>
                    </div>
                )}
            </div>

        </div>
    );
}

export default OutletCard;