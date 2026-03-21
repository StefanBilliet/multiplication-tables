# US-15: Test mode biased toward previously weak areas (child perspective)

## Background

Children struggle more with certain multiplication combinations than others. By analyzing past performance data, the system can identify which specific multiplications a child finds difficult and prioritize those in practice tests. This adaptive approach helps children focus their efforts on areas that need improvement.

This feature is designed specifically for the child's perspective during assessment-style sessions with intelligent question selection.

## User Story

**As a** child  
**I want to** take practice tests that focus more on multiplication combinations I find difficult  
**So that** I can improve my weakest areas first and become stronger overall

## Acceptance Criteria

### Given the system has collected performance data
- System tracks which specific multiplication questions were answered incorrectly or hesitantly (>5 seconds)
- Each question combination (e.g., "7 × 8") is scored based on:
  - Number of incorrect attempts
  - Average response time when correct
  - Most recent interaction

### Given a biased test session is started
- Questions are selected with higher probability for combinations marked as weak
- Distribution follows this priority:
  - High priority: Incorrect in last 3 sessions (30% chance each)
  - Medium priority: Hesitant responses (15% chance each)  
  - Low priority: All other questions from selected tables (remaining chance)
- At least one question from the weakest category must appear if available

### Given test session completion
- Results highlight which weak areas were tested in this session
- System updates difficulty ratings based on new performance
- Session shows breakdown by difficulty level (weak, improving, mastered)

## Edge Cases

- How many questions should be in a biased test? (Same as random mode?)
- What if no data exists yet for a child? (Fall back to random selection)
- When does a question stop being considered "weak"?
- Can parents see which specific combinations are marked as weak?

## Out of Scope

- Manual override of difficulty ratings by parent/teacher
- Different bias levels per individual question type
- Adaptive difficulty that changes within a single session
