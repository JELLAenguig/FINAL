<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Tickets extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'sub_service_id',
        'ticket_number',
        'is_priority',
        'status',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function subService()
    {
        return $this->belongsTo(SubServices::class);
    }

    public function positionInQueue()
    {
        return self::where('service_id', $this->service_id)
            ->whereDate('created_at', Carbon::today())
            ->where('created_at', '<', $this->created_at)
            ->count();
    }

    public static function generateTicketNumber(Service $service)
    {
        // Get the prefix for the ticket number
        $prefix = $service->prefix;
    
        // Get the last ticket number for the service, across all days
        $lastTicketNumber = self::where('service_id', $service->id)
            ->latest('created_at')
            ->value('ticket_number');
    
        // If no tickets exist for this service, start from '0001'
        $lastNumber = $lastTicketNumber ? intval(substr($lastTicketNumber, strlen($prefix))) : 0;
    
        // Increment the last number to get the new ticket number
        $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
    
        // Generate the new ticket number
        $newTicketNumber = $prefix . $newNumber;
    
        // Check if the new ticket number already exists (just in case of race conditions)
        if (self::where('ticket_number', $newTicketNumber)->exists()) {
            // If it exists, recursively call the function to generate a new unique number
            return self::generateTicketNumber($service);
        }
    
        return $newTicketNumber;
    }
}    
