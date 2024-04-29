<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Business;

class BusinessController extends Controller
{
    public function add_business(Request $request)
    {
        $request->validate(([
            'name' => 'required|string',
            'industry' => 'required|string',
            'location' => 'required|string',
            'description' => 'required|string',
            'funding_needed' => 'required|numeric',
            'stake_offered' => 'required|numeric',
            'valuation' => 'required|numeric',

        ]));

        $entrepreneur = Auth::id();

        if (!$entrepreneur) {
            return response()->json([
                'status' => 403,
                'message' => "Unauthorized"
            ]);
        }

        $business = Business::create([
            'name' => $request->name,
            'industry' => $request->industry,
            'location' => $request->location,
            'description' => $request->description,
            'funding_needed' => $request->funding_needed,
            'stake_offered' => $request->stake_offered,
            'valuation' => $request->valuation,
            'entrepreneur_id' => $entrepreneur,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Business added successfully'
        ]);
    }

    public function all_businesses()
    {
        $businesses = Business::all();
        if ($businesses->isEmpty()) {
            return response()->json([
                'status' => 403,
                'message' => "No Businesses Found"
            ]);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Businesses retrieved successfully',
            'businesses' => $businesses
        ]);
    }
}
