const btn_inc = document.getElementById("btn_inc");
const numStamp = document.getElementById("stamp_value");

const handleInc = () => {
  const num = parseInt(numStamp.innerText);
  numStamp.innerText = num + 1;
  console.log("num", num)
};
console.log(btn_inc)

btn_inc.addEventListener("click", handleInc);
