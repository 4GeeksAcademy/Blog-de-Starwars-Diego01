import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.people.length === 0) {
            fetch("https://www.swapi.tech/api/people")
                .then(res => res.json())
                .then(data => dispatch({ type: "set_people", payload: data.results }))
                .catch(err => console.error(err));
        }
        
        if (store.planets.length === 0) {
            fetch("https://www.swapi.tech/api/planets")
                .then(res => res.json())
                .then(data => dispatch({ type: "set_planets", payload: data.results }))
                .catch(err => console.error(err));
        }
        
        if (store.vehicles.length === 0) {
            fetch("https://www.swapi.tech/api/vehicles")
                .then(res => res.json())
                .then(data => dispatch({ type: "set_vehicles", payload: data.results }))
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-danger mb-4">Characters</h2>
            <div className="d-flex flex-row overflow-auto pb-3">
                {store.people?.length > 0 ? (
                    store.people.map(item => <Card key={item.uid} item={item} type="people" />)
                ) : (
                    <div className="spinner-border text-warning" role="status"></div>
                )}
            </div>

            <h2 className="text-danger my-4">Planets</h2>
            <div className="d-flex flex-row overflow-auto pb-3">
                {store.planets?.length > 0 ? (
                    store.planets.map(item => <Card key={item.uid} item={item} type="planets" />)
                ) : (
                    <div className="spinner-border text-warning" role="status"></div>
                )}
            </div>

            <h2 className="text-danger my-4">Vehicles</h2>
            <div className="d-flex flex-row overflow-auto pb-3">
                {store.vehicles?.length > 0 ? (
                    store.vehicles.map(item => <Card key={item.uid} item={item} type="vehicles" />)
                ) : (
                    <div className="spinner-border text-warning" role="status"></div>
                )}
            </div>
        </div>
    );
};