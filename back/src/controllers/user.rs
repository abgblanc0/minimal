#![allow(unused)]


use crate::models::user::*;
use crate::schema::users::dsl::*;
use diesel;
use diesel::pg::{Pg, PgConnection};
use diesel::{QueryDsl, RunQueryDsl};
use rocket::http::hyper::server::conn;
use rocket::serde::json::Json;


pub fn get_user(conn: &mut PgConnection, user_id: i32) -> Option<User> {
    match users.find(user_id).first(conn) {
        Ok(user) => Some(user),
        Err(error) => None,
    }
}
pub fn get_users(conn: &mut PgConnection) -> Vec<User> {
    users.load::<User>(conn).unwrap()
}

pub fn create_user(conn: &mut PgConnection, new_user: NewUser) -> usize {
    diesel::insert_into(users)
        .values(&new_user)
        .execute(conn)
        .expect("Error creating user")
}

pub fn create_users(conn: &mut PgConnection, new_users: Vec<NewUser>) -> usize {
    diesel::insert_into(users)
            .values(&new_users)
            .execute(conn)
            .expect("Error creating users")
}
