<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><?= $title . (!empty($subtitle) ? ' &ndash; ' . $subtitle : '') ?></title>

    <link rel="stylesheet" href="<?= cachebuster('css/bootswatch-cyborg-4.1.3.min.css') ?>">
    <link rel="stylesheet" href="<?= cachebuster('css/custom.css') ?>">
</head>
<body class="py-5">
    <div class="container">
        <h1 class="<?= !empty($subtitle) ? 'mt-5' : 'my-5' ?> text-center text-dark"><?= $title ?></h1>
        <?php if (!empty($subtitle)) : ?><p class="mb-5 h5 text-center text-muted"><?= $subtitle ?></p><?php endif ?>

        <div class="text-center">
            <label class="btn btn-primary btn-lg">
                Choose file&hellip; <input type="file" name="files" multiple style="display: none;">
            </label>
        </div>

        <ul class="list-group mt-5" style="display: none"></ul>

        <p class="footer py-3 my-5 text-center">
            <a href="https://github.com/ianmustafa/uploader" target="_blank">Uploader</a>
            by <a href="https://ianmustafa.com/">Ian Mustafa</a>.
            <br>
            <a href="https://bootswatch.com/cyborg/" target="_blank">Bootswatch: Cyborg</a> +
            <a href="https://jquery.com/" target="_blank">jQuery 3</a> +
            <a href="http://simpleupload.michaelcbrook.com/" target="_blank">SimpleUpload.js</a> +
            <a href="https://github.com/blueimp/jQuery-File-Upload/blob/master/server/php/UploadHandler.php
" target="_blank">jQuery File Upload's PHP Upload Handler</a>.
        </p>
    </div>
    

    <script src="<?= cachebuster('js/jquery-3.3.1.min.js') ?>"></script>
    <script src="<?= cachebuster('js/simpleUpload-1.1.min.js') ?>"></script>
    <script src="<?= cachebuster('js/app.js') ?>"></script>
</body>
</html>