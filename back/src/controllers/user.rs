#![allow(unused)]


use crate::models::user::*;
use crate::schema::users::dsl::*;
use diesel::{self, ExpressionMethods};
use diesel::pg::{Pg, PgConnection};
use diesel::{QueryDsl, RunQueryDsl};
use rocket::http::hyper::server::conn;
use rocket::serde::json::Json;


pub fn get_user(conn: &mut PgConnection, user_id: i32) -> Result<User, diesel::result::Error>{
    users.find(user_id).first(conn)
}
pub fn get_users(conn: &mut PgConnection) -> Result<Vec<User>, diesel::result::Error> {
    users.load::<User>(conn)
}

pub fn create_user(conn: &mut PgConnection, new_user: NewUser) -> Result<User, diesel::result::Error> {
    diesel::insert_into(users)
        .values(&new_user)
        .get_result(conn)
}

pub fn create_users(conn: &mut PgConnection, new_users: Vec<NewUser>) -> Result<Vec<User>, diesel::result::Error> {
    diesel::insert_into(users)
            .values(&new_users)
            .get_results(conn)
}

pub fn update_user(conn: &mut PgConnection, user: User, user_id:i32) -> Result<User, diesel::result::Error>{
    diesel::update(users.filter(id.eq(user_id)))
            .set(user)
            .get_result(conn)
}