use diesel::{ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl};

use crate::models::file::*;
use crate::schema::file::dsl::*;

use super::user::get_user_by_name;

type MyResult<T> = Result<T, diesel::result::Error>;
const DEFAULT_PERMS: i32 = 666;


pub fn get_files(conn: &mut PgConnection) -> MyResult<Vec<File>> {
    file.load(conn)
}

pub fn get_file_by_id(conn: &mut PgConnection, other: i32) -> MyResult<File> {
    file.find(other).get_result(conn)
}

pub fn get_files_by_user_id(conn: &mut PgConnection, other: &str) -> MyResult<Vec<File>> {
    file.filter(username.eq(other)).get_results(conn)
}

pub fn get_files_by_dir(conn: &mut PgConnection, other: i32) -> MyResult<Vec<File>> {
    file.filter(directory_id.eq(other)).get_results(conn)
}

pub fn get_file_by_dir_and_name(conn: &mut PgConnection, dir_id: i32, file_name: &str) -> MyResult<File> {
    file
        .filter(directory_id.eq(dir_id))
        .filter(filename.eq(file_name))
        .get_result(conn)
}

pub fn create_file(conn: &mut PgConnection, new_file: NewFile) -> MyResult<File> {
    let mut new_file = new_file;
    let user = get_user_by_name(conn, new_file.username.unwrap_or(""));
    let umask = match user {
        Ok(u) => u.umask,
        Err(_) => 022
    };
    match new_file.permissions {
        Some(_) => (),
        None => new_file.permissions = Some(DEFAULT_PERMS - umask)
    }
    diesel::insert_into(file)
        .values(&new_file)
        .get_result(conn)
}

pub fn erase_file(conn: &mut PgConnection, other: i32) -> MyResult<usize> {
    diesel::delete(file.find(other)).execute(conn)
}

pub fn update_file(conn: &mut PgConnection, other_file: UpdateFile, other: i32) -> MyResult<File> {
    diesel::update(file.find(other)).set(other_file).get_result(conn)
}
