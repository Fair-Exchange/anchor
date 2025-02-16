//! CPI API for interacting with the SPL shared memory
//! [program](https://github.com/fair-exchange/safecoin-program-library/tree/master/shared-memory).

use safe_anchor_lang::ToAccountInfo;
use safe_anchor_lang::{context::CpiContext, Accounts};
use safecoin_program::account_info::AccountInfo;
use safecoin_program::declare_id;
use safecoin_program::entrypoint::ProgramResult;
use safecoin_program::instruction::{AccountMeta, Instruction};
use safecoin_program::program;

// TODO: update this once the final shared memory program gets released.
//       shmem4EWT2sPdVGvTZCzXXRAURL9G5vpPxNwSeKhHUL.
declare_id!("smEFqz4hvyyJSypL8FvqYdasHTLHXTvNBtY9vVzLM5S");

/// `ret` writes the given `data` field to the shared memory account
/// acting as a return value that can be used across CPI.
/// The caleee should use this to write data into the shared memory account.
/// The caler should use the account directly to pull out and interpret the
/// bytes. Shared memory serialization is not specified and is up to the
/// caller and callee.
pub fn ret<'a, 'b, 'c, 'info>(
    ctx: CpiContext<'a, 'b, 'c, 'info, Ret<'info>>,
    data: Vec<u8>,
) -> ProgramResult {
    let instruction = Instruction {
        program_id: *ctx.program.key,
        accounts: vec![AccountMeta::new(*ctx.accounts.buffer.key, false)],
        data,
    };
    let mut accounts = vec![ctx.accounts.buffer];
    accounts.push(ctx.program.clone());
    program::invoke(&instruction, &accounts)
}

#[derive(Accounts)]
pub struct Ret<'info> {
    #[account(mut)]
    pub buffer: AccountInfo<'info>,
}

// A set of accounts that can be used with shared memory.
#[derive(Accounts)]
pub struct Shmem<'info> {
    // Shared memory account to write the return value into.
    #[account(mut, constraint = shmem.owner == shmem_program.key)]
    pub shmem: AccountInfo<'info>,
    #[account(constraint = shmem_program.key == &ID)]
    pub shmem_program: AccountInfo<'info>,
}
