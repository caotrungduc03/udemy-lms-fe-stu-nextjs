type Props = {
  answerDetails: any[];
};

const questionTypeLabels: Record<string, string> = {
  SINGLE_CHOICE: 'Select one answer',
  MULTIPLE_CHOICE: 'Select multiple answers',
  SHORT_ANSWER: 'Write short answer',
};

const SubmissionDetail: React.FC<Props> = ({ answerDetails }) => {
  return (
    <table className="tutor-table mb-6">
      <thead>
        <tr>
          <th>STT</th>
          <th>Question type</th>
          <th>Question title</th>
          <th>Correct answer</th>
          <th>Answer</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {answerDetails?.map((answerDetail: any, index: number) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{questionTypeLabels[answerDetail.questionType]}</td>
            <td>{answerDetail.questionTitle}</td>
            <td>{answerDetail.correctAnswers.join('; ')}</td>
            <td>{answerDetail.answers.join('; ')}</td>
            <td>
              <span
                className={`${
                  answerDetail.gradingStatus === 'UNGRADED'
                    ? 'label-warning'
                    : answerDetail.point > 0
                    ? 'label-success'
                    : 'label-error'
                }`}
              >
                {answerDetail.gradingStatus === 'UNGRADED'
                  ? 'PENDING'
                  : answerDetail.point > 0
                  ? 'CORRECT'
                  : 'INCORRECT'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionDetail;
