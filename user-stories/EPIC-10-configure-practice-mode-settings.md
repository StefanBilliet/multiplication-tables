## Epic 10 - Configure practice mode settings

### Background

Practice sessions should be configurable to match different learning styles and testing requirements. This epic covers three independent configuration features that can be implemented separately.

### Epic Overview

This epic encompasses the following user stories:

- **US-11**: Question order configuration (sequential vs random)
- **US-12**: 5-second rule with auto-reset feedback  
- **US-13**: Input mode selection (typing only vs clickable options)

Each sub-story can be implemented independently and provides a complete, testable feature.

### User Story (Epic Level)

As a parent  
I want to configure practice mode settings  
so that the exercise matches my child's level and school expectations

### Acceptance Criteria (Epic Level)

**Given** I am setting up a practice session  
**When** I access configuration options  
**Then** I can choose from three independent settings:
- Question order (sequential or random) - see US-11
- 5-second rule with auto-reset timing - see US-12
- Input mode (typing or selection) - see US-13

### Edge Cases

- Settings changes mid-session (only configurable at setup screen)
- Per-table configuration differences within a single session
- Independence between the three configuration options

### Out of Scope

- Detailed implementation of individual configuration features (covered in sub-stories)
- Persistence strategy for settings preferences
