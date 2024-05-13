
use diesel::{ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl};

use crate::schema::directory::dsl::*;
use crate::models::directory::*;

type MyResult<T> = Result<T, diesel::result::Error>;

pub fn get_directorys(conn: &mut PgConnection) -> MyResult<Vec<Directory>> {
    directory.load(conn)
}

pub fn get_subdirectorys(conn: &mut PgConnection, dir_id: i32) -> MyResult<Vec<Directory>>{
    directory.filter(parent_id.eq(dir_id)).get_results(conn)
}