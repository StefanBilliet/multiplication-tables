import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useSessionFlow from '../../components/useSessionFlow';
import PracticeFlow from '../../models/practiceFlow';
import { createQuestionSequenceFactory } from '../../models/questionSequenceFactory';

test('GIVEN a shared session flow, WHEN it initializes, THEN it starts from the provided question sequence', () => {
  const questionSequence = createQuestionSequenceFactory(3).regular();
  const session = PracticeFlow.start(questionSequence);
  const startSpy = vi.spyOn(PracticeFlow, 'start').mockReturnValue(session);

  renderHook(() => useSessionFlow(questionSequence));

  expect(startSpy).toHaveBeenCalledWith(questionSequence);
});
