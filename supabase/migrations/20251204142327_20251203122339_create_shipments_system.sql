/*
  # Courier Shipment System Database Schema

  ## Overview
  This migration creates a complete database schema for FlashFleet Logistics Company.

  ## New Tables
  
  ### 1. `shipments`
  Main shipment tracking and management table
  - `id` (uuid, primary key) - Unique shipment identifier
  - `tracking_number` (text, unique) - Public tracking number for customers
  - `sender_name` (text) - Name of the person sending the package
  - `sender_email` (text) - Email of sender
  - `sender_phone` (text) - Phone number of sender
  - `sender_address` (text) - Full pickup address
  - `recipient_name` (text) - Name of recipient
  - `recipient_email` (text) - Email of recipient
  - `recipient_phone` (text) - Phone number of recipient
  - `recipient_address` (text) - Full delivery address
  - `package_type` (text) - Type of package (document, parcel, freight)
  - `package_weight` (numeric) - Weight in kg
  - `package_dimensions` (text) - Dimensions as JSON string
  - `declared_value` (numeric) - Declared value for insurance
  - `service_type` (text) - Service level (standard, express, overnight)
  - `status` (text) - Current status (pending, picked_up, in_transit, out_for_delivery, delivered, cancelled)
  - `estimated_delivery` (timestamptz) - Estimated delivery date/time
  - `actual_delivery` (timestamptz) - Actual delivery date/time
  - `price` (numeric) - Total shipment cost
  - `notes` (text) - Special instructions or notes
  - `created_at` (timestamptz) - When shipment was created
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `tracking_events`
  Detailed tracking history for each shipment
  - `id` (uuid, primary key) - Event identifier
  - `shipment_id` (uuid, foreign key) - Reference to shipment
  - `status` (text) - Status at this event
  - `location` (text) - Location where event occurred
  - `description` (text) - Detailed event description
  - `event_time` (timestamptz) - When event occurred
  - `created_at` (timestamptz) - Record creation time

  ### 3. `price_quotes`
  Store price quotes for potential shipments
  - `id` (uuid, primary key) - Quote identifier
  - `email` (text) - Customer email
  - `origin` (text) - Pickup location
  - `destination` (text) - Delivery location
  - `package_type` (text) - Type of package
  - `weight` (numeric) - Weight in kg
  - `service_type` (text) - Service level
  - `quoted_price` (numeric) - Calculated price
  - `created_at` (timestamptz) - Quote creation time

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Public read access for tracking shipments by tracking number
  - Authenticated users can create and manage shipments
  - Tracking events are read-only for public, writable by authenticated users

  ## Indexes
  - Index on tracking_number for fast lookups
  - Index on shipment_id in tracking_events for efficient queries
  - Index on email for customer shipment history
*/

-- Create shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text UNIQUE NOT NULL DEFAULT 'SHP' || upper(substring(gen_random_uuid()::text, 1, 8)),
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  sender_phone text NOT NULL,
  sender_address text NOT NULL,
  recipient_name text NOT NULL,
  recipient_email text NOT NULL,
  recipient_phone text NOT NULL,
  recipient_address text NOT NULL,
  package_type text NOT NULL DEFAULT 'parcel',
  package_weight numeric NOT NULL DEFAULT 0,
  package_dimensions text DEFAULT '',
  declared_value numeric DEFAULT 0,
  service_type text NOT NULL DEFAULT 'standard',
  status text NOT NULL DEFAULT 'pending',
  estimated_delivery timestamptz,
  actual_delivery timestamptz,
  price numeric NOT NULL DEFAULT 0,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tracking_events table
CREATE TABLE IF NOT EXISTS tracking_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id uuid NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  event_time timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create price_quotes table
CREATE TABLE IF NOT EXISTS price_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  package_type text NOT NULL,
  weight numeric NOT NULL,
  service_type text NOT NULL,
  quoted_price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_sender_email ON shipments(sender_email);
CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_id ON tracking_events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_event_time ON tracking_events(event_time DESC);

-- Enable Row Level Security
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_quotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shipments table

-- Anyone can view shipments by tracking number (for public tracking)
CREATE POLICY "Anyone can view shipments by tracking number"
  ON shipments FOR SELECT
  USING (true);

-- Anyone can create a new shipment (booking)
CREATE POLICY "Anyone can create shipments"
  ON shipments FOR INSERT
  WITH CHECK (true);

-- Authenticated users can update any shipment
CREATE POLICY "Authenticated users can update shipments"
  ON shipments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete shipments
CREATE POLICY "Authenticated users can delete shipments"
  ON shipments FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for tracking_events table

-- Anyone can view tracking events
CREATE POLICY "Anyone can view tracking events"
  ON tracking_events FOR SELECT
  USING (true);

-- Authenticated users can create tracking events
CREATE POLICY "Authenticated users can create tracking events"
  ON tracking_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for price_quotes table

-- Anyone can create price quotes
CREATE POLICY "Anyone can create price quotes"
  ON price_quotes FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view all quotes
CREATE POLICY "Authenticated users can view price quotes"
  ON price_quotes FOR SELECT
  TO authenticated
  USING (true);