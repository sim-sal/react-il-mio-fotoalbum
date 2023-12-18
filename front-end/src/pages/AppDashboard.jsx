import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../css/AppDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";

export default function AppDashboard() {
    const [photos, setPhotos] = useState([]);
    const [editPhoto, setEditPhoto] = useState(null);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const { authToken } = useAuth();

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

    const [newPhoto, setNewPhoto] = useState({
        title: "",
        description: "",
        image: "",
        categories: []
    });

    const openAddForm = () => {
        setIsAddFormVisible(!isAddFormVisible);
    };

    const addNewPhoto = async () => {
        try {
            // Verifica se il titolo è presente nel nuovoPhoto
            if (!newPhoto.title) {
                console.error("Title is required");
                return;
            }

            const response = await axios.post(
                "http://localhost:3000/admin/photos",
                newPhoto,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log("Photo added successfully:", response.data);

            // Aggiorna la lista delle foto (se necessario)
            setPhotos((prevPhotos) => [...prevPhotos, response.data]);

            // Chiudi il form di aggiunta
            setIsAddFormVisible(false);
        } catch (error) {
            console.error("Error adding photo:", error);
            console.log("Response data:", error.response.data);
        }
    };

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
            {isAddFormVisible && (
                <div className={`${style.add_edit_FormContainer} ${style.show}`}>
                    <div>
                        <h2>Add Photo</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addNewPhoto();
                            }}
                        >
                            <div>
                                <label><strong>Image URL:</strong></label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={newPhoto.image}
                                    onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                                    required
                                />
                            </div>
                            <div >
                                <label><strong>Title:</strong></label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newPhoto.title}
                                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div >
                                <label><strong>Description:</strong></label>
                                <textarea
                                    name="description"
                                    value={newPhoto.description}
                                    onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
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
                                                checked={newPhoto.categories.includes(category.id)}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setNewPhoto((prevPhoto) => {
                                                        if (isChecked) {
                                                            return { ...prevPhoto, categories: [...prevPhoto.categories, category.id] };
                                                        } else {
                                                            return { ...prevPhoto, categories: prevPhoto.categories.filter((catId) => catId !== category.id) };
                                                        }
                                                    });
                                                }}
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

                                <button className={style.dismit_button} onClick={() => setIsAddFormVisible(false)}>
                                    X
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            <button className={style.add_button} onClick={openAddForm}>
                <span className="p-2"><strong>Add Photo</strong></span>
                <FontAwesomeIcon icon="fa-solid fa-square-plus" />
            </button>

            <div className="container">
                <div className="row">
                    {photos.map((photo) => (
                        <div key={photo.id} className={`card col-5 mx-5 my-5 ${style.mod_card}`}>
                            <img
                                className={style.card_img}
                                src={(photo.image && photo.image.startsWith('http')) ? photo.image : `/${photo.image}`}
                                alt={photo.title}
                            />
                            <div className={style.card_main}>
                                <h3><strong>{photo.title}</strong></h3>
                                <p>{photo.description}</p>
                                <span>
                                    Categories:{" "}
                                    {photo.categories ? (
                                        photo.categories.map((category) => (
                                            <ul key={category.id}>
                                                <li>{category.name}</li>
                                            </ul>
                                        ))
                                    ) : (
                                        <span>No categories available</span>
                                    )}
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
                    <div className={`${style.add_edit_FormContainer} ${style.show}`}>
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