const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { categorySchema } = require('../../validationSchemas');

async function index(req, res) {
    const data = await prisma.category.findMany({
        include: {
            photos: true
        },
    });

    return res.json(data);
}

async function show(req, res) {
    const { id } = req.params;

    const data = await prisma.category.findUnique({
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
    const { error } = categorySchema.validate(datiInIngresso);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    // creazione della categoria

    const newCategory = await prisma.category.create({
        data: {
            name: datiInIngresso.name
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

    return res.json(newCategory);
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
    const { error } = categorySchema.validate(datiInIngresso);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // controllo che quella category esista
    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
    });

    if (!category) {
        throw new Error('category Not found');
    }

    const categoryAggiornata = await prisma.category.update({
        data: datiInIngresso,
        where: {
            id: id,
        },
    });

    return res.json(categoryAggiornata);
}

async function destroy(req, res) {
    // Converto l'id in un numero intero
    const id = parseInt(req.params.id, 10);

    await prisma.category.delete({
        where: {
            id: id,
        },
    });

    return res.json({ message: "Category eliminata" });
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
