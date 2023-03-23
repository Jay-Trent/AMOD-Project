let edaContainer = document.getElementById("edaTag");
let predictionContainer = document.getElementById("predictionTag");
let comparisionContainer = document.getElementById("comparisionTag");
let listItems = document.getElementsByClassName("main_nav_ul_li");

//Startup Binding
listItems[0].getElementsByTagName("a")[0].classList.add("selectedOp");

addRemoveSelection('edaTag')









//Nav bar buttons change
listItems[0].addEventListener("click", (e) => {
  addRemoveSelection("edaTag");
});
listItems[1].addEventListener("click", (e) => {
  addRemoveSelection("predictionTag");
});
listItems[2].addEventListener("click", (e) => {
  addRemoveSelection("comparisionTag");
});

function removeSelection() {
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].getElementsByTagName("a")[0].classList.remove("selectedOp");
  }
}

function addRemoveSelection(selectedView: string) {
  removeSelection();
  if (selectedView === "edaTag") {
    listItems[0].getElementsByTagName("a")[0].classList.add("selectedOp");
    comparisionContainer?.classList.add("RemoveFromView");
    predictionContainer?.classList.add("RemoveFromView");
    edaContainer?.classList.remove("RemoveFromView");
    edaContainer?.classList.add("w3-animate-left");
  } else if (selectedView == "comparisionTag") {
    listItems[2].getElementsByTagName("a")[0].classList.add("selectedOp");
    edaContainer?.classList.add("RemoveFromView");
    predictionContainer?.classList.add("RemoveFromView");
    comparisionContainer?.classList.remove("RemoveFromView");
    comparisionContainer?.classList.add("w3-animate-left");
  } else if (selectedView == "predictionTag") {
    listItems[1].getElementsByTagName("a")[0].classList.add("selectedOp");
    comparisionContainer?.classList.add("RemoveFromView");
    edaContainer?.classList.add("RemoveFromView");
    predictionContainer?.classList.remove("RemoveFromView");
    predictionContainer?.classList.add("w3-animate-left");
  }
}
try {
} catch (e) {}
