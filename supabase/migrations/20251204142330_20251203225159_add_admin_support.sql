/*
  # Add Admin Support

  ## Changes
  This migration adds admin support to the system:
  
  1. Admin Role Management
    - Admins are identified by `is_admin` flag in auth.users raw_app_meta_data
    - Admin users can be set via SQL: UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"is_admin": true}'::jsonb WHERE email = 'admin@example.com';
  
  2. Enhanced RLS Policies
    - Add policies that check for admin role
    - Admins have full access to all tables
  
  3. Admin Helper Function
    - Function to check if current user is admin
  
  ## Security
  - Only admins can access sensitive operations
  - Admin status is stored in auth.users metadata (not user-modifiable)
*/

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN COALESCE(
    (SELECT (raw_app_meta_data->>'is_admin')::boolean
     FROM auth.users
     WHERE id = auth.uid()),
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comment to function
COMMENT ON FUNCTION is_admin() IS 'Returns true if the current user has admin privileges';

-- Update shipments policies for admin access
CREATE POLICY "Admins can do everything on shipments"
  ON shipments
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Update tracking_events policies for admin access  
CREATE POLICY "Admins can do everything on tracking_events"
  ON tracking_events
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Update price_quotes policies for admin access
CREATE POLICY "Admins can do everything on price_quotes"
  ON price_quotes
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());