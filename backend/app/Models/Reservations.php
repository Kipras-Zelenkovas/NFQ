<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservations extends Model
{
    use HasFactory;

    protected $table = "reservations";

    protected $fillable = ['aprox_time', 'code', 'specialist_id'];
}
