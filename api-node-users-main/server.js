import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// login
server.post('/login', async (request, reply) => {
    const userData = request.body; // Renomeie a variável 'user' para 'userData'
    const user = await databasePostgres.login(userData); // Passa a variável renomeada
    if (user && user.length > 0) {
        return reply.status(200).send({ message: 'Logado com sucesso!' });
    } else {
        return reply.status(400).send({ message: 'Credenciais inválidas!' });
    }
});


// CREATE
server.post('/users', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createUser(body);
    return reply.status(200).send();
})

// READE
server.get('/users', async () => {
    const users = await databasePostgres.listUsers();
    return users;
});

// UPDATE
server.put('/users/:id', async (request, reply) => {
    const userID = request.params.id;
    const body = request.body;
    await databasePostgres.updateUser(userID, body);

    return reply.status(204).send();
})

// DELETE
server.delete('/users/:id', async (request, reply) => {
    const userID = request.params.id;
    await databasePostgres.deleteUser(userID);

    return reply.status(204).send();
})

export { server };

server.listen({
    port: 3333,
    host: '0.0.0.0'
});
