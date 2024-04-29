// @generated automatically by Diesel CLI.

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
