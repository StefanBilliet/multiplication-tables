import { useAppStore } from '../../app/store/appStore';
import { createQuestionSequenceFactory } from '../models/questionSequenceFactory';
import type { Question } from '../models/types';

export type QuestionSource = (selectedTable: number) => Question[];

const useQuestionSource: QuestionSource = (selectedTable: number) => {
  const questionOrderMode = useAppStore((state) => state.questionOrderMode);
  const questionSequenceFactory = createQuestionSequenceFactory(selectedTable);

  return questionOrderMode === 'structured' ? questionSequenceFactory.regular() : questionSequenceFactory.shuffled();
};

export default useQuestionSource;
