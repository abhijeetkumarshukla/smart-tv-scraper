import { useState } from "react";

function ScraperForm({ onSubmit }) {
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) onSubmit(url);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-lg">
            <input
                type="text"
                placeholder="Enter Amazon product URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Scrape Product
            </button>
        </form>
    );
}

export default ScraperForm;
