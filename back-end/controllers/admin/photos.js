const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { photoSchema } = require('../../validationSchemas');

async function index(req, res) {
    const data = await prisma.photo.findMany({
        include: {
            categories: true
        },
    });


    return res.json(data);
}

async function show(req, res) {
    const { id } = req.params;

    const data = await prisma.photo.findUnique({
        where: {
            id: +id,
        },
        include: {
            categories: true
        }
    });

    if (!data) {
        throw new Error("Not found");
    }

    return res.json(data);
}

async function store(req, res) {
    const datiInIngresso = req.body;
    console.log(datiInIngresso);

    // Validazione degli input
    const { error } = photoSchema.validate(datiInIngresso);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const file = req.file;
    if (file) {
        datiInIngresso.image = file.filename;
    }

    const newPhoto = await prisma.photo.create({
        data: {
            title: datiInIngresso.title,
            description: datiInIngresso.description,
            image: datiInIngresso.image,
            visible: datiInIngresso.visible,
            categories: {
                connect: datiInIngresso.categories.map((idCategories) => ({
                    id: +idCategories,
                })),
            },
        }
    });

    if (!newPhoto) {
        // next(new PrismaExeption("Errore nella creazione della photo", 400));
        throw new Error("Errore nella creazione della photo");
    }

    return res.json(newPhoto);
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
    const { error } = photoSchema.validate(datiInIngresso);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // controllo che quella photo esista
    const photo = await prisma.photo.findUnique({
        where: {
            id: id,
        },
    });

    if (!photo) {
        throw new Error('Photo Not found');
    }

    const photoAggiornata = await prisma.photo.update({
        data: datiInIngresso,
        where: {
            id: id,
        },
    });

    return res.json(photoAggiornata);
}

async function destroy(req, res) {
    // Converto l'id in un numero intero
    const id = parseInt(req.params.id, 10);

    await prisma.photo.delete({
        where: {
            id: id,
        },
    });

    return res.json({ message: "Photo eliminata" });
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};