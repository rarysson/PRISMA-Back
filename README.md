# PRISM Back

Este projeto é a parte back-end do projeto [PRISMA](https://github.com/rarysson/PRISMA). Onde foi desenvolvido durante a disciplina de Desenvolvimento de Aplicações Web.

## Tecnologias utilizadas

* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [MySQL](https://www.mysql.com/)
* [TypeScript](https://www.typescriptlang.org/)

## Rodando o servidor

Primeiramente você deve ter instalado na sua máquina uma instância do MySQL e ter criado um DataBase com o nome escolhido na configuração. Para saber as configurações necessárias do MySQL olhe o arquivo [app.module](src/app.module.ts).

Clone o repositório, vá na pasta criada e execute os comandos:

```
npm install
npm run start
```

Agora o servidor estará ouvindo na porta definida no [main](src/main.ts)

## Licença

Esse projeto está sob a [licença MIT](LICENSE).
