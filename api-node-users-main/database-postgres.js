import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 

  async login(userData) {
    // Renomeie a variável interna para evitar conflito
    const result = await sql`select * from users where name = ${userData.name} AND password = ${userData.password}`;
    return result; // Retorne os resultados da consulta
  }


  async listUsers() {
    const users = await sql`select * from users`;
    return users;
  }

  async createUser(user) {
    const id = randomUUID();
    console.log('id', id);
    const name = user.name;
    const password = user.password;
    const profile = user.profile;
    
    await sql`insert into users (id, name, password, profile)
    values (${id}, ${name}, ${password}, ${profile})`
  }

  async updateUser(id, user) {
    const name = user.name;
    const password = user.password;
    const profile = user.profile;

    await sql`update users set 
        name = ${name},
        password = ${password},
        profile = ${profile}
        where id = ${id}
    `;
  }

  async deleteUser(id) {
    await sql`delete from users where id = ${id}`
  }

}