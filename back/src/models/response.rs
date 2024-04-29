use serde::{Serialize ,Deserialize};

#[derive(Responder, Debug, Deserialize, Serialize)]
pub struct MessageResponse {
    pub message: String,
}