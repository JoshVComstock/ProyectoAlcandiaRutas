<?php

namespace App\Notifications;

use App\Models\TrafficInfo;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TrafficAlertNotification extends Notification
{
    use Queueable;

    protected $trafficInfo;

    public function __construct(TrafficInfo $trafficInfo)
    {
        $this->trafficInfo = $trafficInfo;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Alerta de Tráfico en tu Ruta')
            ->line('Se ha reportado un problema de tráfico que podría afectar tu ruta.')
            ->line("Ubicación: {$this->trafficInfo->location}")
            ->line("Descripción: {$this->trafficInfo->description}")
            ->line("Severidad: {$this->trafficInfo->severity}")
            ->action('Ver Detalles', url('/traffic-info/' . $this->trafficInfo->id));
    }

    public function toArray($notifiable)
    {
        return [
            'traffic_info_id' => $this->trafficInfo->id,
            'location' => $this->trafficInfo->location,
            'description' => $this->trafficInfo->description,
            'severity' => $this->trafficInfo->severity,
        ];
    }
}