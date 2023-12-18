import React, { useState } from "react";
import style from "../css/AppContacts.module.css";
import axios from "axios";

export default function AppContacts() {
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            // Invia i dati al tuo server per la gestione del messaggio
            const response = await axios.post("http://localhost:3000/messages", {
                email,
                content,
            });

            console.log("Message sent successfully:", response.data);

            // Aggiorna lo stato del componente o esegui altre azioni se necessario
            setIsMessageSent(true);

            // Resetta i campi del form
            setEmail("");
            setContent("");

            setIsLoading(false);

            // Imposta uno stato `isMessageSent` su `false` dopo 2 secondi
            setTimeout(() => {
                setIsMessageSent(false);
            }, 2000);
        } catch (error) {
            console.error("Error sending message:", error);
            // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className={style.my_container}>
                <div className={`${style.contacts_container}`}>
                    <div className={style.contacts_form_container}>
                        <h2>Lascia un messaggio</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="d-flex justify-content-center mb-2">
                                <input
                                    type="email"
                                    placeholder="Scrivi la tua email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <textarea
                                    value={content}
                                    placeholder="Scrivi qui il messaggio"
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" disabled={isLoading} className={style.contacts_button}>
                                    {isLoading ? "Inviando..." : "Invia"}
                                </button>
                            </div>

                            {isMessageSent && <p className="text-center mt-2">Messaggio inviato con successo!</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}