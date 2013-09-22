var number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
	operation = ["+", "=", "-", "/", "*"],
	comprassion = ["<", ">"],
	divider = [";", ",", "(", ")", ":", " ", "\n"],
	type = ["$", "%", "&", "!", "#"],
	//===================================================
	functionWords = ["IF", "THEN", "ELSE", "END", "STOP", "DIM", "RETURN", "GOSUB", "GOTO"],
	twoLitersOperation = ["<=", ">=", "<>"],
	//===================================================
	table = {
		s: {
			letter: 1,
			number: 2,
			".": 4,
			operation: "s",
			comprassion: 6,
			divider: "s",
			"\"": 11
		},
		1: {
			letter: 1,
			number: 5,
			divider: "s",
			type: 8
		},
		2: {
			number: 2,
			".": 3,
			e: 9,
			E: 9,
			divider: "s",
			operation: "s",
			comprassion: "s"
		},
		3: {
			number: 3,
			divider: "s",
			operation: "s",
			comprassion: "s"
		},
		4: {
			number: 3
		},
		5: {
			letter: 5,
			number: 5,
			type: 8,
			divider: "s"
		},
		6: {
			divider: "s",
			letter: "s",
			operation: "s"
		},
		8: {
			divider: "s",
			comprassion: "s",
			operation: "s"
		},
		9: {
			operation: 10,
			number: 3,
		},
		10: {
			number: 3
		},
		11: {
			"\"": "s"
		}
	};

onmessage = function (event) {
    var storageFile;
    Windows.Storage.KnownFolders.documentsLibrary.getFileAsync(event.data).done(function (file) {
        storageFile = file;
    });
    Windows.Storage.FileIO.readTextAsync(storageFile).done(function (content) {
        readFile(content);
    });
}

function readFile(text) {
	var	size = text.length,
		buffer = "",
		state = "s",
		prevState = "s",
		out = "",
		identificators = [],
		stringConstants = [],
		numberConstants = [];

   	for (var i = 0; i < size; i++)
   	{
   		var char = text[i];
   		prevState = state;
   		state = table[state][classOfChar(char)];
   		if (state === "s") {
   			switch (prevState) {
   				case "s": {
   					if (divider.indexOf(char) !== -1) {
   						if (char !== " " && char !== "\n")
   							out += " R" + (divider.indexOf(char) + 1);
   						i++;
   					} else if (operation.indexOf(char) !== -1) {
   						out += " O" + (operation.indexOf(char) + 1);
   						i++;
   					}
   					break;
   				}
   				case 1: {
   					if (functionWords.indexOf(buffer) !== -1) {
   						out += " W" + (functionWords.indexOf(buffer) + 1);
   					} else {
   						if (identificators.indexOf(buffer) === -1)
   							identificators.push(buffer);
   						out += " I" + (identificators.indexOf(buffer) + 1);
	   				}
   					break;
   				}
   				case 2:
   				case 3: {
   					if (numberConstants.indexOf(+buffer) === -1) 
   						numberConstants.push(+buffer);
   					out += " N" + (numberConstants.indexOf(+buffer) + 1);
   					break;
   				}
   				case 5: {
   					if (identificators.indexOf(buffer) === -1) 
   						identificators.push(buffer);
   					out += " I" + (identificators.indexOf(buffer) + 1);
   					break;
   				}
   				case 6: {
   					var temp = buffer + char;
   					if (twoLitersOperation.indexOf(temp) !== -1) {
   						out += " O" + (twoLitersOperation.indexOf(temp) + 8);
   						i++;
   					} else {
   						out += " O" + (comprassion.indexOf(buffer) + 6);
   					}
   					break;
   				}
   				case 8: {
   					var temp = buffer;
   					temp = temp.substr(0, temp.length - 1);
   					if (identificators.indexOf(temp) === -1)
   						identificators.push(temp);
   					out += " I" + (identificators.indexOf(temp) + 1);
   					break;
   				}
   				case 11: {
   					var temp = eval(buffer);
   					if (!(buffer in stringConstants))
   						stringConstants.push(temp);
   					out += " C" + (stringContsants.indexOf(temp) + 1);
   					break;
   				}
   			}
   			i--;
   			buffer = "";
   		} else
   			buffer += char;

   		if (char === "\n")
   			out += "\n";
   	}
	

   	return out;
}

function classOfChar(char) {
	if (letter.indexOf(char) !== -1)
		return "letter";
	else if (number.indexOf(char) !== -1)
		return "number";
	else if (divider.indexOf(char) !== -1)
		return "divider";
	else if (operation.indexOf(char) !== -1)
		return "operation";
	else if (comprassion.indexOf(char) !== -1)
		return "comprassion";
	else if (type.indexOf(char) !== -1)
		return "type";
	else
		return char;
}