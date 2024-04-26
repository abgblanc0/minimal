
use crate::{db::establish_connection, models::user::NewUser};
use crate::controllers::user::create_users;

pub fn insert_data() {
    let new_users = vec![
        NewUser {
            username: "usuario1",
            email: "contraseña1",
        },
        NewUser {
            username: "usuario2",
            email: "contraseña2",
        },
        NewUser {
            username: "usuario3",
            email: "contraseña3",
        },
    ];
    let mut conn = establish_connection();
    create_users(&mut conn, new_users);
}

pub fn show_data() {
    
}