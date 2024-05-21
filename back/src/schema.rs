// @generated automatically by Diesel CLI.

diesel::table! {
    directory (id) {
        id -> Int4,
        ctime -> Nullable<Timestamptz>,
        #[max_length = 255]
        dirname -> Varchar,
        #[max_length = 32]
        username -> Nullable<Varchar>,
        permissions -> Int4,
        parent_id -> Nullable<Int4>,
    }
}

diesel::table! {
    file (id) {
        id -> Int4,
        ctime -> Nullable<Timestamptz>,
        #[max_length = 255]
        filename -> Varchar,
        content -> Text,
        #[max_length = 32]
        username -> Nullable<Varchar>,
        permissions -> Int4,
        directory_id -> Int4,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        ctime -> Nullable<Timestamptz>,
        #[max_length = 100]
        username -> Varchar,
        #[max_length = 64]
        password -> Varchar,
        umask -> Int4,
        root -> Bool,
    }
}

diesel::joinable!(file -> directory (directory_id));

diesel::allow_tables_to_appear_in_same_query!(
    directory,
    file,
    users,
);
