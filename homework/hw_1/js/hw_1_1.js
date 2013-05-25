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
	$(".warning-empty-field").each(function () { $(this).remove() });
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
	$(".warning-empty-field").each(function () { $(this).remove() });
	if ($(this).find("input[name=login]").val() == "" || $(this).find("textarea").val() == "") {
		var warning = $("<p class='warning-empty-field'><span>!</span> Пожалуйста, заполните все поля перед отправкой</p>");
		warning.css("left", -window.screen.width/2 + "px");
		$(this).find(".textarea-parent").after(warning);
		warning.animate({"left": "-1.5em"}, 1000, "easeOutBounce");
		return false;
	}

	var comment = $("<div class='comment-parent clearfix'><section class='comment'><p><span class='login'></span><span class='date-time'></span></p><p class='text-of-comment'></p><a class='answer-link' id='addAnswer' href='#'>Ответить</a></section><section class='answers'></section></div>");
	var answer = $(this).closest("section").attr("id") == "newComment" ? false : true;
	comment.find("span.login").text($(this).find("input[name=login]").val());
	comment.find(".text-of-comment").text($(this).find("textarea").val());

	$.ajax("http://json-time.appspot.com/time.json?tz=Europe/Moscow",
	{
		dataType: "JSONP",
		crossDomain: true,
		type: "get",
		success: function (data) {
			var dayOfWeek = data.datetime.slice(0, 3);
			var day = data.datetime.slice(5, 7);
			var month = data.datetime.slice(8, 11);
			var year = data.datetime.slice(12, 16);
			var time = data.datetime.slice(17, 22);

			switch (dayOfWeek) {
				case "Sun": {
					dayOfWeek = "воскресенье";
					break;
				}
				case "Mon": {
					dayOfWeek = "понедельник";
					break;
				}
				case "Tue": {
					dayOfWeek = "вторник";
					break;
				}
				case "Wed": {
					dayOfWeek = "среда";
					break;
				}
				case "Thu": {
					dayOfWeek = "четверг";
					break;
				}
				case "Fri": {
					dayOfWeek = "пятница";
					break;
				}
				case "Sat": {
					dayOfWeek = "суббота";
					break;
				}
			}

			switch (month) {
				case "January": {
					month = "01";
					break;
				}
				case "February": {
					month = "02";
					break;
				}
				case "March": {
					month = "03";
					break;
				}
				case "April": {
					month = "04";
					break;
				}
				case "May": {
					month = "05";
					break;
				}
				case "June": {
					month = "06";
					break;
				}
				case "July": {
					month = "07";
					break;
				}
				case "August": {
					month = "08";
					break;
				}
				case "September": {
					month = "09";
					break;
				}
				case "October": {
					month = "10";
					break;
				}
				case "November": {
					month = "11";
					break;
				}
				case "December": {
					month = "12";
					break;
				}
			}

			comment.find(".date-time").text(time + ", " + dayOfWeek + ", " + day + "." + month + "." + year);
		}
	});

	if (answer) {
		$(this).parent().prev().text("Ответить").attr("id", "addAnswer");
		$(this).closest(".comment").next().prepend(comment);
		$(this).parent().slideUp(500, function() { $(this).remove() });
	}
	else {
		$("#oldComments").prepend(comment);
		$(this).find("input[name=login]").val("");
		$(this).find("textarea").val("") ;
	}
}