# US-17: View past practice session history

## Background

Parents need visibility into a child’s past practice runs. The app already stores session completed events locally, so this story exposes that history in a simple list view.

## User Story

**As a** parent  
**I want to** view the history of my child’s past practice sessions  
**So that** I can see when practice happened and how the child performed over time

## Acceptance Criteria

### Given a practice session is completed
- The completed session is stored with a completion timestamp as a `Temporal.Instant`

### Given the parent opens the practice history view
- A simple list of completed sessions is shown
- The list contains all stored session completed events
- The newest session appears first

### Given a completed session is shown in the history list
- It displays the local date/time converted from the stored `Temporal.Instant`
- It displays the multiplication table practiced
- It displays the score as `firstTryCorrectAnswerCount`

### Given there are no completed sessions
- The system shows: `no practice sessions yet`

## Edge Cases

- If two sessions have the same timestamp, either order is acceptable
- The history is for the currently selected child only
- Timestamp display should follow the user’s local time

## Out of Scope

- Charts or analytics
- Filtering or searching the history
- Multiple children switching in the same screen
- Editing or deleting past sessions
