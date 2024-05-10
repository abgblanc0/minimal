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
![image](https://github.com/abgblanc0/minimal/assets/99885502/bb6c48b9-f046-4312-8d83-cf4d9d1f6716)
![image](https://github.com/abgblanc0/minimal/assets/99885502/10d6126b-6658-454e-8d01-a7d299742eb1)

