use diesel::{ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl};

use crate::models::directory::*;
use crate::schema::directory::dsl::*;

type MyResult<T> = Result<T, diesel::result::Error>;

pub fn create_directory(conn: &mut PgConnection, new_dir: NewDirectory) -> MyResult<Directory> {
    diesel::insert_into(directory)
        .values(&new_dir)
        .get_result(conn)
}

pub fn erase_directory(conn: &mut PgConnection, dir_id: i32) -> MyResult<usize>{
    diesel::delete(directory.find(dir_id)).execute(conn)
}

pub fn get_directorys(conn: &mut PgConnection) -> MyResult<Vec<Directory>> {
    directory.load(conn)
}

pub fn get_subdirectorys(conn: &mut PgConnection, dir_id: i32) -> MyResult<Vec<Directory>> {
    directory.filter(parent_id.eq(dir_id)).get_results(conn)
}
