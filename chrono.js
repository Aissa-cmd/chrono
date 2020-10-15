const play = document.getElementById("play");
const reset = document.getElementById("reset");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const flagParent = document.querySelector(".flags-container");
const countNumber = document.querySelector(".counter-container");
const flagBtn = document.getElementById("flags");
const flagObj = {
    // properties
    count: 1,
    flagParentElement: document.querySelector(".flags-container"),

    // methods
    createFlagElement: function () {
        let flagElem = document.createElement("div");
        flagElem.classList.add("flag");
        return flagElem;
    },
    createFlagChild: function (childTagName, ChildClassName, ChildtextContent) {
        let flagChild = document.createElement(childTagName);
        flagChild.classList.add(ChildClassName);
        flagChild.textContent = ChildtextContent;
        return flagChild;
    },
    appendFlagToParent: function () {
        let flag = flagObj.createFlagElement();
        let flagPositionChild = flagObj.createFlagChild("span", "flag-position", String.prototype.padStart.call(flagObj.count, 2, "0"));
        let flagCountChild = flagObj.createFlagChild("span", "flag-count", countNumber.textContent);
        flag.appendChild(flagPositionChild);
        flag.appendChild(flagCountChild);
        flagObj.flagParentElement.appendChild(flag);
    },
};
var counter;

function chronoCounter() {
    var numberSeconds = parseInt(seconds.textContent);
    numberSeconds++;
    if (numberSeconds >= 60) {
        minutes.style.color = "#ffffff";
        document.querySelector(".minutse-seconds-separator").style.color = "#ffffff";
        var numberMinutes = parseInt(minutes.textContent);
        numberMinutes++;
        if (numberMinutes >= 60) {
            hours.style.color = "#ffffff";
            document.querySelector(".hours-minutes-separator").style.color = "#ffffff";
            var numberhours = parseInt(hours.textContent);
            numberhours++;
            hours.textContent = String.prototype.padStart.call(numberhours, 2, "0");
            numberMinutes = 0;
        }
        minutes.textContent = String.prototype.padStart.call(numberMinutes, 2, "0");
        numberSeconds = 0;
    }
    seconds.textContent = String.prototype.padStart.call(numberSeconds, 2, "0");
}

function toggleStartPause() {
    if (play.className == "start") {
        counter = window.setInterval(chronoCounter, 1000);
        play.className = "pause";
        play.innerHTML = "<i class='far fa-pause-circle'></i>";
    } else if (play.className == "pause") {
        clearInterval(counter);
        play.className = "start";
        play.innerHTML = "<i class='far fa-play-circle'></i>";
    }
}

flagBtn.addEventListener("click", function () {
    flagParent.style.display = "block";
    flagObj.appendFlagToParent();
    flagObj.count++;
});

play.addEventListener("click", function () {
    toggleStartPause();
});
reset.addEventListener("click", function () {
    clearInterval(counter);
    play.className = "start";
    play.innerHTML = "<i class='far fa-play-circle'></i>";
    minutes.style.color = "#ab1a43";
    hours.style.color = "#ab1a43";
    Array.prototype.forEach.call(document.querySelectorAll(".separator"), function (elem) {
        elem.style.color = "#ab1a43";
    });
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    const flagsObjects = document.querySelectorAll(".flag");
    Array.prototype.forEach.call(flagsObjects, function (flag) {
        flag.parentNode.removeChild(flag);
    });
    flagParent.style.display = "none";
    flagObj.count = 1;
});
