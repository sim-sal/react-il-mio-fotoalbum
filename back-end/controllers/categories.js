const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function store(req, res) {
    const datiInIngresso = req.body;

    // creazione del tag

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

module.exports = {
    store,
};