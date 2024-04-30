#![allow(unused)]

#[macro_use]
extern crate rocket;

mod controllers;
mod db;
mod errors;
mod models;
mod routes;
mod schema;

#[launch]
fn rocket() -> _ {
    rocket::build().attach(db::init_db())
    .mount(
        "/users",
        routes![
            routes::user::users,
            routes::user::user_by_id,
            routes::user::post_user,
            routes::user::patch_user,
            routes::user::delete_user
        ],
    ).mount(
        "/posts", 
        routes![
            routes::post::posts,
            routes::post::posts_by_user_id
        ],
    )
}
