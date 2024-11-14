<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubServices extends Model
{
    protected $fillable = ['name', 'service_id'];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function tickets()
    {
        return $this->hasMany(Tickets::class);
    }
}
