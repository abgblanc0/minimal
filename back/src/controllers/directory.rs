use diesel::{ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl};

use crate::models::directory::*;
use crate::schema::directory::dsl::*;

use super::user::get_user_by_name;

type MyResult<T> = Result<T, diesel::result::Error>;
const DEFAULT_PERMS:i32 = 777;

pub fn create_directory(conn: &mut PgConnection, new_dir: NewDirectory) -> MyResult<Directory> {
    let mut new_dir = new_dir;
    let umask = match get_user_by_name(conn, new_dir.username.unwrap_or("")){
        Ok(usr) => usr.umask,
        Err(_) => 022
    };
    match new_dir.permissions   {
        Some(_) => (),
        None => new_dir.permissions = Some(DEFAULT_PERMS - umask),
    }
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
