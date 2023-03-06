use safe_anchor_lang::safecoin_program::declare_id;

pub use srm::ID as SRM;
mod srm {
    use super::*;
    declare_id!("Safe111111111111111111111111111111111111111");
}

pub use usdc::ID as USDC;
mod usdc {
    use super::*;
    declare_id!("Cs15wVAmfVBSNP7uWEQpAepuXoVpYU655HHSAftzKbn6");
}
