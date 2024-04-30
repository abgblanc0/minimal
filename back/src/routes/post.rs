use crate::errors::response::MyError;
use crate::models::post::{NewPost, Post};
use crate::schema::posts::user_id;
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
pub fn posts_by_user_id(pool: &State<PgPool>, other_user_id: i32) -> Result<Json<Vec<Post>>, MyError>{
    let mut conn = pool.get().expect("Fail to conn");
    match get_posts_by_user_id(&mut conn, other_user_id) {
        Ok(posts) => Ok(Json(posts)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}