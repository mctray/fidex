/*
  # Create Package Images Storage Bucket

  1. Storage Setup
    - Create 'package-images' bucket for storing package photos
    - Enable public access for viewing images
    - Set file size limit to 5MB
    - Allow image file types only

  2. Security
    - Allow authenticated users to upload images
    - Make images publicly readable
    - Restrict uploads to authenticated users only
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'package-images',
  'package-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

CREATE POLICY "Allow public to view package images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'package-images');

CREATE POLICY "Allow authenticated users to upload package images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'package-images');

CREATE POLICY "Allow authenticated users to delete their package images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'package-images');
