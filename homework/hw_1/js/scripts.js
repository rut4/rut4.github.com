$(function () {
	$("#enterId").on("click", ShowPopup);
})

function ShowPopup () {
	$("#overlayId").fadeIn(500);
	$("#popupId").fadeIn(500);
	$("#headerId").addClass("blur");
	$("#contentId").addClass("blur");
	$("#footerId").addClass("blur");
	$("#cancelId").on("click", ClosePopup);
	return false;
}

function ClosePopup () {
	$("#overlayId").fadeOut(500);
	$("#popupId").fadeOut(500);
	$("#headerId").removeClass("blur");
	$("#contentId").removeClass("blur");
	$("#footerId").removeClass("blur");
	return false;
}