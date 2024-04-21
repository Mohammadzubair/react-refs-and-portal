import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { PropTypes } from "prop-types";

const ResultModal = forwardRef(function ResultModal(
  { remainingTime, targetTime, onReset },
  ref
) {
  const userGameResult = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userGameResult ? (
        <h2>You {userGameResult ? "lost" : "won"}</h2>
      ) : (
        <h2>Your score is: {score}</h2>
      )}
      <p>
        The target time was{" "}
        <strong>
          {targetTime} second{targetTime > 1 ? "s" : ""}.
        </strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} time left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("root")
  );
});

export default ResultModal;

ResultModal.propTypes = {
  remainingTime: PropTypes.string,
  targetTime: PropTypes.number,
  onReset: PropTypes.func,
};
