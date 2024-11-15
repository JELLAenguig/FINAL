<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow; // Immediate broadcasting
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StatisticsUpdateEvent implements ShouldBroadcastNow // Use this for immediate broadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $statistics;

    public function __construct($statistics)
    {
        $this->statistics = $statistics;
    }

    public function broadcastOn()
    {
        return new Channel('statistics-update');
    }

    public function broadcastAs()
    {
        return 'StatisticsUpdate'; // Event alias
    }

}

