use safe_anchor_lang::safecoin_program::account_info::AccountInfo;
use safe_anchor_lang::safecoin_program::pubkey::Pubkey;
use safe_anchor_lang::Result;
use safe_anchor_lang::{context::CpiContext, Accounts};

pub use safe_associated_token_account::{
    get_associated_token_address, get_associated_token_address_with_program_id, ID,
};

pub fn create<'info>(ctx: CpiContext<'_, '_, '_, 'info, Create<'info>>) -> Result<()> {
    let ix = safe_associated_token_account::instruction::create_associated_token_account(
        ctx.accounts.payer.key,
        ctx.accounts.authority.key,
        ctx.accounts.mint.key,
        ctx.accounts.token_program.key,
    );
    safecoin_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.payer,
            ctx.accounts.associated_token,
            ctx.accounts.authority,
            ctx.accounts.mint,
            ctx.accounts.system_program,
            ctx.accounts.token_program,
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn create_idempotent<'info>(
    ctx: CpiContext<'_, '_, '_, 'info, CreateIdempotent<'info>>,
) -> Result<()> {
    let ix = safe_associated_token_account::instruction::create_associated_token_account_idempotent(
        ctx.accounts.payer.key,
        ctx.accounts.authority.key,
        ctx.accounts.mint.key,
        ctx.accounts.token_program.key,
    );
    safecoin_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.payer,
            ctx.accounts.associated_token,
            ctx.accounts.authority,
            ctx.accounts.mint,
            ctx.accounts.system_program,
            ctx.accounts.token_program,
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

#[derive(Accounts)]
pub struct Create<'info> {
    pub payer: AccountInfo<'info>,
    pub associated_token: AccountInfo<'info>,
    pub authority: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
}

type CreateIdempotent<'info> = Create<'info>;

#[derive(Clone)]
pub struct AssociatedToken;

impl safe_anchor_lang::Id for AssociatedToken {
    fn id() -> Pubkey {
        ID
    }
}
