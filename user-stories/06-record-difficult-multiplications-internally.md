## User Story 6 - Record difficult multiplications internally

As a parent or future version of the system,  
I want the app to remember which multiplications were answered incorrectly,  
so that weak combinations can be used later.

### Acceptance Criteria

#### AC1 — Record first error
**Given** a multiplication question has not been answered incorrectly before  
**When** the child answers it incorrectly and the answer is evaluated  
**Then** that multiplication's error count is set to 1 in state  
**And** the updated data is persisted to localStorage

#### AC2 — Increment existing errors
**Given** a multiplication already has an error count greater than 0  
**When** it is answered incorrectly again and the answer is evaluated  
**Then** its error count is incremented by 1  
**And** the updated data is persisted to localStorage

#### AC3 — Persist across sessions
**Given** error counts have been recorded in a previous session  
**When** the app is closed and reopened  
**Then** all previously recorded error counts are restored from localStorage

#### AC4 — Handle corrupted storage gracefully
**Given** localStorage contains invalid or unreadable data  
**When** the app attempts to load stored mistakes on startup  
**Then** the application continues normally with an empty object `{}` as initial state  
**And** no errors or crashes occur

---

## Implementation Notes

### Storage Strategy
- **Technology:** Zustand store with `persist` middleware + localStorage
- **Data structure:** Simple key-value object: `{ "7×8": 3, "5×6": 1 }`
- **Key format:** Human-readable strings (e.g., `"7×8"`) to match UI display

### Commutativity
- Multiplications are tracked separately by order (`7×8 ≠ 8×7`)
- This supports how children process multiplication facts with different operand orders

### Error Handling
- Storage errors (read/write failures) are silently ignored
- No console logging for storage issues
- Fallback to empty object `{}` if data cannot be read

### Data Characteristics
- **Accumulation only:** Error counts never decrement automatically
- **Unbounded:** Counts can grow indefinitely (reset feature may be added later)
- **Scale:** ~100 possible multiplication facts maximum
