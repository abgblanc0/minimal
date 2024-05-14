use crate::schema::file;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable, Deserialize)]
#[diesel(table_name = file)]
pub struct NewFile<'a> {
    pub username: Option<&'a str>,
    pub filename: &'a str,
    pub content: &'a str,
    pub directory_id: Option<i32>,
}

#[derive(AsChangeset, Deserialize)]
#[diesel(table_name = file)]
pub struct UpdateFile<'a> {
    pub filename: Option<&'a str>,
    pub content: Option<&'a str>,
    pub directory_id: Option<i32>,
    pub username: Option<&'a str>
}

#[derive(Queryable, Debug, Serialize, Identifiable, Deserialize)]
#[diesel(table_name = file)]
pub struct File {
    pub id: i32,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub filename: String,
    pub content: String,
    pub username: Option<String>,
    pub directory_id: i32
}