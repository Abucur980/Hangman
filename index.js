document.getElementById("btn-start").addEventListener('click', startGame);

function startGame() {
    const theWord = document.getElementById("theWord").value;

    // hide intro part and show the components
    document.getElementById("introduction").style.display = "none";
    document.getElementById("hangman").classList.remove("d-none");
    document.getElementById("keyboard").classList.remove("d-none");

    // tries represent the number of chars of the word + 3
    let tries = 5;
    document.getElementById("tries").innerHTML = "Tries left: " + tries;

    // generate the char placeholders
    for (let i = 0; i < theWord.length; ++i) {
        document.getElementById("charPlaceholder").insertAdjacentHTML("beforeend", '<span class="hiddenChar me-1 chars">&#9679;</span>');
    }


    
    // make the char keys work
    const keyChars = document.querySelectorAll("#char");
    const hiddenChar = document.querySelectorAll(".hiddenChar");
    const hangmanImg = document.getElementById("hangman-img");
    let hangmanImgPosition = hangmanImg.style.left;

    for (let i = 0; i < keyChars.length; ++i) {
        keyChars[i].addEventListener("click", () => {

            if (theWord.indexOf(keyChars[i].textContent) > -1) {

                for (let j = 0; j < theWord.length; ++j) {
                    if (theWord[j] == keyChars[i].textContent) {
                        hiddenChar[j].textContent = keyChars[i].textContent;
                    }
                }

            } else {
                hangmanImgPosition -= 75;
                hangmanImg.style.left = hangmanImgPosition + "px";
                --tries;
                document.getElementById("tries").innerHTML = "Tries left: " + tries;
            }

        });
    }

}
