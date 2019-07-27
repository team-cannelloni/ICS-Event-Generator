// Listen for the click of the file generation button in index.html, then run download().
document.getElementById('generate-file-button').addEventListener('click', download);

// Listen for the copy Start Date button click
document.getElementById('copy-date').addEventListener('click', copyDates);

//Listen for Get My GPS Location button click
document.getElementById('myGPS').addEventListener('click', findLocation);

//Determines global position through browser
function findLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayPosition);
  } else {
    myLocation.innerHTML = "I'm sorry but your browser does not support this function.  Please input manually";
  }
}

/**
 * Shows the count option when there is a change made to the repeat rule input
 */
function showCount() {
  const element = document.getElementById('event-repeat-count-container');
  const customElement = document.getElementById('event-repeat-custom-container');
  const id = document.getElementById('event-repeat-rule').value;
  if (id === 'DAILY' || id === 'MONTHLY' || id === 'WEEKLY' || id === 'YEARLY') {
    customElement.style.display = 'none;'
    element.style.display = 'block';
  } else if (id === 'custom') {
    customElement.style.display = 'block';
    element.style.display = 'none';
  }
}

//Displays and inputs current latitude and longitude
function displayPosition(position) {
  document.getElementById('event-latitude').value = position.coords.latitude;
  document.getElementById('event-longitude').value = position.coords.longitude;
  document.getElementById('event-location').value = position.coords.latitude + ", " + position.coords.longitude;
}

//Formats GPS coordinates to RFC 5545 standard
function geoFormatter(input1, input2) {
  return input1 + ';' + input2;
}

/** Copies the start date to the end date in the form */
function copyDates() {
  const start = document.getElementById('event-start-date').value;
  document.getElementById('event-end-date').value = start;
}

/**
 * Generates the ICS file
 * @param filename the name of the file to download
 * @param text the text to write into the file.
 */
function generateFile(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Sets the data for the download.  Called by the click event listener tied to the generate button.
 */
function download() {

  /** Validates any text input to make sure that the field is filled out and was not
   * left blank.  Strips any illegal characters.  Displays an error if the input was not
   * correctly filled out.
   * @param text the text to validate
   * @param id the id of the HTML element
   * @return true if ok, false if not ok.
   */
  function validateRequiredTextInput(text, id) {
    text = text.trim();
    if (text === '') {
      showWarning('* Required Field', `${id}-area`, `${id}-warning`);
      return false;
    } else {
      hideWarning(`${id}-area`, `${id}-warning`);
      return true;
    }
  }


  /** This function generates a recurring rule based in the inputs from
   * the user.
   */
  function generateRecurringRule() {
    let rule = '';
    // The user has selected custom days for the recurrence
    if (document.getElementById('event-repeat-rule').value === 'custom') {
      let dayString = '';

      if (document.getElementById('sunday-checkbox').checked) {
        dayString += `${document.getElementById('sunday-checkbox').value},`;
      }

      if (document.getElementById('monday-checkbox').checked) {
        dayString += `${document.getElementById('monday-checkbox').value},`;
      }

      if (document.getElementById('tuesday-checkbox').checked) {
        dayString += `${document.getElementById('tuesday-checkbox').value},`;
      }

      if (document.getElementById('wednesday-checkbox').checked) {
        dayString += `${document.getElementById('wednesday-checkbox').value},`;
      }

      if (document.getElementById('thursday-checkbox').checked) {
        dayString += `${document.getElementById('thursday-checkbox').value},`;
      }

      if (document.getElementById('friday-checkbox').checked) {
        dayString += `${document.getElementById('friday-checkbox').value},`;
      }

      if (document.getElementById('saturday-checkbox').checked) {
        dayString += `${document.getElementById('saturday-checkbox').value},`;
      }

      if (dayString[dayString.length - 1] === ',') {
        dayString = dayString.substr(0, dayString.length - 1);
      }

      rule = `FREQ=WEEKLY;BYDAY=${dayString}`;
    } else {  // Use the normal rule
      rule = `FREQ=${document.getElementById('event-repeat-rule').value};COUNT=${document.getElementById('event-repeat-count').value}`;
    }



    return rule;
  }

  /** Validates the user input dates and times
   * @param data object containing the data to evaluate
   * @return results containing valid or not
   */
  function validateDateTimes(data) {

    // Object containing final results
    const results = {
      start: {
        valid: true
      },
      end: {
        valid: true
      }
    }

    // Check to make certain the dates are valid
    Object.keys(data).forEach(key => {
      date = new Date(data[key].date);
    if (!date.getTime()) {
      results[key].valid = false;
      showWarning('*Invalid Date', `${data[key].dateId}-area`, `${data[key].dateId}-warning`);
      return results;
    } else {
      hideWarning(`${data[key].dateId}-area`, `${data[key].dateId}-warning`);
    }
  });
    
    let startDate = new Date(data.start.date);
    let endDate = new Date(data.end.date);

    let startTime = data.start.time.split(':');
    let endTime = data.end.time.split(':');

    if (data.start.time === '' || data.end.time === '') {
      if (data.start.time === '') {
        results.start.valid = false;
        showWarning('*Invalid Time', `${data.start.timeId}-area`, `${data.start.timeId}-warning`);
      } else {
        hideWarning(`${data.start.timeId}-area`, `${data.start.timeId}-warning`);
      }
      if (data.end.time === '') {
        results.end.valid = false;
        showWarning('*Invalid Time', `${data.end.timeId}-area`, `${data.end.timeId}-warning`);
      } else {
        hideWarning(`${data.end.timeId}-area`, `${data.end.timeId}-warning`);
      }
      return results;
    }
 
    startDate.setTime(startDate.getTime() + (parseInt(startTime[0], 10) + 60 * 60 * 1000) + (parseInt(startTime[1], 10) + 60 * 1000));
    endDate.setTime(endDate.getTime() + (parseInt(endTime[0], 10) + 60 * 60 * 1000) + (parseInt(endTime[1], 10) + 60 * 1000));
    
    if (startDate.getTime() > endDate.getTime()) {
      showWarning('*Ends before start', `${data.end.dateId}-area`, `${data.end.dateId}-warning`);
      showWarning('*Ends before start', `${data.end.timeId}-area`, `${data.end.timeId}-warning`);
      results.end.valid = false;
    } else {
      hideWarning(`${data.end.dateId}-area`, `${data.end.dateId}-warning`);
      hideWarning(`${data.end.timeId}-area`, `${data.end.timeId}-warning`);
    }
    return results;
  }

  /** Validates the input data
   * @param data the data object
   * @return object containing true of no error, false if error
   */
  function validate(data) {
    return {
      xWrCalname: validateRequiredTextInput(data.xWrCalname, 'event-name'),
      description: validateRequiredTextInput(data.description, 'event-description'),
      summary: validateRequiredTextInput(data.summary, 'event-summary'),
      location: validateRequiredTextInput(data.location, 'event-location')
    };
  }

  /** Shows a warning for a field that was not properly filled out
   * @param warningText the warning text to display
   * @param elementId the HTML element id
   */
  function showWarning(warningText, elementId, warningId) {
    element = document.getElementById(elementId);
    warningElement = document.getElementById(warningId);
    warningElement.innerHTML = warningText;
    warningElement.style.opacity = 1;
  }

  function hideWarning(elementId, warningId) {
    element = document.getElementById(elementId);
    warningElement = document.getElementById(warningId);
    warningElement.innerHTML = '';
    warningElement.style.opacity = 0;
  }

  //Formats date and time to RFC 5545 standard
  function dtFormatter(input1, input2) {
    const fDate= input1 + 'T' + input2 + '00';
    return fDate.replace(/[-:]/g, "");
  }

  function getDtStamp() {
    const x = new Date();
    let string = x.toISOString();
    return string.replace(/[-:.]/g, '');
  }

  const dates = {
    start: {
      date: document.getElementById('event-start-date').value,
      time: document.getElementById('event-start-time').value,
      dateId: 'event-start-date',
      timeId: 'event-start-time'
    },
    end: {
      date: document.getElementById('event-end-date').value,
      time: document.getElementById('event-end-time').value,
      dateId: 'event-end-date',
      timeId: 'event-end-time'
    }
  }

  const dateTime = validateDateTimes(dates);
  const recurringRule = generateRecurringRule();

  const data = {
    begin: 'VCALENDAR',
    version: '2.0',
    prodid: '-//ICS 414//Team-cannelloni',
    xWrCalname: document.getElementById('event-name').value,
    calscale: 'GREGORIAN',
    begintz: 'VTIMEZONE',
    tzid: 'Pacific/Honolulu',
    tzurl: 'http://tzurl.org/zoneinfo-outlook/Pacific/Honolulu',
    xLicLocation: 'Pacific/Honolulu',
    beginzone: 'Pacific/Honolulu',
    tzoffsetfrom: '-1000',
    tzoffsetto: '-1000',
    tzname: 'HST',
    dtstart: dtFormatter(document.getElementById('event-start-date').value,
        document.getElementById('event-start-time').value),
    dtend: dtFormatter(document.getElementById('event-end-date').value,
        document.getElementById('event-end-time').value),
    rrule: recurringRule,
    endtype: 'STANDARD',
    endtz: 'VTIMEZONE',
    beginevent: 'VEVENT',
    dtstamp: getDtStamp(),
    uid: `${getDtStamp()}-2089128844@cannelloni`,
    priority: document.getElementById('event-priority').value,
    class: document.getElementById('event-classification').value,
    summary: document.getElementById('event-summary').value,
    geo: geoFormatter(document.getElementById('event-latitude').value,
        document.getElementById('event-longitude').value),
    description: document.getElementById('event-description').value,
    location: document.getElementById('event-location').value
  };

  const errors = validate(data);
  let valid = true;
  Object.keys(errors).forEach(key => {
    if (!errors[key]) {
    console.log('error');
    valid = false;
  }
});

  if (!(valid && dateTime.start.valid && dateTime.end.valid)) {
    return;
  }

  // Generate download of hello.txt file with some content
  const dataArray = [`BEGIN:${data.begin}`,
    `VERSION:${data.version}`,
    `PRODID:${data.prodid}`,
    `X-WR-CALNAME:${data.xWrCalname}`,
    `CALSCALE:${data.calscale}`,
    `BEGIN:${data.begintz}`,
    `TZID:${data.tzid}`,
    `TZURL:${data.tzurl}`,
    `X-LIC-LOCATION:${data.xLicLocation}`,
    `BEGIN:STANDARD`,
    `TZOFFSETFROM:${data.tzoffsetfrom}`,
    `TZOFFSETTO:${data.tzoffsetto}`,
    `TZNAME:${data.tzname}`,
    `END:${data.endtype}`,
    `END:${data.endtz}`,
    `BEGIN:${data.beginevent}`,
    `DTSTAMP:${data.dtstamp}`,
    `PRIORITY:${data.priority}`,
    `CLASS:${data.class}`,
    `RRULE:${data.rrule}`,
    `UID:${data.uid}`,
    `DTSTART:${data.dtstart}`,
    `DTEND:${data.dtend}`,
    `SUMMARY:${data.summary}`,
    `GEO:${data.geo}`,
    `DESCRIPTION:${data.description}`,
    `LOCATION:${data.location}`,
    'END:VEVENT',
    'END:VCALENDAR'];

  let text = '';
  dataArray.forEach(line => text += `${line}\r\n`);

  const filename = 'event.ics';

  generateFile(filename, text);
}