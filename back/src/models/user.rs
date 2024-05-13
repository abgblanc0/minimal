use crate::schema::users;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub password: &'a str,
    pub root: Option<bool>
}

#[derive(AsChangeset, Deserialize, Debug)]
#[diesel(table_name = users)]
pub struct AuxUser<'a> {
    pub username: Option<&'a str>,
    pub password: Option<&'a str>,
}

#[derive(Queryable, Debug, Serialize, Identifiable, Deserialize)]
#[diesel(table_name = users)]
pub struct User {
    pub id: i32,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub username: String,
    pub password: String,
    pub root: bool,
}
