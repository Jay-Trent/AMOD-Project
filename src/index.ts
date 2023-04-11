import { productJson } from "./Jsons/products_json";
import { apItemsetJson } from "./Jsons/ap_json";
import { fpJson } from "./Jsons/fp_json";
let edaContainer = document.getElementById("edaTag");
let predictionContainer = document.getElementById("predictionTag");
let comparisionContainer = document.getElementById("comparisionTag");
let listItems = document.getElementsByClassName("main_nav_ul_li");

//Startup Binding
listItems[0].getElementsByTagName("a")[0].classList.add("selectedOp");

loading();
addRemoveSelection("edaTag");

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
  } else if (selectedView == "predictionTag") {
    listItems[1].getElementsByTagName("a")[0].classList.add("selectedOp");
    comparisionContainer?.classList.add("RemoveFromView");
    edaContainer?.classList.add("RemoveFromView");
    predictionContainer?.classList.remove("RemoveFromView");
    predictionContainer?.classList.add("w3-animate-left");
  }
}

// EDA charts
setTimeout(() => {
  let divElement = document.getElementsByClassName("tableauPlaceholder");
  let scriptElement = document.createElement("script");
  scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
  for (let i = 0; i < divElement.length; i++) {
    let vizElement = divElement[i].getElementsByTagName("object")[0];
    vizElement.style.width = "1100px";
    vizElement.style.height = "750px";

    vizElement.parentNode?.insertBefore(scriptElement, vizElement);
  }
  let vizElement = divElement[1].getElementsByTagName("object")[0];
  vizElement.style.height = "950px";

  vizElement = divElement[2].getElementsByTagName("object")[0];
  vizElement.style.height = "950px";

  vizElement = divElement[3].getElementsByTagName("object")[0];
  vizElement.style.height = "950px";

  vizElement = divElement[4].getElementsByTagName("object")[0];
  vizElement.style.height = "950px";
});

//Get products function
function getProdcutName(productId: string) {
  return productJson[productId];
}

//Select  menu for itemSets
let selectItemset = document.getElementById("itemSetSelect");
const itemSets = {
  "Apriori Algorithm": 1,
  "FP Growth": 2,
};
let slectedItemset = "Apriori Algorithm";
function loadSelectItemsetOptions() {
  for (let key in itemSets) {
    let input = document.createElement("input");
    input.setAttribute("class", "selectopt");
    input.setAttribute("type", "radio");
    input.setAttribute("id", key);
    if (key === slectedItemset) {
      input.setAttribute("checked", "true");
    }
    let label = document.createElement("label");
    label.setAttribute("for", key);
    label.setAttribute("class", "option");
    label.innerText = key;

    selectItemset.appendChild(input);
    selectItemset.appendChild(label);
  }
}
function removeSelectItemsetOptions() {
  for (let key in itemSets) {
    selectItemset.removeChild(selectItemset.getElementsByTagName("input")[0]);
    selectItemset.removeChild(selectItemset.getElementsByTagName("label")[0]);
  }
}
loadSelectItemsetOptions();
selectItemset.addEventListener("change", (e) => {
  slectedItemset = e.target["id"];
  removeSelectItemsetOptions();
  loadSelectItemsetOptions();
});

//Select  products
let selectProduct = document.getElementById("productSelection");
function loadSelectProductOptions() {
  for (let key in productJson) {
    let input = document.createElement("input");
    input.setAttribute("class", "selectopt");
    input.setAttribute("type", "radio");
    input.setAttribute("id", key);

    let label = document.createElement("label");
    label.setAttribute("for", key);
    label.setAttribute("class", "option");
    label.innerText = productJson[key];

    selectProduct.appendChild(input);
    selectProduct.appendChild(label);
  }
}
function removeSelectItemsOptions() {
  for (let key in productJson) {
    selectProduct.removeChild(selectProduct.getElementsByTagName("input")[0]);
    selectProduct.removeChild(selectProduct.getElementsByTagName("label")[0]);
  }
}
let selectedProductList: string[] = [];
const selectedProductBox = document.getElementsByClassName("box")[0];
loadSelectProductOptions();
selectProduct.addEventListener("change", (e) => {
  if (!selectedProductList.includes(e.target["id"])) {
    removeSelectItemsOptions();
    selectedProductList.push(e.target["id"]);
    let div = document.createElement("div");
    div.setAttribute("class", "box_products");
    div.innerText = productJson[e.target["id"]];
    selectedProductBox.appendChild(div);
    loadSelectProductOptions();
  }
});

//on submit click to find products
const findRelatedProductBtn = document.getElementById("reltedProductsBtn");
let predictionResult: {
  count: number;
  support: number;
  item: string;
}[] = [];

checkForTableDisplay();

findRelatedProductBtn.addEventListener("click", (e) => {
  console.log(e);
  predictionResult = [];
  if(selectedProductList.length)
  {

    findReltedItems();
    generateRowsForPredictionTable();
    checkForTableDisplay();
  }else 
  {
    alert('Marderchod product select kar!!')
  }
});

function findReltedItems() {
  let itemSetToUse = {};
  if (slectedItemset == "Apriori Algorithm") {
    itemSetToUse = apItemsetJson;
  } else {
    itemSetToUse = fpJson;
  }
  const newREsultset = {};
  selectedProductList.forEach((itm) => {
    const itemObj = itemSetToUse[itm];
    Object.keys(itemObj).forEach((re_itm) => {
      if (itm != re_itm) {
        if (newREsultset[re_itm] != undefined) {
          const temp = JSON.parse(JSON.stringify(newREsultset[re_itm]));
          temp.count = temp.count + 1;
          temp.support =
            +newREsultset[re_itm].support < +itemObj[re_itm]
              ? +itemObj[re_itm]
              : +newREsultset[re_itm].support;
          newREsultset[re_itm] = JSON.parse(JSON.stringify(temp));
        } else {
          newREsultset[re_itm] = {
            count: 0,
            support: +itemObj[re_itm],
          };
        }
      }
    });
  });
  console.log(newREsultset);
  // console.log(Object.keys(newREsultset).length);

  let max_count = 0;
  Object.keys(newREsultset).forEach((itm) => {
    predictionResult.push({
      count: newREsultset[itm].count,
      support: newREsultset[itm].support,
      item: itm,
    });
  });

  //sort by count
  predictionResult.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else if (a.count < b.count) {
      return 1;
    } else {
      return 0;
    }
  });

  // //sort by support
  // result = result.slice(0, numberOfPrediction);
  // result.sort((a, b) => {
  //   if (a.support > b.support) {
  //     return -1;
  //   } else if (a.support < b.support) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });
}

//Adding result into table
const resultTable = document.getElementById("predictionTableTbody");
const numberOfItemSuggested = 5;
function generateRowsForPredictionTable() {
  loading()
  let result = predictionResult.slice(0, numberOfItemSuggested);
  result = result.sort((a, b) => {
    if (a.support > b.support) {
      return -1;
    } else if (a.support < b.support) {
      return 1;
    } else {
      return 0;
    }
  });
  result.forEach((row) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = getProdcutName(row.item);
    let td2 = document.createElement("td");
    td2.innerHTML = "" + row.support * 10;
    let td3 = document.createElement("td");
    td3.innerText =
      "This products have " +
      row.support * 1000 +
      "% changes of buying it together.";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    resultTable.appendChild(tr);
  });
}

function clearThePredictionTableRows() {}

function checkForTableDisplay() {
  let table = document.getElementsByClassName("prediction_result_table")[0];
  if (!predictionResult.length) {
    table.classList.add("RemoveFromView");
  } else {
    table.classList.remove("RemoveFromView");
  }
}

function loading() {
  const nonLoading = document.getElementsByClassName("mainWrapper")[0];
  const loader = document.getElementsByClassName("lds-ring")[0];
  loader.classList.remove("RemoveFromView");
  setTimeout(() => {
    nonLoading.classList.remove("RemoveFromView");
    loader.classList.add("RemoveFromView");
  }, 5000);
}
