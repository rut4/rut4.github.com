window.onload = function () {
	document.getElementById("enterId").onclick = ShowPopup;
}

function ShowPopup () {
	document.getElementById("overlayId").style.display = "block";
	document.getElementById("popupId").style.display = "block";
	document.getElementById("headerId").classList.add("blur");
	document.getElementById("contentId").classList.add("blur");
	document.getElementById("footerId").classList.add("blur");
	document.getElementById("cancelId").onclick = ClosePopup;
	return false;
}

function ClosePopup () {
	document.getElementById("overlayId").style.display = "none";
	document.getElementById("popupId").style.display = "none";
	document.getElementById("headerId").classList.remove("blur");
	document.getElementById("contentId").classList.remove("blur");
	document.getElementById("footerId").classList.remove("blur");
	return false;
}