import { useState } from 'react'
import Expand from 'react-expand-animated'
import MyBabyForm from '../MyBabyForm';

const MyBaby = ({baby}) => {

  const [height, setHeight] = useState(0)

  const toggleExpand = () => {
    height === 0 ? setHeight('auto') : setHeight(0)
  }

  return (
    <>
      <div className="account-card">
        <div>
          <p>{baby.name}</p>
          <p>{baby.birthday}</p>
        </div>
        <div className="account-card-actions">
          <button onClick={() => toggleExpand()}>Edit / Remove</button>
        </div>
      </div>
      <Expand open={height !== 0} duration={300}>
        <MyBabyForm baby={baby} />
      </Expand>
    </>
  );
};

export default MyBaby;