use cors::CORS;

#[macro_use]
extern crate rocket;

mod controllers;
mod cors;
mod db;
mod errors;
mod models;
mod routes;
mod schema;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(db::init_db())
        .attach(CORS)
        .mount(
            "/users",
            routes![
                routes::user::users,
                routes::user::posts_by_user_id,
                routes::user::user_by_id,
                routes::user::post_user,
                routes::user::patch_user,
                routes::user::delete_user,
                routes::user::verify_user,
                routes::user::options_login,
            ],
        )
        .mount(
            "/posts",
            routes![
                routes::post::posts,
                routes::post::post_by_id,
                routes::post::post_post,
                routes::post::patch_post,
                routes::post::delete_post,
            ],
        )
        .mount(
            "/topics",
            routes![
                routes::topic::topics,
                routes::topic::posts,
                routes::topic::post_by_topic
            ],
        )
}
