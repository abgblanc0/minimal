use crate::schema::users;
use diesel::prelude::*;

#[derive(Queryable, Selectable)]
pub struct User {
    pub id: i32,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub username: String,
    pub email: String,
}
