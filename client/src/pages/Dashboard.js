import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import { toast } from 'react-toastify';
import { getGoals } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';
import { setGoalEdited } from '../features/goals/goalSlice';


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [goalEdit, setGoalEdit] = React.useState(null);

  const { user } = useSelector(state => state.auth);
  const { goals, isLoading, isError, message } = useSelector(state => state.goal);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals())
    // return () => dispatch(reset())
  }, [user, navigate]);

  useEffect(() => {
    if (goalEdit) {
      console.log('set goal edit reducers', goalEdit)
      dispatch(setGoalEdited(goalEdit))
    }
  }, [goalEdit])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
       <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} setGoalEdit={setGoalEdit} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </div>
  )
}

export default Dashboard;