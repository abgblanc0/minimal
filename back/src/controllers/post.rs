use diesel::{dsl, ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl};

use crate::models::post::*;
use crate::schema::posts::dsl::*;

type MyResult<T> = Result<T, diesel::result::Error>;

pub fn get_posts(conn: &mut PgConnection) -> MyResult<Vec<Post>>{
    posts.load(conn)
}

pub fn get_posts_by_user_id(conn: &mut PgConnection, other: i32) -> MyResult<Vec<Post>>{
    posts.filter(user_id.eq(other)).get_results(conn)
}

pub fn create_post(conn: &mut PgConnection, new_post: NewPost) -> MyResult<Post>{
    diesel::insert_into(posts)
            .values(&new_post)
            .get_result(conn)
}