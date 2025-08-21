import React from "react";
import defaultImage from "../../assets/Empty image.jpg";

const Product_Card = ({ item }) => {
    const imageName = item.imageUrl ? item.imageUrl.split("\\").pop() : null;
    const imageSrc = imageName
        ? `http://localhost:8080/api/v1/product/url/${imageName}`
        : defaultImage;

    return (
        <div className="w-full h-[250px] rounded-[10px] overflow-hidden shadow-lg m-5">
            <img
                src={imageSrc}
                alt={item.productName}
                className="w-full h-[200px] object-cover"
            />
            <p className="bg-[#F4952C] text-white text-center py-3 text-lg font-semibold">
                <span data-testid="product-name">{item.productName || item.name}</span> <br />
                <span data-testid="product-price">${item.price}</span>
            </p>
        </div>
    );
};

export default Product_Card;