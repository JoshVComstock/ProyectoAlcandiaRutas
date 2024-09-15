<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Route;
use Illuminate\Http\Request;
use PDF;
use Excel;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::with('user')->paginate(20);
        return view('reports.index', compact('reports'));
    }

    public function show(Report $report)
    {
        return view('reports.show', compact('report'));
    }

    public function create()
    {
        return view('reports.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'tipo_reporte' => 'required|in:individual,global',
            'descripcion' => 'required|string',
        ]);

        $report = Report::create($validatedData);

        // Generate report file
        if ($request->tipo_reporte == 'individual') {
            $this->generateIndividualReport($report);
        } else {
            $this->generateGlobalReport($report);
        }

        return redirect()->route('reports.show', $report)->with('success', 'Report created successfully.');
    }

    public function generateIndividualReport(Report $report)
    {
        $userRoutes = Route::where('user_id', $report->user_id)->get();
        $pdf = PDF::loadView('reports.individual_pdf', compact('userRoutes', 'report'));
        $filename = 'report_' . $report->id . '.pdf';
        $pdf->save(storage_path('app/public/reports/' . $filename));
        $report->update(['archivo' => $filename]);
    }

    public function generateGlobalReport(Report $report)
    {
        $globalStats = [
            'total_routes' => Route::count(),
            'total_distance' => Route::sum('distancia_recorrida'),
            'avg_speed' => Route::avg('velocidad_promedio'),
        ];
        $pdf = PDF::loadView('reports.global_pdf', compact('globalStats', 'report'));
        $filename = 'report_' . $report->id . '.pdf';
        $pdf->save(storage_path('app/public/reports/' . $filename));
        $report->update(['archivo' => $filename]);
    }

    public function downloadPdf(Report $report)
    {
        $path = storage_path('app/public/reports/' . $report->archivo);
        return response()->download($path);
    }

    public function downloadExcel(Report $report)
    {
        if ($report->tipo_reporte == 'individual') {
            $routes = Route::where('user_id', $report->user_id)->get();
        } else {
            $routes = Route::all();
        }

        return Excel::download(new RoutesExport($routes), 'report_' . $report->id . '.xlsx');
    }
}