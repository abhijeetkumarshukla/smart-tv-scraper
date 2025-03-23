import { useState } from "react";
import axios from "axios";
import ScraperForm from "../components/ScraperForm";
import ProductDetails from "../components/ProductDetails";
import Navbar from "../components/Navbar";

function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url) => {
        setLoading(true);
        setData(null);
        try {
            const response = await axios.post("http://localhost:5000/scrape", { url });
            console.log("API Response:", response.data); 
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center">
            <Navbar />  
            
            
            <header className="text-center mt-10 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">Amazon Smart TV Scraper</h1>
                <p className="text-gray-600 mt-2 text-lg">Enter an Amazon product URL to extract product details instantly.</p>
            </header>

            
            <ScraperForm onSubmit={fetchData} />

             
            {loading && (
                <div className="mt-6 flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <p className="text-blue-600 mt-2">Fetching product details...</p>
                </div>
            )}

        
            {data && <ProductDetails data={data} />}
        </div>
    );
}

export default Home;
