# Instruções para Rodar o Projeto

Para rodar o projeto, siga os passos abaixo:

1. **Criar Banco de Dados e Usuário no PostgreSQL**
   - Crie um banco de dados e um usuário conforme descrito no arquivo `.env`.

2. **Criação da Tabela**
   - Utilize o arquivo `create-table.js` para criar a tabela no banco de dados.
   - O arquivo pode ser executado através do seguinte comando:

     ```bash
     node create-table.js
     ```

3. **Instalar Dependências**
   - Após configurar o banco de dados e o usuário, instale as dependências do projeto com:

     ```bash
     npm install
     ```

4. **Iniciar a API**
   - Execute o comando abaixo para subir a API na porta `localhost:3333`:

     ```bash
     npm run dev
     ```

5. **Testar Endpoints**
   - Os endpoints podem ser testados através do arquivo `endpoints.http` instalando a extensão do vscode `rest client`.
