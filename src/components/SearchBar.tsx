import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    const clearSearch = () => {
        setSearchQuery('');
        onSearch('');
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                />
                {searchQuery && (
                    <button onClick={clearSearch} className="clear-search-btn">
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
