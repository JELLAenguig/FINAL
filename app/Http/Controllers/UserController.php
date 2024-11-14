<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
{
    // Filter users based on the searchx query
    $search = $request->input('search');
    $users = User::where('name', 'LIKE', "%{$search}%")
        ->orWhere('email', 'LIKE', "%{$search}%")
        ->get();

    return Inertia::render('Admin/Users', [
        'users' => $users,
        'search' => $request->input('search'),
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);
        
        User::create($validated);

        return redirect()->route('users.index');
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);

        $user->update($validated);

        return redirect()->route('users.index');
    }

    public function destroy($id)
    {
        User::destroy($id);
        return redirect()->route('users.index');
    }
}

