const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { messageSchema } = require('../../validationSchemas');

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

module.exports = {
    store
};