<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     *

      Type | Maximum length
    -----------+---------------------------------------------
    TINYTEXT         255 (2 8−1) bytes
    TEXT             65,535 (2^16−1) bytes           = 64 KiB
    MEDIUMTEXT       16,777,215 (2^24−1) bytes       = 16 MiB
    LONGTEXT         4,294,967,295 (2^32−1) bytes    =  4 GiB


     *
     */


    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');    // maxes out at 255
            $table->text('excerpt');    // maxes out at 65,535
            $table->text('body');
            $table->timestamps();
            $table->timestamp('published_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
