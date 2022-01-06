## Estudos NodeJs - Rent API

Estudando conceitos do Typescript, API Rest com NodeJS, Arquitetura limpa com S.O.L.I.D, Documentação com Swagger, Importação e leitura de arquivos em stream;

### Estrutura do Projeto

- Model --> Estrutura dos dados (modelagem das entidades)
- Repositories --> Contratos de interfaces de banco de dados e métodos interativos com o banco de dados
- UseCases --> Regras de negócio da minha aplicação: Controllers e Services 
- Routes --> Rotas da minha aplicação

### SOLID - Robert C. Martin (Uncle Bob)
- [X] S: SRP: Single Responsability Principle - Responsabilidade única (separação por contexto)
- [] O: OCP 
- [X] L: LSP: Liskov Substitution Principle - Princípio da Substituição de Liskov, fala sobre o uso de contratos (classo implementando interfaces)!
- [] I: ISP
- [X] D: DIP: Dependency Inversion Principle - Princípio da Inversão da Dependência, significa também que o que está em alto nível não precisa conhecer o que está em baixo nível, ou seja, services não precisam conhecer o repository, a responsabilidade passa para quem chama o service


### Outras observações
- DTO(interface para objetos vindos da requisição) no Repository
