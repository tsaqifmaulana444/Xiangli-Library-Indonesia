<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function books()
    {
        return $this->belongsToMany(Book::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
