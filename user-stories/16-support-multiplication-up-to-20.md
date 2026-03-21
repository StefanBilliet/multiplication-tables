# US-16: Support multiplication tables up to 20

## Background

The current implementation supports multiplication tables from 1 to 10. However, as children advance in their mathematical learning, they need to practice larger numbers. Extending support to tables up to 20 prepares students for more advanced arithmetic and multiplication concepts without requiring a system upgrade later.

This feature extends the maximum table number that can be selected and practiced.

## User Story

**As a** parent or teacher  
**I want to** select multiplication tables from 1 to 20  
**So that** older or more advanced students can practice larger numbers appropriate for their grade level

## Acceptance Criteria

### Given the child selection screen is displayed
- Available tables show range from 1 to 20 (not just 1-10)
- Tables are presented in numerical order: 1, 2, 3, ..., 19, 20
- Visual distinction between "basic" tables (1-10) and "advanced" tables (11-20)

### Given a table above 10 is selected for practice
- All practice modes work correctly with larger numbers
- Questions display properly without overflow or formatting issues
- Answer validation works correctly for products up to 400 (20 × 20)

### Given multiple advanced tables are selected
- Mixed practice sessions include questions from all selected tables
- Test mode randomly selects from the full range of available tables
- Performance tracking handles larger numbers without errors

## Edge Cases

- Should there be a default selection that excludes tables >10 for younger children?
- Are there any performance considerations when generating large multiplication problems?
- How should the UI adapt if many tables (e.g., all 20) are selected at once?
- Should tables 11-20 have different styling or indicators to distinguish them from basic tables?

## Out of Scope

- Different learning approaches for larger numbers
- Special hints or strategies specifically for tables 11-20
- Grade-level recommendations for which tables to use
