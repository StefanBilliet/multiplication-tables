## User Story 11 - Choose order or random for table practice

### Background

Some children benefit from practicing tables in sequential order (2x1, 2x2, 2x3...), while others need the reinforcement of random questions to build true recall. Parents should have control over this.

### User Story

As a parent  
I want to choose whether practice for a table runs in order or randomly  
so that practice can match my child's learning style

### Acceptance Criteria

**Given** I select "in order" mode for table 3  
**When** the child starts practice  
**Then** questions appear sequentially: 3x1, 3x2, 3x3... through 3x10  

**Given** I select "random" mode for table 5  
**When** the child starts practice  
**Then** questions appear in random order (e.g., 5x7, 5x2, 5x9...)  

**Given** a question is answered incorrectly in either mode  
**When** the session continues  
**Then** the remaining questions follow the selected pattern

### Edge Cases

- "In order" mode is strictly sequential (1 through 10), no skipping allowed
- Random mode generates a shuffled sequence of questions 1 through 10 within the selected table
- Modes cannot be switched mid-session (only configurable at setup screen)

### Out of Scope

- Adaptive ordering based on performance
- Custom question sequences beyond ordered/random options
