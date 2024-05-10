use crate::schema::topics;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable, Deserialize, AsChangeset)]
#[diesel(table_name = topics)]
pub struct NewTopic<'a> {
    pub name: &'a str,
    pub parent: Option<&'a str>
}


#[derive(Queryable, Debug, Serialize, Identifiable, Deserialize)]
#[diesel(table_name = topics)]
pub struct Topic {
    pub id: i32,
    pub ctime: Option<chrono::NaiveDateTime>,
    pub name: String,
    pub parent: Option<String>
}
