import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Utility/axiosConfig";
import styles from "./Answer.module.css";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

function Answer() {
  const navigate = useNavigate();
  const { question_id } = useParams();

  const [userDatas, setUserDatas] = useState({});
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState([]);
  const [sendAns, setsendAns] = useState("");

  const token = localStorage.getItem("token");

  const handleCheck = async () => {
    try {
      if (!token) {
        alert("No token found. Please log in.");
        navigate("/login");
        return;
      }

      const { data } = await api.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserDatas(data);
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Authentication failed. Please log in again.");
      navigate("/login");
    }
  };
  const allQuestions = async () => {
    try {
      const allAnswerList = await api.get("/answer/allanswers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const answerData = allAnswerList.data.allAnswers;
      const allAnswers = answerData.filter(
        (answer) => String(answer.question_id) === question_id
      );
      setAnswers(allAnswers);
      setTitle(allAnswers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCheck();
    allQuestions();
  }, [question_id]);

  const sendAnswers = async (e) => {
    e.preventDefault();

    if (!sendAns.trim()) {
      alert.error("Answer field cannot be empty!");
      return;
    }

    try {
      // Post a new answer
      const postAns = await api.post(
        `/answer/${question_id}`,
        { answer: sendAns },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Answer posted successfully!");

      allQuestions();
      setsendAns("");
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("An error occurred while saving the answer!");
    }
  };
  const titleDescription = title.length > 0 ? title[0] : null;

  if (!userDatas || !titleDescription) {
    return (
      <div className={styles.error}>Failed to load question or user data.</div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h4>Question</h4>
        <p className={styles.answerUser}>
          Username: <span>{userDatas.username}</span>
        </p>
        <h6>
          <p>
            <span>
              <FaCircleArrowRight />
            </span>
            {titleDescription.title}
          </p>
          <p>{titleDescription.description}</p>
        </h6>
        <hr />

        <div>
          <h3 className="communityAns">Answers from the Community</h3>
          <hr />
        </div>
        <div className={styles.AllAns}>
          {answers.length > 0 ? (
            answers.map((answer) => (
              <div key={answer.answer_id}>
                <div className={styles.AnswerPg}>
                  {/* User Avatar and Name */}
                  <div>
                    <h1>{<FaUserAlt />}</h1>
                    <div>{answer.username}</div>
                  </div>

                  <div>
                    <p>{answer.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className={styles.no_answer}>No answers yet!</h4>
          )}
        </div>

        <div className={styles.answer_form}>
          <h4 className="text-center mb-5">Your Answer</h4>
          <form onSubmit={sendAnswers}>
            <textarea
              className="form-control"
              rows="6"
              id="details"
              placeholder="Your Answer"
              name="answer"
              value={sendAns}
              onChange={(e) => setsendAns(e.target.value)}
            ></textarea>

            <button type="submit">
              Post Your Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
