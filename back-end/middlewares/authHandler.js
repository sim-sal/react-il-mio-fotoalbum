const jwt = require('jsonwebtoken');

function isAdmin(req, res, next) {
    // Estraggo il token dalle intestazioni
    const authorizationHeader = req.headers.authorization;

    // Se l'intestazione Authorization non è presente, restituisco un errore di autorizzazione
    if (!authorizationHeader) {
        return res.status(401).json({
            success: false,
            error: 'Accesso non autorizzato. Token mancante.',
        });
    }

    // Verifico che l'intestazione inizi con "Bearer "
    const [bearer, token] = authorizationHeader.split(' ');

    // Se non inizia con "Bearer ", restituisco un errore di autorizzazione
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({
            success: false,
            error: 'Accesso non autorizzato. Formato di token non valido.',
        });
    }

    try {
        // Verifico il token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Estraggo il ruolo dall'oggetto decodificato del token
        const userRole = decodedToken.role;

        // Se l'utente non è un admin, restituisci un errore di autorizzazione
        if (userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Accesso non autorizzato. Solo gli admin possono eseguire questa azione.',
            });
        }

        // Se l'utente è un admin, procedo alla route successiva
        next();
    } catch (error) {
        // In caso di errore nella verifica del token, restituisco un errore di autorizzazione
        return res.status(401).json({
            success: false,
            error: 'Accesso non autorizzato. Token non valido.',
        });
    }
}

module.exports = isAdmin;