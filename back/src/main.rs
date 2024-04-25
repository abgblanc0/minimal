#[macro_use]
extern crate rocket;

mod db;
mod models;
mod schema;

use crate::models::user::User;

#[get("/")]
fn index() -> &'static str {
    "Hello"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
