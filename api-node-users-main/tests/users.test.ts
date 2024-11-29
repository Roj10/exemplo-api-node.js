import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../server.js';

const mockUser = { name: 'Test User', password: 'test123', profile: 'user' };

let createdUserId;

test('Criar Usuário (POST)', async () => {
  const response = await request(server.server)
    .post('/users')
    .send(mockUser);

  expect(response.status).toBe(201);
});

test('Obter Usuários (GET)', async () => {
  const response = await request(server.server)
    .get('/users')
    .send();

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);

  for (const user of response.body) {
    if (user.name === mockUser.name) {
      createdUserId = user.id;
      break;
    }
  }
  expect(createdUserId).toBeDefined();
});

test('Atualizar Usuário (PUT)', async () => {
  const updatedUser = { ...mockUser, name: 'Updated User' };

  const response = await request(server.server)
    .put(`/users/${createdUserId}`)
    .send(updatedUser);

  expect(response.status).toBe(204);
});

test('Excluir Usuário Criado (DELETE)', async () => {
  const response = await request(server.server)
    .delete(`/users/${createdUserId}`)
    .send();

  expect(response.status).toBe(204);
});

test('Teste de carga para criação de usuários', async () => {
  const NUM_REQUESTS = 50; // Define o número de requisições simultâneas
  
  // Cria um array de promessas para enviar várias requisições de criação de usuário
  const requests = Array.from({ length: NUM_REQUESTS }).map(() =>
    request(server.server).post('/users').send(mockUser)
  );

  // Executa todas as requisições simultaneamente
  const responses = await Promise.all(requests);

  // Verifica se todas as respostas têm o status 201
  responses.forEach(response => {
    expect(response.status).toBe(201);
  });
});


// ---- forma de fazer uma requisição fake

// import { Fake } from '../tests/fakeneris.js'; // Importa o servidor que será testado, altere o caminho conforme sua estrutura.
// const fake = new Fake();

// requisição fakeneris
    // const body = { name: 'Test User', password: '12345', profile: 'user' };
  // const regra = { name: 'Test User', password: '12345', profile: 'user' };

  // const result = fake.request(body, regra);
  // console.log(result);
  // // Verifica se o status da resposta é 201 (Created)
  // expect(result.success).toBe(true);