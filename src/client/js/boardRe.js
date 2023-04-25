const increaseBtns = document.querySelectorAll("#btnInc");
const decreaseBtns = document.querySelectorAll("#btnDec");

function handleCellClick(cell, stampId, totalValue, studentName) {
  const clickedCell = cell.parentNode; //parent node of the clicked cell (tr)
  const stampValue = clickedCell.querySelector("#stampValue");
  const studentRow = clickedCell.parentNode; // Entire row of the clicked cell
  const stampNum = parseInt(stampValue.innerText) + (cell.id === "btnInc" ? 1 : -1);
  const totalNum = parseInt(totalValue.innerText) + (cell.id === "btnInc" ? 1 : -1);
  stampValue.innerText = stampNum;
  totalValue.innerText = totalNum;

  // prepare to send to server
  const { stu_id } = studentName.dataset;
  const { stam_id } = stampId.dataset;
  const body = JSON.stringify({ stam_id, stampNum, totalNum });
  console.log(body);

  fetch(`/student/${stu_id}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
}

increaseBtns.forEach((cell) => {
  cell.addEventListener("click", () => {
    console.log("click +");
    const stampId = cell.parentNode.querySelector("#stampId");
    const totalValue = cell.parentNode.parentNode.querySelector(".totalValue");
    const studentName = cell.parentNode.parentNode.querySelector("#studentName");
    handleCellClick(cell, stampId, totalValue, studentName);
  });
});

decreaseBtns.forEach((cell) => {
  cell.addEventListener("click", () => {
    console.log("click -");
    const stampId = cell.parentNode.querySelector("#stampId");
    const totalValue = cell.parentNode.parentNode.querySelector("#totalValue");
    const studentName = cell.parentNode.parentNode.querySelector("#studentName");
    handleCellClick(cell, stampId, totalValue, studentName);
  });
});
