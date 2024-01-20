![Screenshot 2024-01-20 at 00-42-07 Vite React TS](https://github.com/Andrei-hub11/site-de-pizzaria/assets/83555334/cd8ae128-a996-4496-bdd4-64ef797bbd6c)

Testando o Aplicativo:

- Clonando o Repositório:
  Clone o repositório do aplicativo para o seu sistema.
- Navegando até a Pasta do Aplicativo:
  Abra um terminal e navegue até a pasta raiz do seu aplicativo onde o arquivo docker-compose.yml está localizado.
- Iniciando os Contêineres:
  Execute o seguinte comando para iniciar os contêineres definidos no arquivo docker-compose.yml: **docker-compose up -d**
- Antes de Executar o Comando `docker-compose up -d`:
  Antes de executar o comando para iniciar os contêineres, é necessário seguir as instruções para obter um certificado válido. Você pode gerar um certificado seguindo as orientações fornecidas [aqui](https://learn.microsoft.com/en-us/aspnet/core/security/docker-compose-https?view=aspnetcore-6.0#windows-using-linux-containers).
  Após gerar o certificado, substitua a senha utilizada em `ASPNETCORE_Kestrel__Certificates__Default__Password` no arquivo docker-compose.yml pelo certificado gerado.
  Por favor, se ao rodar o container, o backend não for iniciado corretamente, faça `docker-compose down` e depois `docker-compose up -d` novamente, pois pode ser que o banco de dados não tenha ficado pronto há tempo na inicialização, apesar da configuração.
