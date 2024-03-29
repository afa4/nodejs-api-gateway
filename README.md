## NodeJs API Gateway

### 0. Bootstrap

`npm start`

### 1. Definição de Rotas

Novas rotas são cadastradas no arquivo `resources.json`, na pasta raíz.

Estrutura:

```json
[
  {
    "url": "https://clients.example.com",
    "routes": [
      {
        "method": "GET",
        "path": "/clients",
        "middleware": "CLIENTS_AUTHORIZATION"
      },
      {
        "method": "POST",
        "path": "/clients",
        "middleware": "CLIENTS_AUTHORIZATION"
      }
    ]
  },
  {
    "url": "https://pets.example.com",
    "routes": [
      {
        "method": "GET",
        "path": "/pets"
      }
    ]
  }
]
```

Cada objeto do array de elementos é definido por uma `url` destino e uma lista de `routes`.

As rotas são definidas a partir de três propriedades:

 - `method`: Método http
 - `path`: Recurso do servidor destino
 - `middleware`: Referéncia a uma função do gateway que efetuará um pré processamento da request (autenticação, loggin e etc.)

### 2. Definição de middlewares

A implementação dos Middlewares segue o [strategy pattern](https://refactoring.guru/design-patterns/strategy). As classes que o implementam estão na pasta `src/middlewares/strategy`.

A cada requisição, o gateway executa a função de middleware definida em cada rota (se ela existir).

Nos exemplos acima, ao requisitar as rotas GET ou POST `/clients`, o gateway irá executar a estratégia `CLIENTS_AUTHORIZATION` antes de rotear a requisição para o servidor destino.

#### 2.1 Implementação

Os Middlewares são implementações da interface [MiddlewareStrategy](/src/middlewares/strategy/impl) definida abaixo:

```typescript
export interface MiddlewareStrategy {
  execute(req: any): void;
}
```

Um exemplo do que sería o código do middleware `CLIENT_AUTHORIZATION` está descrito abaixo:

```typescript
export class ClientAuthorizationStrategy implements MiddlewareStrategy {
  
  constructor(private readonly clientsAuthService: ClientsAuthService);
  
  execute(req: any): void
  {
    try {
      this.clientsAuthService.authorize(req);
    } catch(error) {
      throw new MiddlewareError('Unnauthorized', 401);
    }
  }
}
```

Considere que o `clientsAuthService` possuiría regras de negócio para autorizar um usuário no servidor `clients.example.com`.

Como o método `execute` retorna `void`, para autorizar a requisição nesse caso, basta não lançar nenhum erro.

Em casso de problemas o mais indicado seria lançar um [MiddlewareError](/src/middleware/error/middleware-error.ts) com a mensagem e o código http de resposta.

O gateway se responsabilizará por criar uma resposta estruturada para o cliente.

#### 2.2 Mapeamento

Por fim, para tornar a implementação ativa, basta adicionar uma novo par chave/valor, no [**middlewareStrategyMap**](/src/middleware/strategy/middleware-strategy-map.ts):

```typescript
const middlewareStrategyMap: Map<MiddlewareStrategy> = {
  "CLIENT_AUTHORIZATION": new ClientAuthorizationStrategy(),
};
```

Dessa forma, todas as rotas cadastradas com esse middleware serão pré processadas pela classe definida acima!

Have fun! :rocket:
