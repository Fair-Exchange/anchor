use safe_anchor_lang::prelude::*;

// Intentionally different program id than the one defined in Anchor.toml.
declare_id!("ancAHhi4TqE5nwR29gPGhGV8CYLgHUFEDfE1q12nRK3");

#[program]
mod declare_id {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
}
