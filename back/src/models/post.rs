use crate::schema::posts;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable, Deserialize)]
#[diesel(table_name = posts)]
pub struct NewPost<'a> {
    pub user_id: i32,
    pub name: &'a str,
    pub content: &'a str,
    pub topic: Option<&'a str>,
}

#[derive(AsChangeset, Deserialize)]
#[diesel(table_name = posts)]
pub struct UpdatePost<'a> {
    pub name: Option<&'a str>,
    pub content: Option<&'a str>,
    pub topic: Option<&'a str>,
}

#[derive(Queryable, Debug, Serialize, Identifiable, Deserialize)]
#[diesel(table_name = posts)]
pub struct Post {
    pub id: i32,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub name: String,
    pub content: String,
    pub user_id: i32,
    pub topic: Option<String>,
}