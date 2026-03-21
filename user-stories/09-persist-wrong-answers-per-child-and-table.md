## User Story 09 - Persist wrong answers per child and per table locally

### Background

Currently, mistakes are recorded but not broken down by individual multiplication tables. Parents need visibility into which specific tables their child struggles with over time.

### User Story

As a parent  
I want the app to persist wrong answers per table locally  
so that weak areas become visible over time

### Acceptance Criteria

**Given** practice has been completed on specific tables  
**When** wrong answers are recorded  
**Then** they are persisted in localStorage organized by table  

**Given** the app is closed and reopened  
**When** previous practice data is loaded  
**Then** all recorded mistakes persist for each table

### Out of Scope

- Cloud synchronization across devices
- Detailed analytics or charts (just visibility of weak areas)
- Exporting data
