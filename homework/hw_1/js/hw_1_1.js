$(function () {
	var touch = "ontouchstart" in window;
	if (touch) {
		$(".profile").addClass("no-touch");
	}
	$("#comments")
	.on("click", "#addAnswer", AddAnswer)
	.on("submit", "#addComment", AddComment)
	.on("click", "#deleteAnswersForm", DeleteAnswersForm);
})

function AddAnswer(event) {
	event.preventDefault();
	var oldComments = $("#oldComments");
	oldComments.find(".form_comment").slideUp(500, function() { $(this).remove() });
	oldComments.find("#deleteAnswersForm").text("Ответить").attr("id", "addAnswer");
	var formComment = $("#newComment").children(".form_comment");
	var height = formComment.height();
	formComment = formComment.clone(true, true);
	formComment.find(".login-parent").children().val("");
	formComment.css("display", "none");
	$(this).after(formComment);
	formComment.slideDown(500);
	$(this).text("Отменить").attr("id", "deleteAnswersForm");
}

function DeleteAnswersForm (event) {
	event.preventDefault();
	$(this).next().slideUp(500, function() { $(this).remove() });
	$(this).text("Ответить").attr("id", "addAnswer");
}

function AddComment(event) {
	event.preventDefault();
	if ($(this).find("input[name=login]").val() == "" || $(this).find("textarea").val() == "") {
		return false;
	}

	var comment = $("<div class='comment-parent clearfix'><section class='comment'><p><span class='login'></span><span class='date-time'></span></p><p class='text-of-comment'></p><a class='answer-link' id='addAnswer' href='#'>Ответить</a></section><section class='answers'></section></div>");
	var answer = $(this).closest("section").attr("id") == "newComment" ? false : true;
	comment.find("span.login").text($(this).find("input[name=login]").val());
	comment.find(".text-of-comment").text($(this).find("textarea").val());

	$.ajax("http://json-time.appspot.com/time.json?tz=Europe/Moscow", {
		type: "get",
		dataType: "json",
		success: function (data) {
			var day = data.datetime.slice(0, 3);
			comment.find(".date-time").text(day);
		}
	});
	if (answer) {
		$(this).closest(".comment").next().prepend(comment);
		$(this).parent().slideUp(500, function() { $(this).remove() });
	}
	else {
		$("#oldComments").prepend(comment);
		$(this).find("input[name=login]").val("");
		$(this).find("textarea").val("") ;
	}
}