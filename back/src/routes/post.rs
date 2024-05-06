use crate::errors::response::MyError;
use crate::models::post::*;
use crate::schema::posts::{topic, user_id};
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::PgConnection;
use rocket::serde::json::Json;
use rocket::State;
use crate::controllers::post::*;

type PgPool = Pool<ConnectionManager<PgConnection>>;

#[get("/")]
pub fn posts(pool: &State<PgPool>) -> Result<Json<Vec<Post>>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_posts(&mut conn) {
        Ok(posts) => Ok(Json(posts)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[get("/<other_user_id>")]
pub fn posts_by_user_id(pool: &State<PgPool>, other_user_id: i32) -> Result<Json<Vec<Post>>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_posts_by_user_id(&mut conn, other_user_id) {
        Ok(posts) => Ok(Json(posts)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}


#[post("/", format = "json", data = "<input>")]
pub fn post_post(pool: &State<PgPool>, input: Json<NewPost>) -> Result<Json<Post>, MyError> {
    let mut  conn = pool.get().expect("Fail to conn");
    match create_post(&mut conn, input.into_inner()) {
        Ok(post) => Ok(Json(post)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[delete("/<post_id>")]
pub fn delete_post(pool: &State<PgPool>, post_id: i32) -> Result<& str, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match erase_post(&mut conn, post_id) {
        Ok(result) => Ok("Post deleted"),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[patch("/<post_id>", data = "<input>")]
pub fn patch_post(pool: &State<PgPool>, input: Json<UpdatePost>, post_id: i32) -> Result<Json<Post>, MyError>{
    let mut conn = pool.get().expect("Fail to conn");
    match update_post(&mut conn, input.into_inner(), post_id){
        Ok(post) => Ok(Json(post)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    } 
}