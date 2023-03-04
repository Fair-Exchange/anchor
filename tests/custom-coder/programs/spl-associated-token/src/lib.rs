// See https://github.com/safely-project/anchor/blob/master/ts/packages/safe-associated-token-account/program/lib.rs

use safe_anchor_lang::prelude::*;

declare_id!("4dUGnkre6uBhX1abB4ofkoecGN4aDXdiWSaWLUjVw6bh");

// See https://solana.stackexchange.com/a/1858/471
#[program]
pub mod spl_associated_token {}
