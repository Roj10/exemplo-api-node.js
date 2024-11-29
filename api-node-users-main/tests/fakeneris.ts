// Classe Fake para fallback se o servidor não estiver disponível
export class Fake {
  request(body: any, regra: any) {
    // Verifica se o corpo da requisição (body) está presente
    if (!body) {
      return { success: false, message: 'Body is missing' };
    }

    // Compara as chaves e valores do body com a regra
    for (const key in regra) {
      if (regra.hasOwnProperty(key)) {
        if (!body.hasOwnProperty(key)) {
          return { success: false, message: `Missing field: ${key}` };
        }

        // Verifica se o valor no body é igual ao valor esperado na regra
        if (body[key] !== regra[key]) {
          return {
            success: false,
            message: `Field ${key} does not match. Expected: ${regra[key]}, Received: ${body[key]}`
          };
        }
      }
    }

    // Se tudo estiver de acordo com a regra, retorna sucesso
    return { success: true, message: 'Request is valid' };
  }
}