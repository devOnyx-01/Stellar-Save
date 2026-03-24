# Enhance Gas Efficiency by Optimizing Storage Reads

## Description
This PR introduces significant gas optimizations to the Stellar-Save Soroban smart contracts by eliminating expensive O(N) storage reads and replacing them with O(1) continuous aggregate tracking.

### Key Changes
- **Eliminated Vector Reads**: Replaced vector length checks in `pool.rs` with O(1) `group.member_count` struct reads.
- **Combined Redundant Group Reads**: Removed multiple separate persistent storage reads in `get_pool_info` by consolidating state access.
- **Removed O(N) Payout Checks**: Replaced the linear cycle-scan in `has_received_payout` with a direct O(1) storage key look-up using the member's strictly assigned `payout_position`.
- **Incremental Balance Tracking**: Replaced expensive O(N) historical aggregating loops in `get_group_balance`, `get_total_paid_out`, and `get_member_total_contributions` by introducing new tracking storage keys (`GroupBalance`, `GroupTotalPaidOut`, `TotalContributions`) which dynamically increment during `record_contribution` and `transfer_payout`.

All changes mathematically preserve the same core functionality while preventing gas costs from scaling linearly as the group length or cycle count increases.

## Documentation Updated
- Included a comprehensive before-and-after breakdown in [`docs/gas-optimization.md`](docs/gas-optimization.md).
