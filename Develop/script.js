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
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
