/*
  # Add Sender, Receiver, and Package Details to Shipments

  1. New Columns
    - Sender Information:
      • sender_name (text) - Name of the person sending the package
      • sender_phone (text) - Phone number of the sender
      • sender_email (text) - Email address of the sender
      • sender_address (text) - Full address of the sender
    
    - Receiver Information:
      • receiver_name (text) - Name of the person receiving the package
      • receiver_phone (text) - Phone number of the receiver
      • receiver_email (text) - Email address of the receiver
      • receiver_address (text) - Full address of the receiver
    
    - Package Information:
      • package_description (text) - Description of the package contents
      • package_image_url (text) - URL to the package image stored in Supabase Storage

  2. Changes
    - All new columns are nullable to maintain backward compatibility with existing shipments
    - Uses DO block with IF NOT EXISTS checks to prevent errors on re-run
*/

DO $$
BEGIN
  -- Add sender fields
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'sender_name'
  ) THEN
    ALTER TABLE shipments ADD COLUMN sender_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'sender_phone'
  ) THEN
    ALTER TABLE shipments ADD COLUMN sender_phone text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'sender_email'
  ) THEN
    ALTER TABLE shipments ADD COLUMN sender_email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'sender_address'
  ) THEN
    ALTER TABLE shipments ADD COLUMN sender_address text;
  END IF;

  -- Add receiver fields
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'receiver_name'
  ) THEN
    ALTER TABLE shipments ADD COLUMN receiver_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'receiver_phone'
  ) THEN
    ALTER TABLE shipments ADD COLUMN receiver_phone text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'receiver_email'
  ) THEN
    ALTER TABLE shipments ADD COLUMN receiver_email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'receiver_address'
  ) THEN
    ALTER TABLE shipments ADD COLUMN receiver_address text;
  END IF;

  -- Add package fields
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'package_description'
  ) THEN
    ALTER TABLE shipments ADD COLUMN package_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'shipments' AND column_name = 'package_image_url'
  ) THEN
    ALTER TABLE shipments ADD COLUMN package_image_url text;
  END IF;
END $$;
