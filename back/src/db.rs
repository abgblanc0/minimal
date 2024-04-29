use diesel::prelude::*;
use dotenv::dotenv;
use rocket::fairing::AdHoc;
use std::env;
use diesel::r2d2::{ConnectionManager, Pool};

type PgPool = Pool<ConnectionManager<PgConnection>>;

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
/* 
use rocket::fairing::AdHoc;
use std::env;

pub mod customer;

pub fn init() -> AdHoc {
    AdHoc::on_ignite("Connecting to MongoDB", |rocket| async {
        match connect().await {
            Ok(database) => rocket.manage(database),
            Err(error) => {
                panic!("Cannot connect to instance:: {:?}", error)
            }
        }
    })
}

async fn connect() -> mongodb::error::Result<Database> {
    let mongo_uri = env::var("MONGO_URI").expect("MONGO_URI is not found.");
    let mongo_db_name = env::var("MONGO_DB_NAME").expect("MONGO_DB_NAME is not found.");

    let client_options = ClientOptions::parse(mongo_uri).await?;
    let client = Client::with_options(client_options)?;
    let database = client.database(mongo_db_name.as_str());

    println!("MongoDB Connected!");

    Ok(database)
}

*/