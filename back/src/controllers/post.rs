use diesel::{ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl};

use crate::models::post::*;
use crate::schema::posts::dsl::*;

type MyResult<T> = Result<T, diesel::result::Error>;

pub fn get_posts(conn: &mut PgConnection) -> MyResult<Vec<Post>> {
    posts.load(conn)
}

pub fn get_post_by_id(conn: &mut PgConnection, other: i32) -> MyResult<Post> {
    posts.find(other).get_result(conn)
}

pub fn get_posts_by_user_id(conn: &mut PgConnection, other: i32) -> MyResult<Vec<Post>> {
    posts.filter(user_id.eq(other)).get_results(conn)
}

pub fn get_posts_by_topic(conn: &mut PgConnection, other: &str) -> MyResult<Vec<Post>> {
    posts.filter(topic.eq(other)).get_results(conn)
}

pub fn get_post_by_topic_and_title(conn: &mut PgConnection, topic_name: &str, post_name: &str) -> MyResult<Post> {
    posts
        .filter(topic.eq(topic_name))
        .filter(name.eq(post_name))
        .get_result(conn)
}

pub fn create_post(conn: &mut PgConnection, new_post: NewPost) -> MyResult<Post> {
    diesel::insert_into(posts)
        .values(&new_post)
        .get_result(conn)
}

pub fn erase_post(conn: &mut PgConnection, other: i32) -> MyResult<usize> {
    diesel::delete(posts.find(other)).execute(conn)
}

pub fn update_post(conn: &mut PgConnection, post: UpdatePost, other: i32) -> MyResult<Post> {
    diesel::update(posts.find(other)).set(post).get_result(conn)
}
