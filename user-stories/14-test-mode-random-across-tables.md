# US-14: Test mode with random questions across all unlocked tables

## Background

After practicing individual multiplication tables, children need opportunities to practice mixing different tables together. This simulates a real test environment where questions come from various tables randomly, helping children develop the ability to quickly identify which table each question belongs to and retrieve the correct answer.

Test mode runs across all currently unlocked tables with even distribution of questions.

## User Story

**As a** child  
**I want to** take practice tests with random multiplication questions from all my unlocked tables  
**So that** I can prepare for real assessments that mix different tables together

## Acceptance Criteria

### Given test mode is started
- Questions are generated from all currently unlocked tables (tables where the child has practiced enough to unlock them)
- Each question shows one multiplication problem (e.g., "7 × 8 = ?")
- Question order within the session is random and not predictable
- Questions are evenly distributed across all unlocked tables

### Given test mode is active
- The input mode follows the existing configuration setting: multiple choice or direct typing
- Session progress shows current question number and total questions (20)
- At the end of the session, results display:
  - Total correct answers
  - Total incorrect answers  
  - Accuracy percentage

## Edge Cases

- Fixed at 20 questions per test session
- Even distribution across unlocked tables (e.g., if 4 tables are unlocked, each table contributes 5 questions)
- Same question should not appear twice in one session
- Progress is lost when restarting a test session

## Out of Scope

- Different difficulty levels within tables
- Timed questions (overall timer yes, per-question timers no)
- Immediate feedback during the test (show only at end)
