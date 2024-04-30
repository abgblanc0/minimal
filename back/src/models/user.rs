use crate::schema::users;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub email: &'a str,
    pub password: &'a str,
}

#[derive(AsChangeset, Deserialize, Debug)]
#[diesel(table_name = users)]
pub struct UpdateUser<'a> {
    pub username: Option<&'a str>,
    pub email: Option<&'a str>,
    pub password: Option<&'a str>,
}

#[derive(Queryable, Debug, Serialize, Identifiable, Deserialize)]
#[diesel(table_name = users)]
pub struct User {
    pub id: i32,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub username: String,
    pub email: String,
    pub password: String,
}
