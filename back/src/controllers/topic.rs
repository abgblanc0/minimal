
use diesel::{PgConnection, RunQueryDsl};

use crate::schema::topics::dsl::*;
use crate::models::topic::*;

type MyResult<T> = Result<T, diesel::result::Error>;

pub fn get_topics(conn: &mut PgConnection) -> MyResult<Vec<Topic>> {
    topics.load(conn)
}