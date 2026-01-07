import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <div className="card m-2 shadow" style={{ minWidth: "18rem", background: "#212529", color: "white", border: "1px solid #444" }}>
            <div 
                className="d-flex align-items-center justify-content-center bg-secondary" 
                style={{ height: "250px", width: "100%", color: "#ccc" }}
            >
                <i className="fas fa-camera fa-3x"></i>
            </div>

            <div className="card-body">
                <h5 className="card-title text-warning">{item.name}</h5>
                <p className="card-text text-muted">ID: {item.uid}</p>
                
                <div className="d-flex justify-content-between pt-3">
                    <Link to={`/single/${type}/${item.uid}`} className="btn btn-outline-primary">
                        Learn more!
                    </Link>
                    <button
                        className="btn btn-outline-warning"
                        onClick={() => dispatch({ type: "add_favorite", payload: item.name })}
                    >
                        <i className={store.favorites?.includes(item.name) ? "fas fa-heart" : "far fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};