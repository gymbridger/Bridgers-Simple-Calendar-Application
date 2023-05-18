var currentTimeDisplay = $("#currentDay");
var saveButton = $(".saveBtn");

function displayTime() {
  var rightNow = dayjs().format("MMM DD, YYYY");
  currentTimeDisplay.text(rightNow);
}

function updateHourlyBlocks() {
  var currentHour = dayjs().hour();
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour >= 9 && blockHour <= 11) {
      $(this).addClass("past");
    } else if (blockHour === 12) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });
}

function saveToLocalStorage() {
  var hour = $(this).parent().attr("id");
  var eventText = $(this).siblings("textarea").val();

  localStorage.setItem(hour, eventText);
}

function loadEventsFromLocalStorage() {
  $(".time-block").each(function () {
    var id = $(this).attr("id");
    var event = localStorage.getItem(id);

    if (event !== null) {
      $(this).children("textarea").val(event);
    }
  });
}

saveButton.on("click", saveToLocalStorage);

displayTime();
setInterval(displayTime, 1000);

loadEventsFromLocalStorage();
updateHourlyBlocks();
setInterval(updateHourlyBlocks, 1000 * 60);
