# US-12: Enable/disable 5-second hesitation rule

## Background

The 5-second hesitation rule increases difficulty and ensures compliance with second-year testing requirements. When enabled, children must answer within 5 seconds or be reset to question 1. This is a binary on/off setting configured at the practice setup screen.

## User Story

**As a** parent  
**I want to** enable or disable the 5-second hesitation rule  
**So that** I can control whether time pressure is applied during practice sessions, matching school testing standards

## Acceptance Criteria

### Given the hesitation rule is enabled
- When a child starts answering a multiplication question, a visible timer begins counting up from 0 seconds
- If the child does not answer within 5 seconds, they see feedback indicating they took too long
- The child is immediately reset to question 1 and must start the entire sequence again

### Given the hesitation rule is disabled  
- No visible timer appears when answering questions
- Children can take as much time as they need without any indication of being slow
- There is no penalty for taking longer than 5 seconds
- The child continues with the next question regardless of response time

## Edge Cases

- What happens if a child answers exactly at the 5-second mark? (Should be considered within time, not hesitant)
- Can the rule be toggled mid-session? No - configuration is only available at setup screen
- What feedback message is shown when the timer expires?
- Does the reset to question 1 happen immediately after the 5-second threshold is crossed?

## Out of Scope

- Configuring different time thresholds (fixed at 5 seconds)
- Different timers for different multiplication tables
- Haptic feedback or audio cues when approaching the limit
- Tracking hesitation statistics across sessions
