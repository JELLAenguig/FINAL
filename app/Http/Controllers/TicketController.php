<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Tickets;
use App\Models\SubServices;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Events\StatisticsUpdateEvent;
use App\Events\DepartmentTicketUpdateEvent;
use Illuminate\Support\Facades\Log;

class TicketController extends Controller
{
    // Show ticket details (service, sub-service, etc.)
    public function show(Request $request)
    {
        try {
            $serviceId = $request->input('service_id');
            $subServiceId = $request->input('sub_service');
            $boosterDayId = $request->input('booster_day');
            $isPriority = $request->boolean('is_priority', false);

            // Validate service ID is provided
            if (!$serviceId) {
                return response()->json(['success' => false, 'message' => 'Service ID is required.'], 400);
            }

            // Fetch the service
            $service = Service::find($serviceId);
            if (!$service) {
                return response()->json(['success' => false, 'message' => 'Service not found.'], 404);
            }

            // Generate ticket number for the service
            $ticketNumber = Tickets::generateTicketNumber($service);

            // Count the number of patients ahead in the queue
            $patientsAhead = Tickets::where('service_id', $service->id)
                ->where('status', 'waiting')
                ->count();

            // Fetch selected sub-service and booster day if provided
            $selectedSubService = $subServiceId ? SubServices::find($subServiceId) : null;
            $selectedBoosterDay = $boosterDayId ? SubServices::find($boosterDayId) : null;

            return Inertia::render('Kiosk/Ticket', [
                'selectedService' => [
                    'id' => $service->id,
                    'name' => $service->name,
                    'ticketNumber' => $ticketNumber,
                    'patientsAhead' => $patientsAhead,
                ],
                'selectedSubService' => $selectedSubService,
                'selectedBoosterDay' => $selectedBoosterDay,
                'isPriority' => $isPriority,
            ]);
        } catch (\Exception $e) {
            Log::error('Error showing ticket: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error retrieving ticket information.'], 500);
        }
    }

    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'sub_service' => 'nullable|exists:sub_services,id',
            'booster_day' => 'nullable|exists:sub_services,id',
            'is_priority' => 'boolean',
        ]);
    
        // Fetch the service
        $service = Service::find($request->service_id);
        if (!$service) {
            return response()->json(['success' => false, 'message' => 'Service not found.'], 404);
        }
    
        // Generate a unique ticket number for the service
        $ticketNumber = Tickets::generateTicketNumber($service);
    
        // Create a new ticket record
        $ticket = Tickets::create([
            'service_id' => $request->service_id,
            'sub_service_id' => $request->sub_service,
            'ticket_number' => $ticketNumber,
            'is_priority' => $request->boolean('is_priority', false),
            'status' => 'pending',
        ]);
    
      //$this->updateStatistics();
    
        // Return a success response
        return response()->json(['success' => true, 'ticket' => $ticket]);
    }
    //private function updateStatistics()
    //{
        // Gather only the necessary statistics data
      //  $statistics = [
      //      'totalRequests' => Tickets::count(),
      //      'pendingRequests' => Tickets::where('status', 'pending')->count(),
      //      'servedPatients' => Tickets::where('status', 'served')->count(),
      //      'skippedPatients' => Tickets::where('status', 'skipped')->count(),
      //  ];
    
        // Log the data for verification
       // \Log::info('StatisticsUpdateEvent Data:', $statistics);
    
        // Fire the event with simplified statistics
       // event(new StatisticsUpdateEvent($statistics));
    //}
}
