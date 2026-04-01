import { createQuestionSequenceFactory } from '../../models/questionSequenceFactory.ts';

test('GIVEN a table number, WHEN the regular question sequence is requested, THEN it returns 1 through 10 in order', () => {
  const sut = createQuestionSequenceFactory(3);

  expect(sut.regular()).toEqual([
    { table: 3, multiplier: 1 },
    { table: 3, multiplier: 2 },
    { table: 3, multiplier: 3 },
    { table: 3, multiplier: 4 },
    { table: 3, multiplier: 5 },
    { table: 3, multiplier: 6 },
    { table: 3, multiplier: 7 },
    { table: 3, multiplier: 8 },
    { table: 3, multiplier: 9 },
    { table: 3, multiplier: 10 },
  ]);
});

test('GIVEN a table number, WHEN the shuffled question sequence is requested, THEN it returns a shuffled copy of the regular sequence', () => {
  const sut = createQuestionSequenceFactory(3);

  const shuffled = sut.shuffled();

  expect(shuffled).toHaveLength(10);
  expect(shuffled).not.toEqual(sut.regular());
  expect([...shuffled].sort((a, b) => a.multiplier - b.multiplier)).toEqual(sut.regular());
});

test('GIVEN two different shuffle seeds, WHEN the shuffled question sequence is requested, THEN it can produce different orders', () => {
  const first = createQuestionSequenceFactory(3, 1);
  const second = createQuestionSequenceFactory(3, 2);

  expect(first.shuffled()).not.toEqual(second.shuffled());
});
