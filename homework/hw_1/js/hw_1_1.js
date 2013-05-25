$(function () {
	var touch = "ontouchstart" in window;
	if (touch) {
		$(".profile").addClass("no-touch");
	}
	$("#comments")
	.on("click", "#addAnswer", AddAnswer)
	.on("submit", "#addComment", AddComment);
})

function AddAnswer(event) {
	event.preventDefault();
	$("#oldComments").find(".form_comment").animate({"height": 0}, function () { $(this).remove(); });
	var formComment = $("#newComment").children(".form_comment");
	var height = formComment.height();
	formComment = formComment.clone(true, true);
	formComment.find(".login-parent").children().val("");
	formComment.css("height", 0);
	$(this).after(formComment);
	formComment.animate({"height": height + "px"});
}

function AddComment(event) {
	event.preventDefault();
	if ($(this).find("input[name=login]").val() == undefined || $(this).find("textarea").val() == undefined)
		return false;

	var comment = $("<div class='comment-parent clearfix'><section class='comment'><p><span class='login'></span><span class='date-time'></span></p><p class='text-of-comment'></p><a class='answer-link' id='addAnswer' href='#'>Ответить</a></section><section class='answers'></section></div>");
	var answer = $(this).closest("section").attr("id") == "newComment" ? false : true;
	comment.find("span.login").text($(this).find("input[name=login]").val());
	comment.find(".text-of-comment").text($(this).find("textarea").val());
	if (answer)
		$(this).closest(".comment").next().prepend(comment);
	else
		$("#oldComments").prepend(comment);
	$(this).parent().animate({"height": 0}, function () { $(this).remove(); });
}