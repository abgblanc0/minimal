use crate::schema::directory;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable, Deserialize, AsChangeset)]
#[diesel(table_name = directory)]
pub struct NewDirectory<'a> {
    pub dirname: &'a str,
    pub username: Option<&'a str>,
    pub permissions: Option<i32>,
    pub parent_id: Option<i32>
}


#[derive(Queryable, Debug, Serialize, Identifiable, Deserialize)]
#[diesel(table_name = directory)]
pub struct Directory {
    pub id: i32,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub dirname: String,
    pub username: Option<String>,
    pub permissions: i32,
    pub parent_id: Option<i32>
}
