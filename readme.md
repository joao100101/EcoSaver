
# EcoSaver

Projeto fullstack criado para estudar e treinar, seu propósito é ajudar as pessoas a gerenciarem melhor os seus gastos.

Em nosso sistema você pode cadastrar seus gastos e visualizar eles em uma tabela e em gráficos no dashboard.

O sistema ainda se encontra em desenvolvimento e pretendo trazer atualizações com melhorias em breve.
## Documentação da API

## Autenticação

### Login

```http
  POST /auth/login
```
+ Request (Application/json)
    + Body
        ```json
        {
           "email": "email@example.com",
           "password": "yourpassword" 
        }
        ```
+ Response 200 (Application/json)
    + Body
        ```json
        {
            "token": "exampletoken"
        }
        ```

### Register

```http
  POST /auth/register
```
+ Request (Application/json)
    + Body
        ```json
        {
            "name": "Your Name",
            "username": "username",
            "email": "email@example.com",
            "password": "yourpassword" 
        }
        ```
+ Response 201 (Application/json)
    + Body
        ```json
        Usuario registrado com sucesso.
        ```

### Validar token

```http
  POST /auth/check/{email}?token={token}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Email`      | `String` | **Obrigatório**. Email do emissor do token |
| `Token`      | `String` | **Obrigatório**. Token a ser validado |


## Categoria

### Encontrar pelo nome

```http
  GET /api/categorias/{nome}
```


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Nome`      | `String` | **Obrigatório**. O Nome da categoria que você quer buscar |

### Encontrar pelo ID

```http
  GET /api/categorias/{id}
```


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `Long` | **Obrigatório**. O ID da categoria que você quer buscar |

### Criar Categoria

```http
  POST /api/categorias
```
    + Headers

            Authorization: Bearer [access_token]

+ Request (Application/json)
    + Body
        ```json
        {
           "name": "Category name" 
        }
        ```
+ Response 201 (Application/json)
    + Body
        ```json
        {
            [Categoria Location URI]
        }
        ```
## Stack utilizada

**Front-end:** React-Vite, Axios, Bootstrap

**Back-end:** Spring Boot, Spring Data JPA, Validation, Spring Security, Lombok, Java JWT


## Autores

- [@Joao Victor Mundel](https://www.github.com/joao100101)

