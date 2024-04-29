#![allow(unused)]

#[macro_use]
extern crate rocket;

mod controllers;
mod db;
mod models;
mod schema;
mod routes;
mod errors;


#[launch]
fn rocket() -> _ {
    rocket::build().attach(db::init_db()).mount("/", routes![routes::user::users, routes::user::user_by_id, routes::user::post_user, routes::user::patch_user])
}
