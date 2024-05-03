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
