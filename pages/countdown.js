import React, { useEffect, useState } from "react";

const calculateTimeLeft = () => {
  // referenced https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
  let year = new Date().getFullYear();
  let difference = +new Date(`12/01/${year}`) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
  }};

return timeLeft;

}

const Countdown = () => {
  // referenced https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });
  
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
  
    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return <>
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  </>;
}

export default Countdown;