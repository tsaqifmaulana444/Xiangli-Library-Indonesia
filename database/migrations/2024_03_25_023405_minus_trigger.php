<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        DB::unprepared('
        CREATE OR REPLACE FUNCTION reduce_stock() RETURNS TRIGGER AS $$
        BEGIN
            UPDATE books SET stock = stock - NEW.amount WHERE id = NEW.book_id;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER tr_minus AFTER INSERT ON book_user FOR EACH ROW
        EXECUTE FUNCTION reduce_stock();
        ');
    }

    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS tr_minus ON book_user;');
        DB::unprepared('DROP FUNCTION IF EXISTS reduce_stock();');
    }
};