import { Text, TextInput } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import classes from "./answerField.module.css";

type AnswerFieldProps = {
  feedbackAnimation: "pop" | "wobble" | null;
  feedbackState: "correct" | "incorrect" | null;
  selectedAnswer: number | null;
};

const AnswerField: FC<AnswerFieldProps> = ({
  feedbackAnimation,
  feedbackState,
  selectedAnswer,
}) => {
  const feedbackIcon =
    feedbackState === "correct"
      ? "✓"
      : feedbackState === "incorrect"
        ? "!"
        : "";
  const textColorClassName =
    selectedAnswer === null && feedbackState === null
      ? classes.empty
      : classes.filled;
  const sectionFeedbackState = feedbackState ?? "idle";
  const { t } = useTranslation();

  return (
    <TextInput
      classNames={{
        input: `${classes.input} ${textColorClassName}`,
        section: classes.section,
      }}
      data-feedback-animation={feedbackAnimation ?? undefined}
      data-feedback-state={feedbackState ?? undefined}
      label={t("practiceSession.answerPad.answerLabel")}
      readOnly
      rightSection={
        <Text
          aria-hidden
          c="inherit"
          className={classes.section}
          data-feedback-state={sectionFeedbackState}
          fw={800}
          size="lg"
        >
          {feedbackIcon}
        </Text>
      }
      rightSectionPointerEvents="none"
      rightSectionWidth={44}
      value={selectedAnswer === null ? "" : String(selectedAnswer)}
      placeholder={t("practiceSession.answerPad.placeholderLabel")}
      size="lg"
      radius="lg"
      styles={{ label: { display: "none" } }}
    />
  );
};

export default AnswerField;
