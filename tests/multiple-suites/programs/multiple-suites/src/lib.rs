use safe_anchor_lang::prelude::*;

declare_id!("ancAHhi4TqE5nwR29gPGhGV8CYLgHUFEDfE1q12nRK3");

#[program]
pub mod multiple_suites {
    use super::*;

    // _val to ensure tx are different so they don't get rejected.
    pub fn initialize(_ctx: Context<Initialize>, _val: u64) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
