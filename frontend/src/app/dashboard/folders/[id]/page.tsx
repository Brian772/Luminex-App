import DashboardPlaceholder from '@/components/layout/DashboardPlaceholder';

function formatFolderName(id: string) {
  return id
    .split('-')
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');
}

export default async function FolderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const folderName = formatFolderName(id);

  return (
    <DashboardPlaceholder
      title={`Folder: ${folderName}`}
      description={`Halaman folder "${folderName}" sedang dikembangkan.`}
    />
  );
}

