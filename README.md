
# Minimal

A really simple forum


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Rust, Rocket

**DDBB:** Postgres, Diesel (ORM)


## API Reference

#### Get all users

```http
  GET /users/
```

#### Get user by id

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `i32` | **Required**. Id of user to fetch |


#### Create user

```http
  POST /users/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `User`    | `json`   | **Required** |


#### ...



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`
