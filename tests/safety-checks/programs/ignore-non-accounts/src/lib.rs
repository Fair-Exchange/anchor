use safe_anchor_lang::prelude::*;

declare_id!("ancAHhi4TqE5nwR29gPGhGV8CYLgHUFEDfE1q12nRK3");

#[program]
pub mod ignore_non_accounts {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    /// CHECK:
    checked1: UncheckedAccount<'info>,
    /// CHECK:
    checked2: AccountInfo<'info>,
}

#[derive(Debug)]
pub struct ShouldIgnore1<'info> {
    unchecked1: UncheckedAccount<'info>,
    unchecked2: AccountInfo<'info>,
}

pub struct ShouldIgnore2<'info> {
    unchecked1: UncheckedAccount<'info>,
    unchecked2: AccountInfo<'info>,
}
