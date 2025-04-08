import { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => { // Accept onSearch as a prop
    const [location, setLocation] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(location)
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className={`search-container ${isFocused ? "focused" : ""}`}>
                <svg
                    className="search-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search for a location..."
                    className="search-input"
                />
                <button type="submit" className="search-button" aria-label="Search">
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;