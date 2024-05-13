use crate::errors::response::MyError;
use crate::models::file::*;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::PgConnection;
use rocket::serde::json::Json;
use rocket::State;
use crate::controllers::file::*;

type PgPool = Pool<ConnectionManager<PgConnection>>;

#[get("/")]
pub fn files(pool: &State<PgPool>) -> Result<Json<Vec<File>>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_files(&mut conn) {
        Ok(files) => Ok(Json(files)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[get("/<file_id>")]
pub fn file_by_id(pool: &State<PgPool>, file_id: i32) -> Result<Json<File>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_file_by_id(&mut conn, file_id) {
        Ok(file) => Ok(Json(file)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}


#[post("/", format = "json", data = "<input>")]
pub fn post_file(pool: &State<PgPool>, input: Json<NewFile>) -> Result<Json<File>, MyError> {
    let mut  conn = pool.get().expect("Fail to conn");
    match create_file(&mut conn, input.into_inner()) {
        Ok(file) => Ok(Json(file)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[delete("/<file_id>")]
pub fn delete_file(pool: &State<PgPool>, file_id: i32) -> Result<& str, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match erase_file(&mut conn, file_id) {
        Ok(_) => Ok("file deleted"),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[patch("/<file_id>", data = "<input>")]
pub fn patch_file(pool: &State<PgPool>, input: Json<UpdateFile>, file_id: i32) -> Result<Json<File>, MyError>{
    let mut conn = pool.get().expect("Fail to conn");
    match update_file(&mut conn, input.into_inner(), file_id){
        Ok(file) => Ok(Json(file)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    } 
}