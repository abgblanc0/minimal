#![allow(unused)]
#[macro_use]
extern crate rocket;

use db::establish_connection;
use models::user::User;
use rocket::serde::json::Json;
use controllers::user::*;

mod controllers;
mod db;
mod models;
mod schema;
mod script;


#[get("/users")]
fn users() -> Json<Vec<User>> {
    let mut conn = establish_connection();
    Json(get_users(&mut conn))
}


//TODO: return 404 if not found...
#[get("/users/<user_id>")] 
fn user_by_id(user_id: i32) -> Json<User> {
    let mut conn = establish_connection();
    Json(get_user(&mut conn, user_id).unwrap())
}
 
#[get("/")]
fn index() -> &'static str {
    "Hello"
}

#[launch]
fn rocket() -> _ {
    script::insert_data();
    rocket::build().mount("/", routes![index, users, user_by_id])
}
