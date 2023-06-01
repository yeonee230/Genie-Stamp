
const increaseBtns = document.querySelectorAll("#btnInc");
const decreaseBtns = document.querySelectorAll("#btnDec");
const stampValue = document.getElementById("stampValue");
const stampId = document.getElementById("stampId");
const studentName = document.getElementById("studentName");
const totalValue = document.getElementById("totalValue");



//+ 버튼 클릭시
increaseBtns.forEach((cell) => {
  cell.addEventListener("click", async () => {
    console.log("click +");

    const clickedCell = cell.parentNode; //클릭한 셀의 부모 노드 (tr)
    const totalValue = clickedCell.parentNode.parentNode.children.totalValue; //클릭한 셀의 부모 노드의 자식 노드 중 total
    const stampValue = clickedCell.children.stampValue;
    const studentRow = clickedCell.parentNode.parentNode.children; //클릭한 셀의 전체 열
    // console.log('stampValue::',stampValue);
    // console.log('clickedCell::',clickedCell.dataset.stam);
    
    const stampNum = parseInt(stampValue.innerText) + 1;
    const totalNum = parseInt(totalValue.innerText) + 1;
    stampValue.innerText = stampNum;
    totalValue.innerText = totalNum;

    //서버로 보낼 준비
    const { stu_id } = studentRow.studentName.dataset;
    const { stam_id } = clickedCell.dataset;

    const body = JSON.stringify({ stam_id, stampNum, totalNum });
    console.log(body);
  

    await fetch(`/student/${stu_id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  });
});

// - 버튼 클릭시
decreaseBtns.forEach((cell) => {
  cell.addEventListener("click", async () => {
    console.log("click -");

    const clickedCell = cell.parentNode; //클릭한 셀의 부모 노드 (tr)
    const totalValue = clickedCell.parentNode.parentNode.children.totalValue; //클릭한 셀의 부모 노드의 자식 노드 중 total
    const stampValue = clickedCell.children.stampValue;
    const studentRow = clickedCell.parentNode.parentNode.children; //클릭한 셀의 전체 열
  
    const stampNum = parseInt(stampValue.innerText) - 1;
    const totalNum = parseInt(totalValue.innerText) - 1;
    stampValue.innerText = stampNum;
    totalValue.innerText = totalNum;

    //서버로 보낼 준비
    const { stu_id } = studentRow.studentName.dataset;
    const { stam_id } = clickedCell.dataset;

    const body = JSON.stringify({ stam_id, stampNum, totalNum });


    await fetch(`/student/${stu_id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  });
});

