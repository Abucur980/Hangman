(function() {
	let tries = 6;
	const keyChars = document.querySelectorAll("#char");
	const hangmanImg = document.getElementById("hangman-img");
	let hangmanImgPosition = hangmanImg.style.left;
	// how many letters has the user found
	let lettersFound = 0;
	document.getElementById("btn-start").addEventListener('click', startGame);

	function startGame() {
		const theWord = document.getElementById("theWord").value;

		showInterface();
		generateWordPlaceholder(theWord);

		const hiddenChar = document.querySelectorAll(".hiddenChar");
		// add event listener to each button that forms the keyboard 
		for (let i = 0; i < keyChars.length; ++i) {
			keyChars[i].addEventListener("click", () => {
				checkButton(i, theWord, hiddenChar);
			});
		}
	}

	function showInterface() {
		document.getElementById("introduction").style.display = "none";
		document.getElementById("hangman").classList.remove("d-none");
		document.getElementById("keyboard").classList.remove("d-none");
		document.getElementById("tries").innerHTML = "Tries left: " + tries;
	};

	// generate the char placeholders
	function generateWordPlaceholder(word) {
		for (let i = 0; i < word.length; ++i) {
			document.getElementById("charPlaceholder").insertAdjacentHTML("beforeend", '<span class="hiddenChar me-1 chars">&#9679;</span>');
		}
	}

	function checkButton(i, theWord, hiddenChar) {
		// check if button char exists in the word
		if (theWord.indexOf(keyChars[i].textContent) > -1) {
			for (let j = 0; j < theWord.length; ++j) {
				let currentChar = "null for the moment";
				if (theWord[j] == keyChars[i].textContent) {
					// reveal the char
					console.log(hiddenChar[j].textContent);
					hiddenChar[j].textContent = keyChars[i].textContent;
					currentChar = keyChars[i].textContent;
					if (theWord[j] == currentChar) {
						++lettersFound;
						keyChars[i].setAttribute("disabled", "");
					}
					if (lettersFound == theWord.length) {
						userWon();
					}
				}
			}
		} else {
			if (tries <= 1) {
				userLost(theWord);
			}
			// move the hangman image
			hangmanImgPosition -= 75;
			hangmanImg.style.left = hangmanImgPosition + "px";
			--tries;
			document.getElementById("tries").innerHTML = "Tries left: " + tries;
		}
	}

	function userWon() {
		document.getElementById("success").classList.remove("d-none");
		document.getElementsByTagName("main")[0].style.display = "none";
	}

	function userLost(word) {
		document.getElementById("fail").classList.remove("d-none");
		const answer = document.createTextNode(word);
		document.getElementById("fail-text").appendChild(answer);
		document.getElementsByTagName("main")[0].style.display = "none";
	}
	})();