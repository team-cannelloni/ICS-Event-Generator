// Listen for the click of the file generation button in index.html, then run download().
document.getElementById('generate-file-button').addEventListener('click', download);

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

  /* TODO: Set all form data into the data object after it has been validated */
  const eventName = document.getElementById('event-name').value;
  const eventClassification = document.getElementById('event-classification').value;
  const eventSummary = document.getElementById('event-summary').value;
  const eventDescription = document.getElementById('event-description').value;
  const eventLocation = document.getElementById('event-location').value;
  const eventLatitude = document.getElementById('event-latitude').value;
  const eventLongitude = document.getElementById('event-longitude').value;
  const eventStartTime = document.getElementById('event-start-time').value;
  const eventEndTime = document.getElementById('event-end-time').value;
  const eventStartDate = document.getElementById('event-start-date').value;
  const eventEndDate = document.getElementById('event-end-date').value;
  const eventRRule= document.getElementById('event-repeat-rule').value;
  const eventPriority= document.getElementById('event-priority').value;

  const data = {
    begin: 'VCALENDAR',
    version: '2.0',
    prodid: '-//ical.marudot.com//iCal Event Maker',
    xWrCalname: 'Test Event',
    calscale: 'GREGORIAN',
    begintz: 'VTIMEZONE',
    tzid: 'Pacific/Honolulu',
    tzurl: 'http://tzurl.org/zoneinfo-outlook/Pacific/Honolulu',
    xLicLocation: 'Pacific/Honolulu',
    beginzone:'Pacific/Honolulu',
    tzoffsetfrom: '-1000',
    tzoffsetto: '-1000',
    tzname: 'HST',
    dtstart: '19700101T000000',
    dtend: '19700101T010000',
    rrule: 'FREQ=DAILY;COUNT=10',
    endtype: 'STANDARD',
    endtz: 'VTIMEZONE',
    beginevent: 'VEVENT',
    dtstamp: '20190621T035133Z',
    uid: '20190621T035133Z - 2089128844@marudot.com',
    priority: '0',
    class: 'PUBLIC',
    summary: 'Test Event',
    geo: '21.29693;-157.81711',
    description: 'This is a test of the event creator',
    location: 'UH Manoa'
  };

  data.xWrCalname = eventName;
  data.summary = eventSummary;
  data.description = eventDescription;
  data.location = eventLocation;
  data.priority = eventPriority;
  data.class = eventClassification;
  data.rrule = 'FREQ=DAILY;COUNT=' + eventRRule;

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
  `DTEND:${data.dtend}`,
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