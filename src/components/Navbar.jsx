import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const allData = [
        ...(store.people || []).map(item => ({ ...item, type: "people" })),
        ...(store.planets || []).map(item => ({ ...item, type: "planets" })),
        ...(store.vehicles || []).map(item => ({ ...item, type: "vehicles" }))
    ];

    const suggestions = search.length > 0 
        ? allData.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5) 
        : [];

    return (
        <nav className="navbar navbar-dark bg-dark mb-3 px-5 shadow">
            <Link to="/" style={{ textDecoration: "none" }}>
                <span className="navbar-brand mb-0 h1 text-warning fw-bold">STAR WARS</span>
            </Link>

            <div className="dropdown" style={{ width: "300px" }}>
                <input
                    type="text"
                    className="form-control bg-secondary text-white border-0"
                    placeholder="Search characters, planets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {suggestions.length > 0 && (
                    <ul className="dropdown-menu show w-100 position-absolute shadow-lg bg-dark border-secondary">
                        {suggestions.map((item, index) => (
                            <li key={index}>
                                <button 
                                    className="dropdown-item text-white hover-warning"
                                    onClick={() => {
                                        navigate(`/single/${item.type}/${item.uid}`);
                                        setSearch(""); 
                                    }}
                                >
                                    <small className="text-info">[{item.type}]</small> {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="ml-auto">
                <div className="dropdown">
                    <button 
                        className="btn btn-primary dropdown-toggle d-flex align-items-center" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        Favorites 
                        <span className="badge bg-warning text-dark ms-2">{store.favorites.length}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary shadow-lg" aria-labelledby="dropdownMenuButton" style={{ minWidth: "200px" }}>
                        {store.favorites.length === 0 ? (
                            <li className="px-3 py-2 text-white-50 text-center">Empty List</li>
                        ) : (
                            store.favorites.map((fav, i) => (
                                <li key={i} className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom border-secondary text-white">
                                    <span style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                                        {fav}
                                    </span>
                                    <i 
                                        className="fas fa-trash text-danger ms-3" 
                                        style={{ cursor: "pointer" }} 
                                        title="Remove from favorites"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            dispatch({ type: "delete_favorite", payload: fav });
                                        }}
                                    ></i>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};