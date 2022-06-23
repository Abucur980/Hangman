document.getElementById("btn-start").addEventListener('click', startGame);
let tries = 6;

function startGame() {
	const theWord = document.getElementById("theWord").value;
	// hide intro part and show the components
	document.getElementById("introduction").style.display = "none";
	document.getElementById("hangman").classList.remove("d-none");
	document.getElementById("keyboard").classList.remove("d-none");
	document.getElementById("tries").innerHTML = "Tries left: " + tries;
	// generate the char placeholders
	for(let i = 0; i < theWord.length; ++i) {
		document.getElementById("charPlaceholder").insertAdjacentHTML("beforeend", '<span class="hiddenChar me-1 chars">&#9679;</span>');
	}
	// make the char keys work
	const keyChars = document.querySelectorAll("#char");
	const hiddenChar = document.querySelectorAll(".hiddenChar");
	const hangmanImg = document.getElementById("hangman-img");
	let hangmanImgPosition = hangmanImg.style.left;
	// how many letters has the user found
	let lettersFound = 0;
	for(let i = 0; i < keyChars.length; ++i) {
		keyChars[i].addEventListener("click", () => {
			if(theWord.indexOf(keyChars[i].textContent) > - 1) {
				for(let j = 0; j < theWord.length; ++j) {
					let currentChar = "null for the moment";
					if(theWord[j] == keyChars[i].textContent) {
						hiddenChar[j].textContent = keyChars[i].textContent;
						currentChar = keyChars[i].textContent;
						if(theWord[j] == currentChar) {
							++lettersFound;
                            keyChars[i].setAttribute("disabled", "");
						}
						if(lettersFound == theWord.length) {
							document.getElementById("success").classList.remove("d-none");
							document.getElementsByTagName("main")[0].style.display = "none";
						}
					}
				}
			} else {
				if(tries <= 1) {
					document.getElementById("fail").classList.remove("d-none");
					const answer = document.createTextNode(theWord);
					document.getElementById("fail-text").appendChild(answer);
					document.getElementsByTagName("main")[0].style.display = "none";
				}
				hangmanImgPosition -= 75;
				hangmanImg.style.left = hangmanImgPosition + "px";
				--tries;
				document.getElementById("tries").innerHTML = "Tries left: " + tries;
			}
		});
	}
}