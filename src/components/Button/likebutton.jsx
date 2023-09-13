import { useState } from 'react';

function LikeButton({ count = 0 }) {
  const [likes, setLikes] = useState(count);

  const isPressed = likes > count;
  console.log(isPressed);

  const incrementLikes = () => {
    setLikes(likes + 1);
  };

  const decrementLikes = () => {
    setLikes(likes - 1);
  };

  return (
    <div>
      <button
        onClick={isPressed ? decrementLikes : incrementLikes}
        className="h-40"
      >
        ❤️
      </button>
      <span>{likes}</span>
    </div>
  );
}

export default LikeButton;