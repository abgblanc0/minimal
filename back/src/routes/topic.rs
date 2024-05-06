use crate::controllers::post::get_posts_by_topic;
use crate::errors::response::MyError;
use crate::models::post::Post;
use crate::models::topic::*;
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::PgConnection;
use rocket::serde::json::Json;
use rocket::State;
use crate::controllers::topic::*;

type PgPool = Pool<ConnectionManager<PgConnection>>;

#[get("/")]
pub fn topics(pool: &State<PgPool>) -> Result<Json<Vec<Topic>>, MyError> {
    let mut conn = pool.get().expect("Fail to conn");
    match get_topics(&mut conn) {
        Ok(topics) => Ok(Json(topics)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}

#[get("/<input>")]
pub fn posts(pool: &State<PgPool>, input: String) -> Result<Json<Vec<Post>>, MyError>{
    let mut conn = pool.get().expect("Fail to conn");
    match get_posts_by_topic(&mut conn, input) {
        Ok(posts) => Ok(Json(posts)),
        Err(error) => Err(MyError::build(400, Some(error.to_string())))
    }
}