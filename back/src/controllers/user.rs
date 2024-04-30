use crate::models::user::*;
use crate::schema::users::dsl::*;
use diesel::{self, ExpressionMethods};
use diesel::pg::{Pg, PgConnection};
use diesel::{QueryDsl, RunQueryDsl};
use rocket::http::hyper::server::conn;
use rocket::serde::json::Json;

type MyResult<T> = Result<T, diesel::result::Error>;


pub fn get_user(conn: &mut PgConnection, user_id: i32) -> MyResult<User> {
    users.find(user_id)
            .first(conn)
}
pub fn get_users(conn: &mut PgConnection) -> MyResult<Vec<User>, > {
    users.load::<User>(conn)
}

pub fn create_user(conn: &mut PgConnection, new_user: NewUser) -> MyResult<User> {
    diesel::insert_into(users)
            .values(&new_user)
            .get_result(conn)
}

pub fn create_users(conn: &mut PgConnection, new_users: Vec<NewUser>) -> MyResult<Vec<User> > {
    diesel::insert_into(users)
            .values(&new_users)
            .get_results(conn)
}

pub fn update_user(conn: &mut PgConnection, user: UpdateUser, user_id:i32) -> MyResult<User>{
    print!("{:?}", user);
    diesel::update(users.find(user_id))
            .set(user)
            .get_result(conn)
}

pub fn erase_user(conn: &mut PgConnection, user_id: i32) -> MyResult<usize>{
    diesel::delete(users.filter(id.eq(user_id)))
            .execute(conn)
}