use crate::controllers::post::get_posts_by_user_id;
use crate::errors::response::MyError;
use crate::models::post::Post;
use crate::models::user::{NewUser, AuxUser, User};
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::PgConnection;
use rocket::serde::json::Json;
use rocket::State;
use crate::controllers::user::*;

type PgPool = Pool<ConnectionManager<PgConnection>>;

#[get("/")]
pub fn users(pool: &State<PgPool>) -> Result<Json<Vec<User>>, MyError> {
    let mut conn = pool.get().expect("Error conn");
    match get_users(&mut conn) {
        Ok(users) => Ok(Json(users)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[get("/<user_id>")] 
pub fn user_by_id(pool:&State<PgPool>, user_id: i32) -> Result<Json<User>, MyError> {
    let mut conn = pool.get().expect("Eror conn");
    match get_user(&mut conn, user_id) {
        Ok(user) => Ok(Json(user)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[get("/<other_user_id>/posts")]
pub fn posts_by_user_id(pool: &State<PgPool>, other_user_id: i32) -> Result<Json<Vec<Post>>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_posts_by_user_id(&mut conn, other_user_id) {
        Ok(posts) => Ok(Json(posts)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[post("/", format="json", data = "<input>")]
pub fn post_user(pool: &State<PgPool>, input: Json<NewUser>) -> Result<Json<User>, MyError>{
    let mut conn = pool.get().expect("Error conn");
    match create_user(&mut conn, input.into_inner()){
        Ok(user) => Ok(Json(user)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[patch("/<user_id>", data = "<input>")]
pub fn patch_user(pool: &State<PgPool>, input: Json<AuxUser>, user_id: i32) -> Result<Json<User>, MyError> {
    let mut conn = pool.get().expect("Error conn");
    match update_user(&mut conn, input.into_inner(), user_id ) {
        Ok(user) => Ok(Json(user)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[delete("/<user_id>")]
pub fn delete_user(pool: &State<PgPool>, user_id: i32) -> Result<&str, MyError> {
    let mut conn = pool.get().expect("Error conn");
    match erase_user(&mut conn, user_id) {
        Ok(_) => Ok("User deleted"),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[post("/login", format="json", data = "<input>")]
pub fn verify_user(pool: &State<PgPool>, input: Json<AuxUser>) -> Result<Json<User>, MyError>{
    let mut conn = pool.get().expect("Error conn");
    match check_user(&mut conn, input.into_inner()) {
        Ok(found) => Ok(Json(found)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

// I DONT LIKE THIS
#[options("/login")]
pub fn options_login() -> &'static str {
    "OK"
}

