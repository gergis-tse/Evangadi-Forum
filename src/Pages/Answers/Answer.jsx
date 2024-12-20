import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Utility/axiosConfig";
import css from "./Answer.module.css";
import { FaCircleArrowRight, FaPen} from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";

function Answer() {
  const navigate = useNavigate();
  const { question_id } = useParams();

  // State for user data, answers, likes, and loading
  const [userDatas, setUserDatas] = useState({});
  const [answers, setAnswers] = useState([]);
  const [title, setTitle] = useState([]);
  const [like, setLike] = useState({});
  const [loading, setLoading] = useState(true);

  // State for answer input, editing
  const [answerFiled, setAnswerFiled] = useState("");
  const [editAnswers, setEditAnswers] = useState("");

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Function to check user authentication
  const handleCheck = async () => {
    try {
      if (!token) {
        alert("No token found. Please log in.");
        navigate("/login");
        return;
      }

      const { data } = await api.get("/user/check", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserDatas(data);
      setLoading(false);
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Authentication failed. Please log in again.");
      setLoading(false);
      navigate("/login");
    }
  };

  // Function to fetch answers and related question title
  const allQuestions = async () => {
    try {
      const allAnswerList = await api.get("/answers/allanswers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const answerData = allAnswerList.data.allAnswers;
      const allAnswers = answerData.filter(
        (answer) => String(answer.question_id) === question_id
      );
      setAnswers(allAnswers);
      setTitle(allAnswers); // Assuming title is intended to be a collection of answers
      const initialLikes = {};
      allAnswers.forEach((answer) => {
        initialLikes[answer.answer_id] = false; // Assuming all answers start with a 'not liked' state
      });
      setLike(initialLikes);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch user data and answers on component mount
  useEffect(() => {
    handleCheck();
    allQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question_id]);

  // Function to send or edit an answer
  const sendAnswers = async (e) => {
    e.preventDefault();

    if (!answerFiled.trim()) {
      alert.error("Answer field cannot be empty!");
      return;
    }

    try {
      if (editAnswers) {
        // Edit existing answer
        await api.put(
          `/edit/${editAnswers}`,
          { answer: answerFiled },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        alert("Answer updated successfully!");
      } else {
        // Post a new answer
        await api.post(
          `/answers/${question_id}`,
          { answer: answerFiled },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        alert("Answer posted successfully!");
      }

      // Refresh answers
      allQuestions();
      // Reset form fields
      setAnswerFiled("");
      setEditAnswers("");
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("An error occurred while saving the answer!");
    }
  };

  // Function to initiate editing an answer
  const editAnswer = (answer) => {
    setEditAnswers(answer.answer_id);
    setAnswerFiled(answer.answer);
  };

  // Function to delete an answer
  const deleteAnswer = async (answer_id) => {
    try {
      await api.delete(`/delete/${answer_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Answer deleted successfully!");
      // Refresh answers
      allQuestions();
    } catch (error) {
      console.error("Error deleting answer:", error);
      alert("Failed to delete the answer.");
    }
  };

  // Function to toggle like state
  const toggleLike = (id) => {
    setLike((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Find the current question's title and description
  const titleDescription = title.length > 0 ? title[0] : null;

  if (loading) {
    return <div className={css.loading}>Loading...</div>;
  }

  if (!userDatas || !titleDescription) {
    return (
      <div className={css.error}>Failed to load question or user data.</div>
    );
  }

  return (
    <div className={css.answer_wrapper}>
      <div className={css.answer_container}>
        {/* Question Details */}
        <h4>Question</h4>
        <p className={css.answer_user}>
          Username: <span>{userDatas.username}</span>
        </p>
        <h6>
          <p>
            <span className="me-3 text-dark">
              <FaCircleArrowRight />
            </span>
            {titleDescription.title}
          </p>
          <p>{titleDescription.description}</p>
        </h6>
        <hr />

        {/* Answers Section */}
        <div>
          <h3 className="text-center mb-4">Answers from the Community</h3>
          <hr />
        </div>
        <div className={css.all_answer_list}>
          {answers.length > 0 ? (
            answers.map((answer) => (
              <div className={css.answer_from_comminuty} key={answer.answer_id}>
                <div className={css.answers_page}>
                  {/* User Avatar and Name */}
                  <div className={css.avatar_image}>
                    <h1>{<FaUserAlt />}</h1>
                    <div>{answer.username}</div>
                  </div>

                  {/* Answer Content */}
                  <div>
                    <p>{answer.answer}</p>
                  </div>

                  {/* Action Icons */}
                  <div className={css.edit_icons}>
                    {userDatas.id === answer.user_id && (
                      <span>
                        <FaPen
                          onClick={() => editAnswer(answer)}
                          title="Edit Answer"
                        />
                      </span>
                    )}

                    <span
                      onClick={() => toggleLike(answer.answer_id)}
                      style={{ color: "blue", cursor: "pointer" }}
                      title={like[answer.answer_id] ? "Unlike" : "Like"}
                    >
                      {like[answer.answer_id] ? (
                        <BiSolidLike />
                      ) : (
                        <AiOutlineLike />
                      )}
                    </span>

                    {userDatas.id === answer.user_id && (
                      <span>
                        <MdDelete
                          onClick={() => deleteAnswer(answer.answer_id)}
                          title="Delete Answer"
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className={css.no_answer}>No answers yet!</h4>
          )}
        </div>

        {/* Answer Submission Form */}
        <div className={css.answer_form}>
          <h4 className="text-center mb-5">Your Answer</h4>
          <form onSubmit={sendAnswers}>
            <textarea
              className="form-control"
              rows="6"
              id="details"
              placeholder="Your Answer"
              name="answer"
              value={answerFiled}
              onChange={(e) => setAnswerFiled(e.target.value)}
            ></textarea>

            {/* Submit Button */}
            <button type="submit" className={css.submit_button}>
              {editAnswers ? "Edit Your Answer" : "Post Your Answer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
