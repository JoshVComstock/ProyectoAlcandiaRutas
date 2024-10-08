<?php
namespace App\Jobs;

use App\Models\User;
use App\Models\TrafficInfo;
use App\Notifications\TrafficAlertNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendTrafficAlerts implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $trafficInfo;

    public function __construct(TrafficInfo $trafficInfo)
    {
        $this->trafficInfo = $trafficInfo;
    }

    public function handle()
    {
        $affectedUsers = User::whereHas('routes', function ($query) {
            $query->where('start_point', 'like', "%{$this->trafficInfo->location}%")
                ->orWhere('end_point', 'like', "%{$this->trafficInfo->location}%")
                ->orWhereJsonContains('waypoints', $this->trafficInfo->location);
        })->get();

        foreach ($affectedUsers as $user) {
            $user->notify(new TrafficAlertNotification($this->trafficInfo));
        }
    }
}