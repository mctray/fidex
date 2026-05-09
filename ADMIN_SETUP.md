# Admin Dashboard Setup Guide

## Overview

A protected admin section has been added to your Fidex application. This allows authorized administrators to manage all shipments with inline editing capabilities.

## Features

- **Protected Route**: Only authenticated admin users can access `/admin`
- **Real-time Dashboard**: View all shipments with live updates
- **Inline Editing**: Edit tracking numbers and statuses directly in the table
- **Auto-tracking**: Status changes automatically create tracking events
- **Toast Notifications**: Instant feedback for all actions
- **Beautiful UI**: Built with custom components inspired by InnexLabs
- **Statistics Cards**: Quick overview of shipment stats

## Database Tables

The following tables are used:

- **shipments**: Main table with all shipment data
- **tracking_events**: History of status changes and events
- **auth.users**: Built-in Supabase auth with `is_admin` flag in metadata

## Creating an Admin User

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. Create a new user or select an existing one
4. Go to **SQL Editor**
5. Run this SQL command:

```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'admin@example.com';
```

Replace `admin@example.com` with the actual email address.

### Method 2: Using Supabase SQL Editor

1. First, create a user account by signing up through your app
2. Then run the SQL command above to grant admin privileges

## Accessing the Admin Dashboard

1. Navigate to `/admin/login`
2. Sign in with your admin credentials
3. You'll be redirected to `/admin` dashboard

## Admin Dashboard Features

### Statistics Cards
- Total Shipments
- Pending Shipments
- In Transit Shipments
- Delivered Shipments

### Shipments Table
- **Tracking Number**: Editable text input
- **Customer**: Sender name
- **Origin**: Pickup address
- **Destination**: Delivery address
- **Status**: Dropdown with 7 statuses
  - pending
  - picked_up
  - in_transit
  - out_for_delivery
  - delivered
  - failed
  - returned
- **Weight**: Package weight in kg
- **Price**: Shipment cost
- **Created**: Timestamp

### Inline Editing
- Click on tracking number input to edit
- Select status dropdown to change status
- Changes save automatically
- Toast notification confirms success
- Status changes create tracking events automatically

### Real-time Updates
- Dashboard updates automatically when shipments change
- No need to refresh the page

## Security

- **RLS Policies**: Row Level Security enabled on all tables
- **Admin-only Access**: Only users with `is_admin: true` can access dashboard
- **Protected Routes**: Redirects to login if not authenticated
- **Secure Updates**: All updates go through Supabase with proper authentication

## Technical Details

### New Files Added
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/components/ProtectedRoute.tsx` - Route protection
- `src/pages/AdminDashboard.tsx` - Main admin interface
- `src/pages/AdminLogin.tsx` - Admin login page
- `src/components/ui/Table.tsx` - Table component
- `src/components/ui/Badge.tsx` - Status badge component
- `src/components/ui/Input.tsx` - Input component
- `src/components/ui/Select.tsx` - Select dropdown component
- `src/components/ui/Card.tsx` - Card component

### Dependencies Added
- `react-hot-toast` - Toast notifications

### Database Migration
- `add_admin_support.sql` - Adds admin helper function and policies

## Routes

- `/admin/login` - Admin login page (public)
- `/admin` - Admin dashboard (protected, admin-only)

## Troubleshooting

### "Access Denied" Error
- Make sure the user has `is_admin: true` in their `raw_app_meta_data`
- Check that you're logged in with the correct account
- Verify the SQL update command ran successfully

### Changes Not Saving
- Check browser console for errors
- Verify Supabase connection in `.env` file
- Ensure RLS policies are properly set up

### Not Redirecting After Login
- Clear browser cache and cookies
- Check that admin flag is set correctly
- Verify no console errors during login

## Support

For issues or questions, contact InnexLabs team or check the Supabase documentation.
