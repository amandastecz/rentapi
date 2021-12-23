## Estudos NodeJs - Rent API

Estudando conceitos do Typescript, API Rest com NodeJS, Arquitetura limpa com S.O.L.I.D, singleton;

### Estrutura do Projeto
- [X] Routes --> Rotas da minha aplicação
- [X] UseCases --> Regras de negócio da minha aplicação
-- [X] Controllers --> Request e response; interação com repository
- [X] Model --> Estrutura dos dados (modelagem das entidades)
- [X] Repositories --> Contratos de interfaces de banco de dados e métodos interativos com o banco de dados

### Observações
- Routes não conhece Models, fica abstraído com DTO(interface para objetos vindos da requisição) no Repository

### SOLID - Robert C. Martin (Uncle Bob)
- S: SRP: Single Responsability Principle - Responsabilidade única (separação por contexto)
- O: OCP 
- L: LSP: Liskov Substitution Principle - Princípio da Substituição de Liskov, fala sobre o uso de contratos (classo implementando interfaces)!
- I: ISP
- D: DIP: Dependency Inversion Principle - Princípio da Inversão da Dependência, significa também que o que está em alto nível não precisa conhecer o que está em baixo nível, ou seja, services não precisam conhecer o repository, a responsabilidade passa para quem chama o service