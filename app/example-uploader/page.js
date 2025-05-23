'use client';

import { UploadButton } from '@/utils/uploadthing';
import { UploadDropzone } from '@/utils/uploadthing';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log('Files: ', res);
          alert('Upload Completed');
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log('Files: ', res);
          alert('Upload Completed');
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
