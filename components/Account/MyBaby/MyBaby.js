import { useState } from 'react'
import Expand from 'react-expand-animated'
import MyBabyForm from '../MyBabyForm';

const MyBaby = ({baby, index, onUpdateBabyInfo, newBabyFormHeight, activeEditForms, setActiveEditForms, setNewBabyFormHeight}) => {

  const [height, setHeight] = useState(0)

  const toggleExpand = () => {

    if (height === 0) {
      setHeight('auto')
      setNewBabyFormHeight(0)
      setActiveEditForms([...activeEditForms, index])
    } else {
      setHeight(0)
      setActiveEditForms([...activeEditForms].filter(formIndex => formIndex !== index))
    }
  }

  return (
    <>
      <li className="account-card">
        <div>
          <p>{baby.name}</p>
          <p>{baby.birthday}</p>
        </div>
        <div className="account-card-actions">
          <button onClick={() => toggleExpand()}>Edit / Remove</button>
        </div>
      </li>
      {!newBabyFormHeight &&
        <Expand open={height !== 0} duration={300}>
          <MyBabyForm baby={baby} index={index} onUpdateBabyInfo={onUpdateBabyInfo} setHeight={setHeight} />
        </Expand>
      }
    </>
  );
};

export default MyBaby;