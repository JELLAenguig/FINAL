<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('statistics-update', function ($user) {
    return true; 
});
