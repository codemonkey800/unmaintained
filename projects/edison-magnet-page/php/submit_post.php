<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$poster_name = $_POST['poster_name'];
$post_body = $_POST['post_body'];
$photo_paths_json = $_POST['photo_paths_json'];

$db = new SQLite3('databases/posts.db');

$exec_str = sprintf("INSERT INTO user_posts VALUES('%s', '%s', '%s')", $poster_name, $post_body, $photo_paths_json);

$db->exec($exec_str);

$db->close();