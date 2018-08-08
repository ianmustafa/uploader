# Uploader
Sometimes when moving files between systems (espacially with different platforms 
in between), I tend to send it over local network. This project is intended to 
make things easier. You know, sometimes `rsync` or even `scp` isn't
convenient enough.

This simple project is built on **[PHP](https://secure.php.net/)** with help of 
**[jQuery 3](https://jquery.com/)** and **[SimpleUpload.js](http://simpleupload.michaelcbrook.com/)**.
Upload back-end is handled by [jQuery File Upload's PHP Upload Handler](https://github.com/blueimp/jQuery-File-Upload/blob/master/server/php/UploadHandler.php) for convenience.

## Features
- **Lightweight**. The whole projects is just **~636KB!**.
- **Simple deployment.** Just clone or download the project, deploy to your web server, 
  set up `config.php` and you're good to go.
- **Mobile-friendly.** Responsive design thanks to [Bootswatch 4.1](https://bootswatch.com/).
- **Good browser support.** All modern browsers (desktop and mobile alike) are supported. 
  Internet Explorer 10 and up are also supported, but who is still using IE anyway? 😜
- **Progress bar + status indicator.** Info like upload speed and ETA are also displayed, 
  helpful for uploading large files or when you got hit by slow network.

## Requirements 
- Web server, obviously.
- PHP 5.6 or higher.

## Usage
1. Clone or download.
2. Deploy project to your web server.
3. Open `config.example.php`, save as `config.php` and edit to your need.
4. Access your project from the browser and you're good to go.

## Contribute
Fork and send pull request.

## License
[MIT](https://github.com/ianmustafa/uploader/blob/master/LICENSE).
