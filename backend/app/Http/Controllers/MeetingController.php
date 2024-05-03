<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    public function create_meeting(Request $request)
    {

        $request->validate([
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i'
        ]);

        $meeting = Meeting::create([
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time
        ]);


        return response()->json([
            'status' => 200,
            'message' => 'Meeting created succeffuly',
            'meeting_details' => $meeting
        ]);
    }

    public function edit_meeting(Request $request)
    {
        $data = $request->validate([
            'date' => 'date',
            'start_time' => 'date_format:H:i',
            'end_time' => 'date_format:H:i'
        ]);

        $meetingID=$request->meeting_id;
        $meeting=Meeting::findOrFail($meetingID);

        foreach ($data as $attribute => $value) {
            if (!is_null($value)) {
                $meeting->$attribute = $value;
            }
        }
        $meeting->save();

        return response()->json([
            'status' => 200,
            'message' => 'Meeting Edited successfully'
        ]);

    }
}