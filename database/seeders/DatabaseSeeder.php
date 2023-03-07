<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([UserSeeder::class]);
//         \App\Models\User::factory(50)->create();
//
//         \App\Models\User::factory()->create([
//             'first_name' => 'Test',
//             'last_name' => 'User',
//             'email' => 'test@example.com',
//         ]);
    }
}
