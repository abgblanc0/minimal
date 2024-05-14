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
                routes::user::files_by_user_id,
                routes::user::user_by_id,
                routes::user::post_user,
                routes::user::patch_user,
                routes::user::delete_user,
                routes::user::verify_user,
                routes::user::options_login,
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
                routes::directory::post_dir
            ],
        )
}
