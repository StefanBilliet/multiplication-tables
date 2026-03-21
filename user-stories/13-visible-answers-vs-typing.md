# US-13: Choose between clicking visible answers vs typing without suggestions

## Background

This is a difficulty setting. In multiple choice mode, children select from visible answer options (easier). In typing mode, they must recall and type the answer independently (harder). Parents configure which mode to use at practice setup.

## User Story

**As a** parent  
**I want to** choose between clicking visible answers or typing answers without suggestions  
**So that** I can set an appropriate difficulty level for my child's practice

## Acceptance Criteria

### Given multiple choice mode is selected
- All possible answers for the multiplication table (2 through 10) are displayed as clickable buttons
- Clicking the correct button marks the answer as correct and advances to the next question
- Clicking an incorrect button shows it was wrong (visual feedback)

### Given typing mode is selected
- When answering a multiplication question, only an empty input field is shown below the question
- No answer suggestions are provided
- The child must type the correct numerical answer using the numeric keyboard (input type="number")
- Pressing Enter or clicking Submit validates the typed answer
- Correct answers advance to the next question; incorrect answers show feedback

## Edge Cases

- None - input type="number" handles invalid non-numeric input automatically on iPad

## Out of Scope

- Custom answer options per question
- Hints or suggestions in typing mode
