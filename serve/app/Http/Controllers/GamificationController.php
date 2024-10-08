<?php
namespace App\Http\Controllers;

use App\Models\UserScore;
use App\Models\User;
use Illuminate\Http\Request;

class GamificationController extends Controller
{
    public function addPoints(Request $request)
    {
        $user = $request->user();
        $points = $request->input('points');

        $userScore = UserScore::firstOrCreate(
            ['user_id' => $user->id],
            ['points' => 0, 'level' => 1]
        );

        $userScore->points += $points;
        $userScore->level = $this->calculateLevel($userScore->points);
        $userScore->save();

        return response()->json($userScore);
    }

    private function calculateLevel($points)
    {
        return floor($points / 100) + 1;
    }

    public function leaderboard()
    {
        $topUsers = UserScore::with('user')
            ->orderBy('points', 'desc')
            ->take(10)
            ->get();

        return response()->json($topUsers);
    }
}