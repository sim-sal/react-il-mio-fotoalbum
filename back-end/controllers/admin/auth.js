const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { userSchema } = require('../../validationSchemas');
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

async function register(req, res) {
    try {
        // Validare i dati della richiesta con lo schema
        const validatedData = await userSchema.validateAsync(req.body);

        // Verificare se l'email è già presente nel database
        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        });

        // Se l'utente esiste già, restituisco un errore
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'L\'email inserita è già associata a un account. Prova con un\'altra email.',
            });
        }

        // Se la validazione ha successo e l'email non esiste già, procedo con la registrazione dell'utente
        const { username, email, password } = validatedData;

        // Criptare la password prima di salvarla nel db
        validatedData.password = await bcrypt.hash(validatedData.password, 10);

        const user = await prisma.user.create({
            data: {
                ...validatedData,
            },
            // Specifico i campi che voglio includere nella risposta (escludendo la password)
            select: {
                id: true,
                username: true,
                email: true,
                role: true
            }
        });

        // genero il token JWT
        const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })

        res.json({ user, token });
    } catch (error) {
        // Se la validazione fallisce o si verifica un altro errore, gestisco gli errori
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Verifica se i campi richiesti sono presenti
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email e password sono campi obbligatori.',
            });
        }

        // Verifica se l'utente esiste nel database
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        // Se l'utente non esiste, restituisce un errore
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Credenziali non valide. L\'utente non esiste.',
            });
        }

        // Verifica se la password è corretta
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Se la password non è corretta, restituisce un errore
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Credenziali non valide. La password non è corretta.',
            });
        }

        // genero il token JWT
        const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })

        // rimuovo la password
        delete user.password;

        // ritornare il token e i dati dell'utente
        res.json({ user, token });
    } catch (error) {
        // Gestisci gli errori
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = {
    register,
    login
};