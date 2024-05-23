# Minimal

A really simple forum

## Tech Stack

**Client:** React, Typescript, TailwindCSS

**Server:** Rust, Rocket

**DB:** Postgres, Diesel (ORM)

## Run Locally

Go to /back

```bash
cargo install diesel_cli --no-default-features --features postgres
echo DATABASE_URL=postgres://postgres@localhost/minimal > .env
diesel setup
diesel migration redo -a
cargo run
```

Go to /front

```bash
echo VITE_API_URL=http://localhost:8000 > .env
npm install
npm run dev
```

## Screenshots
![image](https://github.com/abgblanc0/minimal/assets/99885502/bb4d01c2-1966-4eb4-b57d-2d64a720f793)
![image](https://github.com/abgblanc0/minimal/assets/99885502/a52833f8-ad95-4f2d-8ea4-cd7fc0ec4d4f)
