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
  const eventSummary = document.getElementById('event-summary').value;
  const eventDescription = document.getElementById('event-description').value;
  const eventStartTime = document.getElementById('event-start-time').value;
  const eventStartDate = document.getElementById('event-start-date').value;

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
    rrule: 'FREQ=DAILY;COUNT=10',
    endtype: 'STANDARD',
    endtz: 'VTIMEZONE',
    beginevent: 'VEVENT',
    dtstame: '20190621T035133Z',
    uid: '20190621T035133Z - 2089128844@marudot.com',
    priority: '0',
    class: 'PUBLIC',
    summary: 'Test Event',
    geo: '21.29693;-157.81711',
    description: 'This is a test of the event creator',
    location: 'UH Manoa'
  };
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
  `TSTAMP:${data.dtstamp}`,
  `UID:${data.uid}`,
  'DTSTART;TZID=Pacific/Honolulu:20190621T120000',
  'DTEND;TZID=Pacific/Honolulu:20190621T120000',
  `SUMMARY:${data.summary}`,
  `DESCRIPTION:${data.description}`,
  `LOCATION:${data.location}`,
  'END:VEVENT',
  'END:VCALENDAR'];

  let text = '';
  dataArray.forEach(line => text += `${line}\r\n`);

  const filename = 'test.ics';

  generateFile(filename, text);
}