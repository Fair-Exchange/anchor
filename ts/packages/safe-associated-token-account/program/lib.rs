// This file is autogenerated with https://github.com/acheroncrypto/native-to-anchor

use safe_anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod safe_associated_token_account {
    use super::*;

    pub fn create(ctx: Context<Create>) -> Result<()> {
        Ok(())
    }

    pub fn create_idempotent(ctx: Context<CreateIdempotent>) -> Result<()> {
        Ok(())
    }

    pub fn recover_nested(ctx: Context<RecoverNested>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(mut)]
    funding_address: Signer<'info>,
    #[account(mut)]
    associated_account_address: AccountInfo<'info>,
    wallet_address: AccountInfo<'info>,
    token_mint_address: AccountInfo<'info>,
    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct CreateIdempotent<'info> {
    #[account(mut)]
    funding_address: Signer<'info>,
    #[account(mut)]
    associated_account_address: AccountInfo<'info>,
    wallet_address: AccountInfo<'info>,
    token_mint_address: AccountInfo<'info>,
    system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct RecoverNested<'info> {
    #[account(mut)]
    nested_associated_account_address: AccountInfo<'info>,
    nested_token_mint_address: AccountInfo<'info>,
    #[account(mut)]
    destination_associated_account_address: AccountInfo<'info>,
    owner_associated_account_address: AccountInfo<'info>,
    owner_token_mint_address: AccountInfo<'info>,
    #[account(mut)]
    wallet_address: Signer<'info>,
    token_program: Program<'info, Token>,
}

#[error_code]
pub enum AssociatedTokenAccountError {
    // 0
    /// Associated token account owner does not match address derivation
    #[msg("Associated token account owner does not match address derivation")]
    InvalidOwner,
}
