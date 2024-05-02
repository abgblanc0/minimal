// @generated automatically by Diesel CLI.

diesel::table! {
    posts (id) {
        id -> Int4,
        ctime -> Nullable<Timestamptz>,
        #[max_length = 255]
        title -> Varchar,
        body -> Text,
        user_id -> Int4,
        #[max_length = 255]
        topic -> Nullable<Varchar>,
    }
}

diesel::table! {
    topics (id) {
        id -> Int4,
        #[max_length = 255]
        name -> Varchar,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        ctime -> Nullable<Timestamptz>,
        #[max_length = 100]
        username -> Varchar,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 64]
        password -> Bpchar,
    }
}

diesel::joinable!(posts -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    posts,
    topics,
    users,
);
