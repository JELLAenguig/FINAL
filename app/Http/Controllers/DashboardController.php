<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $tickets = Tickets::with(['service', 'subService'])
        ->select('service_id','sub_service_id', 'ticket_number', 'is_priority', 'status') // Make sure is_priority is included
        ->orderBy('created_at', 'asc')
        ->get()
        ->map(function ($ticket) {
            $ticket->priorityLevel = $ticket->is_priority ? 'Priority' : 'Regular';
            return $ticket;
        });

        // Statistics
        $totalRequests = $tickets->count();
        $pendingRequests = $tickets->where('status', 'pending')->count();
        $servedPatients = $tickets->where('status', 'served')->count();
        $skippedPatients = $tickets->where('status', 'skipped')->count();
        

        return Inertia::render('Dashboard', [
            'tickets' => $tickets,
            'totalRequests' => $totalRequests,
            'pendingRequests' => $pendingRequests,
            'servedPatients' => $servedPatients,
            'skippedPatients' => $skippedPatients,
        ]);
    }
    
    
}
