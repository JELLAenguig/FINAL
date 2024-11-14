<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Booster; // Assuming you might need this if related to sub-services
use Inertia\Inertia;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all(); // Fetch all services
        return Inertia::render('Kiosk/Index', [
            'services' => $services,
        ]);
    }

    public function showAnimalBite()
    {
        // Assuming 'Animal Bite' is the name of the service
        $animalBiteService = Service::where('name', 'Animal Bite')->firstOrFail();
        
        // Fetch related sub-services (adjust relationship as needed)
        $subServices = $animalBiteService->subServices; // Make sure the relationship is defined in the Service model

        return Inertia::render('Kiosk/AnimalBite', [
            'subServices' => $subServices,
        ]);
    }
}
