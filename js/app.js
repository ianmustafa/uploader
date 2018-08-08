// Generate human-readable file size
var humanFileSize = function (bytes) {
  if (bytes >= 1000000000)
    return (bytes / 1000000000).toFixed(2) + ' GB';
  
  if (bytes >= 1000000)
    return (bytes / 1000000).toFixed(2) + ' MB';
  
  if (bytes >= 1000)
    return (bytes / 1000).toFixed(2) + ' KB';

  return bytes + ' B';
}

// Generate human-readable upload speed
var humanUploadSpeed = function (bytes) {
  if (bytes >= 1000000000)
    return (bytes / 1000000000).toFixed(2) + ' GB/s';
  
  if (bytes >= 1000000)
    return (bytes / 1000000).toFixed(2) + ' MB/s';
  
  if (bytes >= 1000)
    return (bytes / 1000).toFixed(2) + ' KB/s';
  
  return bytes.toFixed(2) + ' B/s';
}

// Generate human-readable remaining time
var remainingTime = function (seconds) {
  var days, hours, minutes, result = '';

  if (seconds >= 86400) {
    days = Math.floor(seconds / 86400);
    seconds = seconds % 86400;
    if (days > 0) result += days + 'd ';
  }

  if (seconds >= 3600) {
    hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    if (hours > 0) result += hours + 'h ';
  }

  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    if (minutes > 0) result += minutes + 'm ';
  }

  if (seconds > 0) result += Math.round(seconds) + 's ';

  return result;
}

// Generate short random string for ID
var randomString = function () {
  return Math.random().toString(36).substring(2, 15);
}

// Array to save file info to generate upload speed
var ongoingFiles = {};

$(function () {
  $('[name=files]').change(function () {
    $(this).simpleUpload('upload.php', {
      // Callback for started upload            
      start: function(file) {
        // Because that is this!. We need "that" for cancel button event
        var that = this;

        // Set ID for this file
        this.id = randomString();
        // Also put the filesize for this file to "this"
        this.fileSize = file.size;

        // Push file info to ongoingFiles
        ongoingFiles[this.id] = {
          time: Date.now(),
          progress: 0
        }

        // Create the list group item block and the columns, put accordingly
        this.$block = $('<div id="upload-' + this.id + '" class="list-group-item"/>');
        this.$row = $('<div class="row justify-content-between"/>');
        this.$leftCol = $('<div class="col-lg-8 col-xl-9 col-filename"/>');
        this.$rightCol = $('<div class="col-lg-4 col-xl-3 "/>');
        this.$row.append(this.$leftCol).append(this.$rightCol);
        this.$block.append(this.$row);

        // Make file name block and put into left column
        this.$fileName = $('<span class="filename text-white"/>').text(file.name).attr('title', file.name);
        this.$leftCol.append(this.$fileName);

        // Make status block
        this.$status = $('<span class="status"/>').text(humanFileSize(file.size));
        // Make cancel button
        this.$cancelButton = $('<button type="button" class="close ml-3 float-right">&times;</button>');
        // Put those into right column
        this.$rightCol.append(this.$cancelButton).append(this.$status);

        // Make progress bar and put into the block itself
        this.$progress = $('<div class="progress mt-3 mb-2"/>');
        this.$progressBar = $('<div class="progress-bar progress-bar-striped progress-bar-animated"/>');
        this.$progress.append(this.$progressBar);
        this.$block.append(this.$progress);

        // Event listener for cancel button
        this.$cancelButton.click(function() {
          // Cancel "that" upload. Haha 😂
          that.upload.cancel();
          
          // Remove progress
          that.$progress.slideUp(150, function () {
            $(this).remove()
          });
          // Remove cancel button
          that.$cancelButton.remove();
          // Remove file info from ongoingFiles
          delete ongoingFiles[that.id];

          // Show error message to status
          that.$status.text('Cancelled').addClass('text-warning float-right');
        });

        // Now prepend the block to the list group
        $('.list-group').show().prepend(this.$block);
      },

      // Callback for progress            
      progress: function(progress) {
        // Get time, NOW!
        var time = Date.now();
        // Get the file size
        var fileSize = this.fileSize;

        // If progress is already complete, no need to calculate
        if (progress == 100) {
          // Change the status block
          this.$status.html(humanFileSize(fileSize) + ' (100%, processing&hellip;)');
          this.$status.html(
            '<span>' + humanFileSize(fileSize)+ '</span>' +
            '<span class="d-none d-sm-inline d-lg-none mx-2">&bull;</span>' +
            '<span class="d-block d-sm-inline d-lg-block">100%' +
            '<span class="text-muted">,</span> processing&hellip;</span>'
          );
        } else {
          // Get the file info from ongoingFiles
          var fileInfo = ongoingFiles[this.id]
          // Reset the file info in ongoingFiles
          ongoingFiles[this.id] = {
            time: time,
            progress: progress
          }

          // Calculate the uploaded file size
          var uploadedFileSize = fileSize * progress / 100;
          // Calculate the upload speed
          var uploadSpeed = fileSize * (progress - fileInfo.progress) / 100 * 1000 / (time - fileInfo.time);
          // Get the ETA
          var uploadETA = (fileSize - uploadedFileSize) / uploadSpeed;
          // Stringify the progress
          var progressString = progress.toFixed(2) + '%';

          // Change the status block
          this.$status.html(
            '<span>' + humanFileSize(uploadedFileSize) +
            ' <span class="text-muted">of</span> ' +
            humanFileSize(fileSize) + '</span>' +
            '<span class="d-none d-sm-inline d-lg-none mx-2 text-muted">&bull;</span>' +
            '<span class="d-block d-sm-inline d-lg-block">' + progressString +
            ' <span class="text-muted">at</span> ' + humanUploadSpeed(uploadSpeed) +
            ' <span class="text-muted">in</span> ' + remainingTime(uploadETA) + '</span>');
        }              
        // Change the progress bar
        this.$progressBar.width(progressString);
      },

      // Callback for success. Note that this callback will always be called
      // no matter what the response is, so always check the return data.
      success: function(data) {
        // Remove progress
        this.$progress.slideUp(150, function () {
          $(this).remove()
        });
        // Remove cancel button
        this.$cancelButton.remove();
        // Remove file info from ongoingFiles
        delete ongoingFiles[this.id];

        if (data.success) {
          // Set status to complete
          this.$status.text('Completed').addClass('text-success float-right');
        } else {
          // Set error messages with error handling
          var errorMessage = 'Something\'s wrong with the upload server';
          if (typeof data.error.message != 'undefined')
            errorMessage = data.error.message;

          // Show error message to status
          this.$status.text(errorMessage).addClass('text-danger float-right');
        }
      },

      error: function(error) {
        // Remove progress
        this.$progress.slideUp(150, function () {
          $(this).remove()
        });
        // Remove cancel button
        this.$cancelButton.remove();
        // Remove file info from ongoingFiles
        delete ongoingFiles[this.id];

        // Set error messages with error handling
        var errorMessage = 'Something\'s wrong with the upload server';
        if (typeof error.message != 'undefined')
          errorMessage = error.message;
        // Show error message to status
        this.$status.text(errorMessage).addClass('text-danger float-right');
      }
    });
  });
});