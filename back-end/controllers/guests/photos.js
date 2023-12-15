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

module.exports = {
    index,
    show
};