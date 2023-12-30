
import { useState } from "react";
import './loginReviews.scss'
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

function LoginReviews() {
  useVerifyIfUserIsLogged();


  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const onClickHandler = () => {
    setComments((comments) => [...comments, comment]);
  };
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };
  return (
    <div className="main-container">
      {comments.map((text) => (
        <div className="comment-container">{text}</div>
      ))}
      <div className="comment-flexbox">
        <h3 className="comment-text">Comment</h3>
        <textarea
          value={comment}
          onChange={onChangeHandler}
          className="input-box"
        />
        <button onClick={onClickHandler} className="comment-button">
          Submit
        </button>
      </div>
    </div>
  );
}

export default LoginReviews;