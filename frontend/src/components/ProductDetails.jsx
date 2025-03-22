function ProductDetails({ data }) {
    if (!data) return null; // 🛑 Prevents rendering before data is available

    return (
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-3xl mt-6">
            <h2 className="text-2xl font-bold text-gray-800">{data.productName || "No Name Available"}</h2>
            <p className="text-gray-600"><strong>Rating:</strong> {data.rating || "N/A"} ({data.numberOfRatings || "N/A"})</p>
            <p className="text-gray-600"><strong>Price:</strong> {data.price || "N/A"} <span className="text-red-500">{data.discount || ""}</span></p>

            {/* 🛑 Check if aboutThisItem exists before mapping */}
            {data.aboutThisItem && Array.isArray(data.aboutThisItem) && data.aboutThisItem.length > 0 ? (
                <>
                    <h3 className="text-lg font-semibold mt-4 text-gray-800">About this Item:</h3>
                    <ul className="list-disc pl-6 text-gray-600">
                        {data.aboutThisItem.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </>
            ) : (
                <p className="text-gray-500">No information available.</p>
            )}

            {/* 🛑 Check if productImages exists before rendering */}
            {data.productImages && Array.isArray(data.productImages) && data.productImages.length > 0 ? (
                <>
                    <h3 className="text-lg font-semibold mt-4 text-gray-800">Product Images:</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {data.productImages.map((img, idx) => (
                            <img key={idx} src={img} alt="Product" className="w-32 h-32 object-cover rounded-md" />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-gray-500">No images available.</p>
            )}
        </div>
    );
}

export default ProductDetails;
