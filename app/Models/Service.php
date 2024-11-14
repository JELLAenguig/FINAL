<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'prefix'];

    public function subServices()
    {
        return $this->hasMany(SubServices::class);
    }

    public function tickets()
    {
        return $this->hasMany(Tickets::class);
    }
}
