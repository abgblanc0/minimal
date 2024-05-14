use crate::controllers::file::{get_file_by_dir_and_name, get_files_by_dir};
use crate::errors::response::MyError;
use crate::models::file::File;
use crate::models::directory::*;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::PgConnection;
use rocket::serde::json::Json;
use rocket::State;
use crate::controllers::directory::*;

type PgPool = Pool<ConnectionManager<PgConnection>>;

#[get("/")]
pub fn directorys(pool: &State<PgPool>) -> Result<Json<Vec<Directory>>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_directorys(&mut conn) {
        Ok(topics) => Ok(Json(topics)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[get("/files/<input>")]
pub fn files(pool: &State<PgPool>, input: i32) -> Result<Json<Vec<File>>, MyError>{
    let mut conn = pool.get().expect("Fail to conn");
    match get_files_by_dir(&mut conn, input) {
        Ok(posts) => Ok(Json(posts)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[get("/<dir>")]
pub fn subdirs(pool: &State<PgPool>, dir: i32) -> Result<Json<Vec<Directory>>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_subdirectorys(&mut conn, dir) {
        Ok(dirs) => Ok(Json(dirs)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
    
}

#[delete("/<dir>")]
pub fn delete_dir(pool: &State<PgPool>, dir: i32) -> Result<&str, MyError>{
    let mut conn = pool.get().expect("Fail to conn");
    match erase_directory(&mut conn, dir) {
        Ok(_) => Ok("Ok"),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[get("/<dir>/<file>")]
pub fn file_by_dir(pool: &State<PgPool>, dir: i32, file: &str) -> Result<Json<File>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_file_by_dir_and_name(&mut conn, dir, file) {
        Ok(post) => Ok(Json(post)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[post("/", data = "<dir>")]
pub fn post_dir(pool: &State<PgPool>, dir: Json<NewDirectory>) -> Result<Json<Directory>, MyError>{
    let mut conn = pool.get().expect("Fail to conn");
    match create_directory(&mut conn, dir.into_inner()) {
        Ok(d) => Ok(Json(d)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}
