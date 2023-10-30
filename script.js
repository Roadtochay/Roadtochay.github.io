window.addEventListener(
  "load",
  () => {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    let saveData = () => localStorage.setItem("data", listContainer.innerHTML);

    let adder = () => {
      if (inputBox.value === "") {
        alert("You must write something!");
      } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
      }
      inputBox.value = "";
      saveData();
    };

    document.getElementById("myButton").addEventListener("click", adder);

    let checker = ({ target }) => {
      if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveData();
      } else if (target.tagName === "SPAN") {
        target.parentElement.remove();
        saveData();
      }
    };

    listContainer.addEventListener("click", checker);

    (() => {
      listContainer.innerHTML = localStorage.getItem("data");
    })();

    window.addEventListener(
      "beforeunload",
      () => {
        listContainer.removeEventListener("click", checker);
        document.getElementById("myButton").removeEventListener("click", adder);
      },
      { once: true }
    );
  },
  { once: true }
);
