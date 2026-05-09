 'use client';

import MainPanel from '@/components/layout/MainPanel';
import { useLayoutStore } from '@/stores/useLayoutStore';

export default function SemuaDokumenPage() {
  const { isZenMode } = useLayoutStore();
  return <MainPanel zenMode={isZenMode} />;
}
