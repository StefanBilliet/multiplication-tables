## Problem
Children need to feel progress as they learn multiplication tables. Currently, all tables are visible from the start screen, which doesn't provide a sense of achievement or progression. The current unlock system requires only completing a table, but we want to strengthen learning by requiring multiple successful attempts before unlocking new tables, with difficulty-based progression.

## Solution
Implement a progressive unlocking system that requires users to accumulate global rewards to unlock new tables. This ensures repeated practice of earlier tables while providing a meaningful challenge for progression.

## Reward Thresholds

| Table | Cumulative Rewards Required |
|-------|----------------------------|
| 1     | 0 (always unlocked) |
| 2     | 2 |
| 3     | 4 |
| 4     | 7 |
| 5     | 11 |
| 6     | 16 |
| 7     | 22 |
| 8     | 29 |
| 9     | 37 |
| 10    | 46 |

## Functional Behaviour

- When a user successfully completes practice for a multiplication table (with >70% first try success rate), they earn a global reward
- To unlock the next multiplication table, users must accumulate a specific number of global rewards based on table difficulty
- Tables follow a sequential progression (2, 3, 4, 5, etc.)
- Unlocking is **automatic** when the threshold is reached - no user action required
- On returning to the start screen, unlocked tables are displayed as available while locked tables remain visually indicated as locked
- Tables are visually locked with a message showing how many more rewards are needed

## Acceptance Criteria

- Given a user has accumulated N global rewards,  
  when they attempt to access a table that requires ≤ N rewards,  
  then the practice session loads normally.

- Given a user has accumulated N global rewards,  
  when they attempt to access a table that requires > N rewards,  
  then the table appears visually locked and displays a message indicating how many more rewards are needed to unlock it.

- Given a user has 2 global rewards,  
  when they view the table selection screen,  
  then tables 1 and 2 are available, and tables 3-10 are visually locked.

- Given a user has 46 global rewards,  
  when they attempt to access table 10,  
  then the practice session loads normally.

- Given a user attempts to access a locked table,  
  when they view the locked state,  
  then they see a message such as "You need X more rewards to unlock this table" where X is the difference between the table's threshold and their current rewards.

- Given a user reaches or exceeds a table's reward threshold,  
  when they return to the start screen,  
  then that table is automatically unlocked without requiring any user action.

- Given a user has unlocked tables,  
  when they earn more rewards and unlock additional tables,  
  then previously unlocked tables remain accessible.

## Edge Cases

- What happens if a user attempts to access a locked table? They should see a message showing how many more rewards are needed.
- How are rewards tracked across sessions and app restarts? (Already implemented via localStorage)
- What happens if a user resets their progress? (Only possible by clearing local storage - effectively like reinstalling the app)
- How does the system handle multiple simultaneous app sessions or device sync? (Out of scope)
- What if a user skips tables entirely? (Not important - they can only access unlocked tables)

## Security / Permissions

No specific security concerns. Access is limited to user's own progress data.

## Out of Scope

- Advanced progression systems (e.g., difficulty-based unlocking)
- Multi-table unlock criteria
- Progress tracking across multiple devices
- Manual claiming of unlocks (unlocking is automatic)

(End of file - total 64 lines)
