// Listen for the click of the file generation button in index.html, then run download().
document.getElementById('generate-file-button').addEventListener('click', download);

// Listen for the copy Start Date button click
document.getElementById('copy-date').addEventListener('click', copyDates);

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

  /* TODO: Validate form and check to make sure that all fields are properly filled out.
  *  If they are not filled out, notify the user on the html page.
  */

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
      return true;
    }
  }

  /** Validates the user input dates and times 
   * @param data object containing the data to evaluate
   * @return the validated data and any errors
  */
  function validateDateTimes(data) {

    // Object containing final results
    const results = {
      start: {
        timestamp: null,
        valid: true
      },
      end: {
        timestamp: null,
        valid: true
      }
    }

    // Check to make certain the dates are valid
    Object.keys(data).forEach(key => {
      date = new Date(data[key].date);
      if (!date.getTime()) {
        data[key].valid = false;
        showWarning('*Invalid Date', `${data[key].dateId}-area`, `${data[key].dateId}-warning`);
      }
    });

    console.log(data.start.time);
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

  const dateDate = validateDateTimes(dates);

  const eventLatitude = document.getElementById('event-latitude').value;
  const eventLongitude = document.getElementById('event-longitude').value;

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
    dtstart: '19700101T000000',
    dtend: '19700101T010000',
    rrule: `FREQ=DAILY;COUNT=${document.getElementById('event-repeat-rule').value}`,
    endtype: 'STANDARD',
    endtz: 'VTIMEZONE',
    beginevent: 'VEVENT',
    dtstamp: '20190621T035133Z',
    uid: '20190621T035133Z - 2089128844@marudot.com',
    priority: document.getElementById('event-priority').value,
    class: document.getElementById('event-classification').value,
    summary: document.getElementById('event-summary').value,
    geo: '21.29693;-157.81711',
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

  if (!valid) {
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
  `DTSTART:${data.dtstart}`,
  `END:${data.endtype}`,
  `END:${data.endtz}`,
  `BEGIN:${data.beginevent}`,
  `DTSTAMP:${data.dtstamp}`,
  `PRIORITY:${data.priority}`,
  `CLASS:${data.class}`,
  `RRULE:${data.rrule}`,
  `UID:${data.uid}`,
    'DTSTART;TZID=Pacific/Honolulu:20190621T120000',
    'DTEND;TZID=Pacific/Honolulu:20190621T120000',
  `SUMMARY:${data.summary}`,
  `GEO:${data.geo}`,
  `DESCRIPTION:${data.description}`,
  `LOCATION:${data.location}`,
    'END:VEVENT',
    'END:VCALENDAR'];

  let text = '';
  dataArray.forEach(line => text += `${line}\r\n`);

  const filename = 'test.ics';

  generateFile(filename, text);
}