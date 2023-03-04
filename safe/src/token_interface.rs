use safe_anchor_lang::safecoin_program::pubkey::Pubkey;
use std::ops::Deref;

static IDS: [Pubkey; 2] = [safe_token::ID, safe_token_2022::ID];

#[derive(Clone, Debug, Default, PartialEq)]
pub struct TokenAccount(safe_token_2022::state::Account);

impl safe_anchor_lang::AccountDeserialize for TokenAccount {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> safe_anchor_lang::Result<Self> {
        safe_token_2022::extension::StateWithExtensions::<safe_token_2022::state::Account>::unpack(
            buf,
        )
        .map(|t| TokenAccount(t.base))
        .map_err(Into::into)
    }
}

impl safe_anchor_lang::AccountSerialize for TokenAccount {}

impl safe_anchor_lang::Owners for TokenAccount {
    fn owners() -> &'static [Pubkey] {
        &IDS
    }
}

impl Deref for TokenAccount {
    type Target = safe_token_2022::state::Account;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone, Debug, Default, PartialEq)]
pub struct Mint(safe_token_2022::state::Mint);

impl safe_anchor_lang::AccountDeserialize for Mint {
    fn try_deserialize_unchecked(buf: &mut &[u8]) -> safe_anchor_lang::Result<Self> {
        safe_token_2022::extension::StateWithExtensions::<safe_token_2022::state::Mint>::unpack(buf)
            .map(|t| Mint(t.base))
            .map_err(Into::into)
    }
}

impl safe_anchor_lang::AccountSerialize for Mint {}

impl safe_anchor_lang::Owners for Mint {
    fn owners() -> &'static [Pubkey] {
        &IDS
    }
}

impl Deref for Mint {
    type Target = safe_token_2022::state::Mint;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone)]
pub struct TokenInterface;

impl safe_anchor_lang::Ids for TokenInterface {
    fn ids() -> &'static [Pubkey] {
        &IDS
    }
}

pub use crate::token_2022::*;
