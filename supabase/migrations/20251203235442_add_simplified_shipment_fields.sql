/*
  # Add Simplified Shipment Fields

  ## Summary
  Adds simplified fields to the shipments table to support streamlined admin workflow.

  ## Changes Made

  ### 1. Add New Columns to Shipments Table
  - `customer_name` (text) - Simplified customer name field
  - `customer_phone` (text) - Customer phone number
  - `customer_email` (text) - Customer email address
  - `origin` (text) - Pickup/origin location
  - `destination` (text) - Delivery destination location
  - `current_location` (text) - Current location of shipment (updatable by admin)

  ### 2. Create shipment_updates Table
  This is an alias/view of tracking_events for history logging
  - Allows tracking all status and location changes
  - Maintains compatibility with existing tracking_events structure

  ## Notes
  - New fields are optional and work alongside existing sender/recipient fields
  - Allows admin to use either detailed fields or simplified fields
  - current_location defaults to origin when shipment is created
*/

-- Add simplified columns to shipments table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'customer_name'
  ) THEN
    ALTER TABLE shipments ADD COLUMN customer_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'customer_phone'
  ) THEN
    ALTER TABLE shipments ADD COLUMN customer_phone text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'customer_email'
  ) THEN
    ALTER TABLE shipments ADD COLUMN customer_email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'origin'
  ) THEN
    ALTER TABLE shipments ADD COLUMN origin text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'destination'
  ) THEN
    ALTER TABLE shipments ADD COLUMN destination text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'current_location'
  ) THEN
    ALTER TABLE shipments ADD COLUMN current_location text;
  END IF;
END $$;

-- Create a view for shipment_updates that maps to tracking_events
CREATE OR REPLACE VIEW shipment_updates AS
SELECT
  id,
  shipment_id,
  status,
  location,
  description as notes,
  event_time as created_at
FROM tracking_events
ORDER BY event_time DESC;

COMMENT ON VIEW shipment_updates IS 'Simplified view of tracking_events for shipment history';