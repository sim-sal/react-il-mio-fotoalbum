const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { messageSchema } = require('../../validationSchemas');

async function index(req, res) {
    const data = await prisma.message.findMany();

    return res.json(data);
}

async function show(req, res) {
    const { id } = req.params;

    const data = await prisma.message.findUnique({
        where: {
            id: +id,
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
    const { error } = messageSchema.validate(datiInIngresso);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }


    // creazione del message

    const newMessage = await prisma.message.create({
        data: {
            content: datiInIngresso.content,
            email: datiInIngresso.email
        }
    })

    return res.json(newMessage);
}

async function destroy(req, res) {
    // Converto l'id in un numero intero
    const id = parseInt(req.params.id, 10);

    await prisma.message.delete({
        where: {
            id: id,
        },
    });

    return res.json({ message: "Messaggio eliminato" });
}

module.exports = {
    index,
    show,
    store,
    destroy
};