use crate::models::user::*;
use crate::schema::users::dsl::*;
use diesel::pg::PgConnection;
use diesel::{self, ExpressionMethods};
use diesel::{QueryDsl, RunQueryDsl};
use sha2::{Digest, Sha256};

type MyResult<T> = Result<T, diesel::result::Error>;

pub fn check_user(conn: &mut PgConnection, user: AuxUser) -> MyResult<User> {
    let pass = hash_pass(user.password.unwrap_or(""));
    users
        .filter(username.eq(user.username.unwrap_or("")))
        .filter(password.eq(pass))
        .get_result(conn)
}

pub fn get_user(conn: &mut PgConnection, user_id: i32) -> MyResult<User> {
    users.find(user_id).first(conn)
}
pub fn get_users(conn: &mut PgConnection) -> MyResult<Vec<User>> {
    users.load(conn)
}

pub fn create_user(conn: &mut PgConnection, new_user: NewUser) -> MyResult<User> {
    let mut new_user= new_user;
    let binding = hash_pass(new_user.password);
    new_user.password = &binding;
    diesel::insert_into(users)
        .values(&new_user)
        .get_result(conn)
}

pub fn update_user(conn: &mut PgConnection, user: AuxUser, user_id: i32) -> MyResult<User> {
    diesel::update(users.find(user_id))
        .set(user)
        .get_result(conn)
}

pub fn erase_user(conn: &mut PgConnection, user_id: i32) -> MyResult<usize> {
    diesel::delete(users.find(user_id)).execute(conn)
}

fn hash_pass(pass: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(pass.as_bytes());
    let user_hash = hasher.finalize();
    format!("{:x}", user_hash)
}