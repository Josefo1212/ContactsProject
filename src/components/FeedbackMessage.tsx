type Props = {
  error?: string;
  success?: string;
  errorClassName: string;
  successClassName: string;
};

export const FeedbackMessage = ({ error, success, errorClassName, successClassName }: Props) => {
  return (
    <>
      {error ? <p className={errorClassName}>{error}</p> : null}
      {success ? <p className={successClassName}>{success}</p> : null}
    </>
  );
};
