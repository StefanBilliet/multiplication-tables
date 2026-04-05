# US-19: Add hesitation rule to test mode

## Problem
Test mode currently does not support the hesitation rule setting that exists in practice mode. Users cannot configure hesitation behavior consistently across both modes.

## Functional Behaviour
Test mode should use the same hesitation rule setting that exists in practice mode. The setting is stored in the app store and controls whether a 5-second timer appears on the current question. If the user doesn't answer within 5 seconds, the session resets to the first question. The timer is disabled when the user has already given correct feedback.

**Domain Rules:**
1. If hesitation rule is disabled → timer is not shown
2. If hesitation rule is enabled AND no correct feedback yet → timer counts up from 0 to 5 seconds
3. If hesitation rule is enabled AND correct feedback already given → timer is not shown
4. If timer reaches 5 seconds → session resets to first question
5. Timer resets when: new question appears, user selects an answer, user checks an answer, user continues to next question

## Acceptance Criteria

**AC1: Test screen displays hesitation timer when enabled**
- Given the hesitation rule is enabled in settings
- When the test screen is rendered
- Then the current question prompt shows the hesitation timer counter

**AC2: Test screen does not display hesitation timer when disabled**
- Given the hesitation rule is disabled in settings
- When the test screen is rendered
- Then the current question prompt does not show the hesitation timer counter

**AC3: Timer counts up from 0 to 5 seconds in test mode**
- Given the hesitation rule is enabled and the user is on a question
- When 1 second passes
- Then the timer shows "1s"
- When 2 seconds pass
- Then the timer shows "2s"
- When 3 seconds pass
- Then the timer shows "3s"
- When 4 seconds pass
- Then the timer shows "4s"
- When 5 seconds pass
- Then the timer shows "5s"

**AC4: Test session resets to first question when timer reaches 5 seconds**
- Given the hesitation rule is enabled and the user is on a question
- When 5 seconds elapse without the user answering
- Then the test session resets to the first question

**AC5: Timer resets when user interacts in test mode**
- Given the hesitation rule is enabled and the timer is counting
- When the user selects an answer (correct or incorrect)
- Then the timer resets to 0 seconds
- When the user checks an answer (correct or incorrect)
- Then the timer resets to 0 seconds
- When the user continues to the next question
- Then the timer resets to 0 seconds

**AC6: Timer is disabled when correct feedback is given in test mode**
- Given the hesitation rule is enabled and the user has already given correct feedback for the current question
- When the user continues to the next question
- Then the timer is not shown for the next question

**AC7: Hesitation rule setting is shared between practice and test modes**
- Given the hesitation rule is enabled in settings
- When the user switches from practice mode to test mode
- Then the test mode uses the same enabled state
- Given the hesitation rule is disabled in settings
- When the user switches from test mode to practice mode
- Then the practice mode uses the same disabled state

## Edge Cases

None — the hesitation rule logic already exists in practice mode and is fully tested. Making test mode use the same setting leverages existing behavior.

## Security / Permissions
No special permissions required; the setting is user-configurable.

## Out of Scope
- Changing the hesitation rule logic itself
- Modifying the timer duration (currently fixed at 5 seconds)
- Creating separate hesitation rule settings for practice and test modes (this is Phase 2)
- Adding additional timer options (e.g., different durations, grace periods)

## Open Questions
None — all ambiguities have been resolved.