
import { useEmoji } from '../hooks/useEmoji';

const Emoji = () => {

    const { emoji } = useEmoji();
    
  return (
    <div>
      <h1>Emoji shown in react from Docker running Python/Flask:</h1>
      {emoji ? <p>{emoji}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Emoji;