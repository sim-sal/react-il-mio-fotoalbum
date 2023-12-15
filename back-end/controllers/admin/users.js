const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { userSchema } = require('../../validationSchemas');

async function index(req, res) {
    const data = await prisma.user.findMany({
        include: {
            photos: true
        },
    });

    return res.json(data);
}

async function show(req, res) {
    const { id } = req.params;

    const data = await prisma.user.findUnique({
        where: {
            id: +id,
        },
        include: {
            photos: true
        }
    });

    if (!data) {
        throw new Error("Not found");
    }

    return res.json(data);
}

async function store(req, res) {
    const datiInIngresso = req.body;

    // Validazione degli input
    const { error } = userSchema.validate(datiInIngresso);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    // creazione dello user

    const newUser = await prisma.user.create({
        data: {
            username: datiInIngresso.username,
            email: datiInIngresso.email,
            password: datiInIngresso.password
        },
        include: {
            photos: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    image: true,
                    visible: true
                },
            },
        },
    })

    return res.json(newUser);
}

async function update(req, res) {
    // Converto l'id in un numero intero
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        // Gestisco il caso in cui l'id non sia un numero valido
        return res.status(400).json({ error: 'Invalid id' });
    }

    const datiInIngresso = req.body;

    // Validazione degli input
    const { error } = userSchema.validate(datiInIngresso);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // controllo che lo user esista
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) {
        throw new Error('user Not found');
    }

    const userAggiornata = await prisma.user.update({
        data: datiInIngresso,
        where: {
            id: id,
        },
    });

    return res.json(userAggiornato);
}

async function destroy(req, res) {
    // Converto l'id in un numero intero
    const id = parseInt(req.params.id, 10);

    await prisma.category.delete({
        where: {
            id: id,
        },
    });

    return res.json({ message: "User eliminato" });
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};