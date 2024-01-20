// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //grab the current time
  var timeNow = dayjs();

  //display current date on top of the screen
  $('#currentDay').html("Today is " + timeNow.format('dddd, MMMM D, YYYY'))

  //traverse through each time-block and render existing tasks if present
  $('.time-block').each(function () {
    var currentHour = idParse((this).id);
    var timeSlot = $(this).children('.hour')[0].textContent;
    var task = JSON.parse(localStorage.getItem(timeSlot));

    if (task !== null) {
      $(this).children('.description').html(task)
    }

    //Add classes based on whether current time slot is in the past present or future

    if (currentHour < parseInt(timeNow.hour())) {
      $(this).addClass('past')
    } else if (currentHour === parseInt(timeNow.hour())) {
      $(this).addClass('present')
    } else {
      $(this).addClass('future')
    }
  })

  //add event listeners to each button, save each task if present into local storage
  $('.saveBtn').each(function() {
    $(this).on("click", function() {
      var timeSlot = $(this).siblings('.hour')[0].textContent;
      var task = $(this).siblings('.description').val();
      saveToLocal(timeSlot, task)
    })
  })

  //save task to local storage
  function saveToLocal(timeSlot, description) {
    var task = JSON.parse(localStorage.getItem(timeSlot));
    task = description;
    localStorage.setItem(timeSlot, JSON.stringify(task));
  }

  //helper method parsing div id into a comparable hour element
  function idParse(stringId) {
    stringId = stringId.replace('hour-', '');
    return parseInt(stringId, 10);
  }

});
