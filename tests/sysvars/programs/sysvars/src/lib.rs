use safe_anchor_lang::prelude::*;

declare_id!("ancAHhi4TqE5nwR29gPGhGV8CYLgHUFEDfE1q12nRK3");

#[program]
mod sysvars {
    use super::*;
    pub fn sysvars(_ctx: Context<Sysvars>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Sysvars<'info> {
    pub clock: Sysvar<'info, Clock>,
    pub rent: Sysvar<'info, Rent>,
    pub stake_history: Sysvar<'info, StakeHistory>,
}
