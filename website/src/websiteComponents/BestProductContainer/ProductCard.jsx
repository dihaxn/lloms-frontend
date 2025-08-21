import React from "react";
import defaultImage from "../../assets/Empty image.jpg";

const Product_Card = ({ item, showPrice = false }) => {
    // Handle both mock data and backend data
    let imageSrc = defaultImage;
    
    if (item.imageUrl) {
        if (item.imageUrl.startsWith('http')) {
            // Full URL from backend
            imageSrc = item.imageUrl;
        } else if (item.imageUrl.startsWith('/src/')) {
            // Mock data path - use default image
            imageSrc = defaultImage;
        } else {
            // Backend relative path
            imageSrc = `http://localhost:8080/api/v1/product/url/${item.imageUrl.split("\\").pop()}`;
        }
    }

    return (
        <div className="w-full h-[250px] rounded-[10px] overflow-hidden shadow-lg m-5">
            <img
                src={imageSrc}
                alt={item.productName || item.name}
                className="w-full h-[200px] object-cover"
                onError={(e) => {
                    // Fallback to default image if loading fails
                    e.target.src = defaultImage;
                }}
            />
            <p className="bg-[#F4952C] text-white text-center py-3 text-lg font-semibold">
                <span data-testid="product-name">{item.productName || item.name}</span>
                {showPrice && (
                    <>
                        <br />
                        <span data-testid="product-price">Rs.{item.price}</span>
                    </>
                )}
            </p>
        </div>
    );
};

export default Product_Card;