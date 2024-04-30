use diesel::prelude::*;
use dotenv::dotenv;
use rocket::fairing::AdHoc;
use std::env;
use diesel::r2d2::{ConnectionManager, Pool};


pub fn init_db() -> AdHoc {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool = Pool::builder().build(manager)
        .expect("Failed to create database pool");

    AdHoc::on_ignite("Connecting to database", move |rocket| async move{
        rocket.manage(pool.clone()) 
    }) 
}
