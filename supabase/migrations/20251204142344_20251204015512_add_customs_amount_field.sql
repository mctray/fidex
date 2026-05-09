/*
  # Add customs amount field for in-transit shipments

  1. Changes
    - Add `customs_amount` column to `shipments` table
      - Type: numeric, stores the dollar amount for customs duty
      - Default: 5000
      - Allows admin to specify custom customs duty amounts
  
  2. Notes
    - This field is used when shipment status is "in_transit"
    - The complete message will be: "Customs duty of $[amount] is required to continue delivery. Please contact support for payment"
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'customs_amount'
  ) THEN
    ALTER TABLE shipments ADD COLUMN customs_amount numeric DEFAULT 5000;
  END IF;
END $$;