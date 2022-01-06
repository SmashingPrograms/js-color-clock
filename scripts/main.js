//Converts single-digit numbers to numbers with 0 at the beginning, converts all numbers regardless of that to strings. Conversion back to numbers will happen later.

let isHovering = false;

const clockDisplay = document.querySelector(".clock-display");
const clockProgressBar = document.querySelector(".clock-progress-bar");
const clockBackground = document.querySelector(".clock");

function addZeros(unit) {
  const numberAsString = unit.toString();
  const lengthOfNumber = numberAsString.length;
  return (lengthOfNumber < 2) ? "0" + numberAsString : numberAsString;
};

//converts to hexadecimal
function toHex(unit) {
  //addZeros() is used regardless of if the number is 1 digit or not.
  const unitAsNumber = Number(unit);
  const numberAsHexString = unitAsNumber.toString(16); // 16 parameter changes number to a certain base before converting to a string
  return addZeros(numberAsHexString);
};

setInterval(function(){
  //updates the time constantly here
  const hours = addZeros(new Date().getHours());
  const minutes = addZeros(new Date().getMinutes());
  const seconds = addZeros(new Date().getSeconds()); //new Date has to be set every time because if we don't, the date will not change. Using it outside the function in another function, and calling that function, will still make it remain stagnant.

  const currentTime = hours + ":" + minutes + ":" + seconds;
  // console.log(currentTime);
  const hexString = "#" + toHex(hours) + toHex(minutes) + toHex(seconds);
  const hexTime = "" + toHex(hours) + ":" + toHex(minutes) + ":" + toHex(seconds);

  const secondsInOneMinute = 60;
  const secondsPercent = (seconds / secondsInOneMinute) * 100;
  // Approximate length of clock display, used to determine how long the progress bar below it should be at 60 seconds, and what percentage of that later
  const lengthOfClockDisplay = 14;
  const barPercent = (secondsPercent * lengthOfClockDisplay) / 100; //See math below setInterval() for some scribbled shown work

  clockBackground.style.background = hexString;

  clockDisplay.textContent = currentTime;

  // The two event listeners and ternary below determine what to do when clockDisplay is hovered over. Only updates every turn of setInterval...

  clockDisplay.addEventListener("mouseover", () => {
    isHovering = true;
  });
  clockDisplay.addEventListener("mouseout", () => {
    isHovering = false;
  });

  isHovering
  ?
    clockDisplay.innerHTML = hexTime
  :
    clockDisplay.innerHTML = currentTime;
  
  clockProgressBar.style.width=`${barPercent}rem`; //change width of progress bar
}, 1);

/*
30 / 60 * 100 = 50% of 60
x / 14 * 100 = 50% of 14



30/60 = x/14
(((seconds*14)/60) = 7) / 14) * 100
420/60

50/100 = x/14
(50*14)/100

*/



//
// window.setInterval(displayTime());
