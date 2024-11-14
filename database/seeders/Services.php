<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\SubServices;

class Services extends Seeder // Renamed the class
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create main services without requires_doctor_request
        $consultation = Service::firstOrCreate(
            ['name' => 'Consultation'],
            ['prefix' => 'C']
        );

        $ecg = Service::firstOrCreate(
            ['name' => 'ECG'],
            ['prefix' => 'E']
        );

        $laboratory = Service::firstOrCreate(
            ['name' => 'Laboratory'],
            ['prefix' => 'LAB']
        );

        $ultrasound = Service::firstOrCreate(
            ['name' => 'Ultrasound'],
            ['prefix' => 'UL']
        );

        // Create Animal Bite service and its sub-services
        $animalBite = Service::firstOrCreate(
            ['name' => 'Animal Bite'],
            ['prefix' => 'AB']
        );

        // Sub-services for Animal Bite
        $animalBiteSubServices = [
            'Day 0',
            'Day 3',
            'Day 7',
            'Day 14',
            'Day 28/30',
            'Booster', // Booster sub-service
        ];

        foreach ($animalBiteSubServices as $subServiceName) {
            $subService = SubServices::firstOrCreate([
                'name' => $subServiceName,
                'service_id' => $animalBite->id,
            ]);

            // If the sub-service is "Booster", add additional options
            if ($subServiceName === 'Booster') {
                $boosterSubServices = [
                    'Day 0',
                    'Day 3',
                    'Day 7',
                ];

                foreach ($boosterSubServices as $boosterSubServiceName) {
                    SubServices::firstOrCreate([
                        'name' => $boosterSubServiceName,
                        'service_id' => $animalBite->id,
                        'parent_id' => $subService->id // Link to Booster
                    ]);
                }
            }
        }

        $xray = Service::firstOrCreate(
            ['name' => 'X-Ray'],
            ['prefix' => 'XR']
        );
    }
}
