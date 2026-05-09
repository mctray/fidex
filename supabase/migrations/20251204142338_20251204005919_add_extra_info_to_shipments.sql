/*
  # Add extra_info column to shipments table

  1. Changes
    - Add `extra_info` column to shipments table
      - Type: text (nullable)
      - Used for additional information/payment requests when status is in_transit
      - Will be displayed prominently on the public tracking page

  2. Notes
    - This field is primarily used when status = 'in_transit' to communicate
      special information like customs fees, payment requests, or delivery delays
    - Admins can edit this field in the dashboard
    - Customers will see this as a prominent alert on the tracking page
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'extra_info'
  ) THEN
    ALTER TABLE shipments ADD COLUMN extra_info text;
  END IF;
END $$;