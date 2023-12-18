import React, { useState, useEffect } from "react";
import style from "../css/AppHome.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

export default function AppHome() {

    const [photos, setPhotos] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/admin/photos");
                setPhotos(response.data);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
        fetchCategory();
    });

    const fetchCategory = async () => {
        try {
            const responseCategories = await axios.get(
                "http://localhost:3000/admin/categories"
            );
            console.log("CategoryFromBack:", responseCategories);
            setCategories(responseCategories.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };


    const [activeItem, setActiveItem] = useState(0);

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            // Freccia sinistra, decrementa l'elemento attivo
            setActiveItem((prev) => (prev - 1 + photos.length) % photos.length);
        } else if (event.key === 'ArrowRight') {
            // Freccia destra, incrementa l'elemento attivo
            setActiveItem((prev) => (prev + 1) % photos.length);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className={style.my_container}>

                <div className={style.counter}>
                    {activeItem + 1} / {photos.length}
                </div>

                <FontAwesomeIcon
                    icon="circle-chevron-left"
                    className={`fa-3x px-2 ${style.icon}`}
                    onClick={() => setActiveItem((prev) => (prev - 1 + photos.length) % photos.length)}
                />

                {photos.map((item, i) => (
                    <div key={i} className={`${style.carousel_container} ${i === activeItem ? style.active : ''}`}>
                        <div>
                            <img className={style.img_carousel} src={item.image} alt="" />
                        </div>
                        <div className={style.img_description}>
                            <h2 className={style.img_title}>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}

                <FontAwesomeIcon
                    icon="circle-chevron-right"
                    className={`fa-3x px-2 ${style.icon}`}
                    onClick={() => setActiveItem((prev) => (prev + 1) % photos.length)}
                />
            </div>
        </>


    );
}
