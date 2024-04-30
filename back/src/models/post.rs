use crate::schema::posts;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable, Deserialize)]
#[diesel(table_name = posts)]
pub struct NewPost<'a> {
    pub user_id: i32,
    pub title: &'a str,
    pub body: &'a str,
}

#[derive(AsChangeset, Deserialize)]
#[diesel(table_name = posts)]
pub struct UpdatePost<'a> {
    pub title: Option<&'a str>,
    pub body: Option<&'a str>,
}

#[derive(Queryable, Debug, Serialize, Identifiable, Deserialize)]
#[diesel(table_name = posts)]
pub struct Post {
    pub id: i32,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub title: String,
    pub body: String,
    pub user_id: i32,
}