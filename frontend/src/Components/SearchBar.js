import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

// searchBar, SearchResult, and SearchResults lists adapted from https://www.youtube.com/watch?v=sWVgMcz8Q44&t=146s

export const SearchBar = ({ setFilteredCourses }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("/api/courses")
            .then((response) => response.json())
            .then(json => {
                let results;
                if (value.trim() === "") {
                    results = json;
                } else {
                    results = json.filter((course) => {
                        return (
                            course && 
                            course.course_code && 
                            course.course_code.toLowerCase().includes(value.toLowerCase())
                        );
                    });
                }
                setFilteredCourses(results);
            });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                placeholder="Type to search..." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}
            />    
        </div>
    );
}