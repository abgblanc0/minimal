# Minimal

A really simple forum

## Tech Stack

**Client:** React, Typescript, TailwindCSS

**Server:** Rust, Rocket

**DB:** Postgres, Diesel (ORM)

## Run Locally

Go to /back

```bash
  $ cargo install diesel_cli --no-default-features --features postgres
  $ echo DATABASE_URL=postgres://postgres@localhost/minimal > .env
  $ diesel setup
  $ cargo run
```

Go to /front

```bash
  $ npm install
  $ npm run dev
```
## Screenshots
![image](https://github.com/abgblanc0/minimal/assets/99885502/7d96a188-d93b-4824-9044-ce188ab19024)
![image](https://github.com/abgblanc0/minimal/assets/99885502/a223ffd1-8d34-4411-b5c8-83a89bf5780a)
