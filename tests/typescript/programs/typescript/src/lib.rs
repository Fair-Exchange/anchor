//! The typescript example serves to show how one would setup an Anchor
//! workspace with TypeScript tests and migrations.

use safe_anchor_lang::prelude::*;

declare_id!("ancAHhi4TqE5nwR29gPGhGV8CYLgHUFEDfE1q12nRK3");

#[program]
pub mod typescript {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
