## User Story 4 - Earn simple rewards for correct answers

As a child,  
I want to earn small rewards when I answer correctly,  
so that practicing feels fun and motivating.

### Acceptance Criteria

- Given I complete a 10-question session with at least 7 answers correct on the first try,
  when the session summary is shown,
  then I earn exactly 1 persisted reward.

- Given I complete a 10-question session with fewer than 7 answers correct on the first try,
  when the session summary is shown,
  then I earn no reward.

- Given I earn a reward for the completed session,
  when the session summary is shown,
  then the summary tells me that I earned 1 reward for that session.

- Given I earn a reward for the completed session,
  when the session summary is shown,
  then I can see my updated lifetime total of persisted rewards.

- Given I earn a reward for the completed session,
  when the session summary is shown,
  then I see a visible celebration.

- Given I do not earn a reward for the completed session,
  when the session summary is shown,
  then I do not see the reward celebration.

- Given I restart a session before completing it,
  when that progress is discarded,
  then no reward is granted for that abandoned session.

- Given I start the same table again after a finished or abandoned session,
  when the new session begins,
  then it is treated as a separate session with its own reward eligibility.
