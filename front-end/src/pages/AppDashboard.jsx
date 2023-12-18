import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../css/AppDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext"; // Importa il tuo contesto di autenticazione

export default function AppDashboard() {
    const [photos, setPhotos] = useState([]);
    const [editPhoto, setEditPhoto] = useState(null);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const { authToken } = useAuth(); // Estrai il token dal contesto di autenticazione

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/admin/photos", {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Aggiungi il token alle intestazioni della richiesta
                    },
                });
                setPhotos(response.data);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
        fetchCategory();
    }, [authToken]);

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

    const handleEditClick = (photo) => {
        setEditPhoto(photo);
        setIsEditFormVisible(true);
    };

    const handleFormSubmit = async (editedData) => {
        try {
            await axios.put(
                `http://localhost:3000/admin/photos/${editPhoto.id}`,
                editedData
            );
            const updatedPhotos = photos.map((photo) =>
                photo.id === editPhoto.id ? { ...photo, ...editedData } : photo
            );
            setPhotos(updatedPhotos);
            closeEditForm();
        } catch (error) {
            console.error("Error updating photo:", error);
        }
    };

    const closeEditForm = () => {
        setIsEditFormVisible(false);
        setEditPhoto(null);
    };

    // async function removePhoto(photoId) {
    //     const response = await fetch(`http://localhost:3000/admin/photos/${photoId}`, {
    //         method: "delete",
    //     });

    //     if (response.ok) {
    //         // Rimuovo la photo dalla lista locale
    //         setPhotos(photos.filter(photo => photo.id !== photoId));
    //     } else {
    //         console.error("Errore durante l'eliminazione della photo");
    //     }
    // }

    const handleDeleteClick = async (photoId) => {
        try {
            await axios.delete(`http://localhost:3000/admin/photos/${photoId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Aggiungi il token alle intestazioni della richiesta
                },
            });
            // Dopo aver eliminato la foto, aggiorna lo stato eliminando la foto dalla lista
            setPhotos((prevPhotos) => prevPhotos.filter((p) => p.id !== photoId));
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    return (
        <div className={`container-fluid ${style.dashboard}`}>
            <div>
                <button className={style.add_button}>
                    <span><strong>Add Photo</strong></span>
                </button>
            </div>

            <div className="container">
                <div className="row">
                    {photos.map((photo) => (
                        <div key={photo.id} className={`card col-5 mx-5 my-5 ${style.mod_card}`}>
                            <img
                                className={style.card_img}
                                src={`/${photo.image}`}
                                alt={photo.title}
                            />
                            <div className={style.card_main}>
                                <h3><strong>{photo.title}</strong></h3>
                                <p>{photo.description}</p>
                                <span>
                                    Categories:{" "}
                                    {photo.categories.map((category) => (
                                        <ul key={category.id}>
                                            <li>{category.name}</li>
                                        </ul>
                                    ))}
                                </span>
                                <div className={style.card_buttons}>
                                    <button className={style.edit_button} onClick={() => handleEditClick(photo)}> <span><strong>Edit</strong></span> </button>
                                    <button
                                        className={style.delete_button}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita la propagazione dell'evento al componente NavLink
                                            handleDeleteClick(photo.id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {
                isEditFormVisible && (
                    <div className={`${style.editFormContainer} ${style.show}`}>
                        <div>
                            <h2>Edit Photo</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const editedData = Object.fromEntries(formData.entries());
                                    handleFormSubmit(editedData);
                                }}
                            >
                                <div >
                                    <label><strong>Title:</strong></label>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={editPhoto.title}
                                        required
                                    />
                                </div>
                                <div >
                                    <label><strong>Description:</strong></label>
                                    <textarea
                                        name="description"
                                        defaultValue={editPhoto.description}
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label><strong>Categories:</strong></label>
                                    <div className="row">
                                        {categories.map((category) => (
                                            <div className="col-4" key={category.id}>
                                                <input
                                                    type="checkbox"
                                                    id={`category_${category.id}`}
                                                    name="categories"
                                                    value={category.id}
                                                    defaultChecked={editPhoto.categories.some(
                                                        (cat) => cat.id === category.id
                                                    )}
                                                />
                                                <label htmlFor={`category_${category.id}`}>
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <div className="d-flex justify-content-between mt-4">
                                    <button className={style.save_button} type="submit">Save</button>

                                    <button onClick={closeEditForm} className={style.dismit_button}>
                                        X
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}