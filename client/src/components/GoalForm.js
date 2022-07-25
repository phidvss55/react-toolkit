import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setGoalEdited,
  createGoal,
  updateGoal,
} from "../features/goals/goalSlice";

function GoalForm() {
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();

  const goalEdit = useSelector((state) => state.goal.goalEdit);
  const [titleBtn, setTitleBtn] = React.useState("Add Goal");

  useEffect(() => {
    if (goalEdit) {
      setText(goalEdit.text);
      setTitleBtn("Update Goal");
    }
  }, [goalEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Please enter a goal");
      return;
    }

    const data = {
      text,
    };

    if (goalEdit) {
      data.id = goalEdit._id;
      dispatch(updateGoal(data));
      dispatch(setGoalEdited(null));
    } else {
      dispatch(createGoal(data));
    }
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            {titleBtn}
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
