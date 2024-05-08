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
    id: i32,
    name: String,
    parent: Option<String>
}
