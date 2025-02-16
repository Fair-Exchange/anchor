/// A macro is exposed so that we can embed the program ID.
#[macro_export]
macro_rules! vote_weight_record {
    ($id:expr) => {
        /// Anchor wrapper for the SPL governance program's VoterWeightRecord type.
        #[derive(Clone)]
        pub struct VoterWeightRecord(spl_governance_addin_api::voter_weight::VoterWeightRecord);

        impl safe_anchor_lang::AccountDeserialize for VoterWeightRecord {
            fn try_deserialize(buf: &mut &[u8]) -> safe_anchor_lang::Result<Self> {
                let mut data = buf;
                let vwr: spl_governance_addin_api::voter_weight::VoterWeightRecord =
                    safe_anchor_lang::AnchorDeserialize::deserialize(&mut data)
                        .map_err(|_| safe_anchor_lang::error::ErrorCode::AccountDidNotDeserialize)?;
                if !safecoin_program::program_pack::IsInitialized::is_initialized(&vwr) {
                    return Err(safe_anchor_lang::error::ErrorCode::AccountDidNotSerialize.into());
                }
                Ok(VoterWeightRecord(vwr))
            }

            fn try_deserialize_unchecked(buf: &mut &[u8]) -> safe_anchor_lang::Result<Self> {
                let mut data = buf;
                let vwr: spl_governance_addin_api::voter_weight::VoterWeightRecord =
                    safe_anchor_lang::AnchorDeserialize::deserialize(&mut data)
                        .map_err(|_| safe_anchor_lang::error::ErrorCode::AccountDidNotDeserialize)?;
                Ok(VoterWeightRecord(vwr))
            }
        }

        impl safe_anchor_lang::AccountSerialize for VoterWeightRecord {
            fn try_serialize<W: std::io::Write>(&self, writer: &mut W) -> safe_anchor_lang::Result<()> {
                safe_anchor_lang::AnchorSerialize::serialize(&self.0, writer)
                    .map_err(|_| safe_anchor_lang::error::ErrorCode::AccountDidNotSerialize)?;
                Ok(())
            }
        }

        impl safe_anchor_lang::Owner for VoterWeightRecord {
            fn owner() -> Pubkey {
                $id
            }
        }

        impl std::ops::Deref for VoterWeightRecord {
            type Target = spl_governance_addin_api::voter_weight::VoterWeightRecord;

            fn deref(&self) -> &Self::Target {
                &self.0
            }
        }

        impl std::ops::DerefMut for VoterWeightRecord {
            fn deref_mut(&mut self) -> &mut Self::Target {
                &mut self.0
            }
        }
    };
}
