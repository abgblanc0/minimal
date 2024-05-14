use cors::CORS;
use rocket::http::Status;
use std::path::PathBuf;

#[macro_use]
extern crate rocket;

mod controllers;
mod cors;
mod db;
mod errors;
mod models;
mod routes;
mod schema;

#[options("/<path..>")]
fn options_handler(path: PathBuf) -> Status {
    Status::Ok
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(db::init_db())
        .attach(CORS)
        .mount("/", routes![options_handler])
        .mount(
            "/users",
            routes![
                routes::user::users,
                routes::user::files_by_username,
                routes::user::user_by_id,
                routes::user::post_user,
                routes::user::patch_user,
                routes::user::delete_user,
                routes::user::verify_user
            ],
        )
        .mount(
            "/files",
            routes![
                routes::file::files,
                routes::file::file_by_id,
                routes::file::post_file,
                routes::file::patch_file,
                routes::file::delete_file,
            ],
        )
        .mount(
            "/directorys",
            routes![
                routes::directory::directorys,
                routes::directory::files,
                routes::directory::file_by_dir,
                routes::directory::subdirs,
                routes::directory::post_dir,
                routes::directory::delete_dir,
            ],
        )
}
