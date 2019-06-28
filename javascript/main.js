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
    // Generate download of hello.txt file with some content
    const text = document.getElementById('text-container').innerHTML;
    const filename = 'test.ics';

    generateFile(filename, text);
}