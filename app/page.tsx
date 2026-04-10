// ✅ Fix
import { Suspense } from 'react';

function PreviewContent() {
  const searchParams = useSearchParams();
  // ... baaki saara code yahan
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}