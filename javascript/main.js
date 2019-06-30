function generateFile(filename, text) {
  const element = document.createElement('a');

  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
function download() {
  const data = {
    begin: 'VCALENDAR',
    version: '2.0',
    prodid: '-//team-canneloni',
    xWrCalname: 'Test Event',
    calscale: 'GREGORIAN',
    begintz: 'VTIMEZONE',
    tzid: 'Pacific / Honolulu',
    tzurl: 'http://tzurl.org/zoneinfo-outlook/Pacific/Honolulu',
    xLicLocation: 'Pacific / Honolulu',
    beginzone:'Pacific / Honolulu',
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
    `X - WR - CALNAME:${data.xWrCalname}`,
    `CALSCALE:${data.calscale}`,
    `BEGIN:${data.begintz}`,
    `TZID:${data.tzid}`,
    `TZURL:${data.tzurl}`,
    `X - LIC - LOCATION:${data.xLicLocation}`,
    `BEGIN:${data.beginzone}`,
    `TZOFFSETFROM:${data.tzoffsetfrom}`,
    `TZOFFSETTO:${data.tzoffsetto}`,
    `TZNAME:${data.tzname}`,
    `DTSTART:${data.dtstart}`,
    `RRULE:${data.rrule}`,
    `END:${data.endtype}`,
    `END:${data.endtz}`,
    `BEGIN:${data.beginevent}`,
    `CLASS:${data.class}`,
    `TSTAMP:${data.dtstamp}`,
    `UID:${data.uid}`,
    `PRIORITY:${data.priority}`,
    'DTSTART; TZID = Pacific / Honolulu: 20190621T120000',
    'DTEND; TZID = Pacific / Honolulu: 20190621T120000',
    `SUMMARY:${data.summary}`,
    `GEO:${data.geo}`,
    `DESCRIPTION:${data.description}`,
    `LOCATION:${data.location}`,
    'END:VEVENT',
    'END:VCALENDAR'];

  let text = '';
  dataArray.forEach(line => text += `${line}\r\n`);
  console.log(text);

  const filename = 'test.ics';

  generateFile(filename, text);
}