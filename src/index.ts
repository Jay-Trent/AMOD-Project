let edaContainer = document.getElementById("edaTag");
let predictionContainer = document.getElementById("predictionTag");
let comparisionContainer = document.getElementById("comparisionTag");
let listItems = document.getElementsByClassName("main_nav_ul_li");




addRemoveSelection('edaTag')
function addRemoveSelection(selectedView: string) {
  console.log("--")
  if (selectedView === "edaTag") {
    comparisionContainer?.classList.add("RemoveFromView");
    predictionContainer?.classList.add("RemoveFromView");
    edaContainer?.classList.remove("RemoveFromView");
    edaContainer?.classList.add("w3-animate-left");
  } else if (selectedView == "predictionTag") {
    comparisionContainer?.classList.add("RemoveFromView");
    predictionContainer?.classList.add("RemoveFromView");
    edaContainer?.classList.remove("RemoveFromView");
    edaContainer?.classList.add("w3-animate-left")
  } else if (selectedView == "comparisionTag") {
    comparisionContainer?.classList.add("RemoveFromView");
    predictionContainer?.classList.add("RemoveFromView");
    edaContainer?.classList.remove("RemoveFromView");
    edaContainer?.classList.add("w3-animate-left")
  }
}
try {
} catch (e) {}
