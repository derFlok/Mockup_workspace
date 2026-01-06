interface PermissionBadgeProps {
  permission: 'Everything' | 'Read' | 'Write';
}

export function PermissionBadge({ permission }: PermissionBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-[var(--badge-teal)] text-[var(--badge-teal)] bg-transparent">
      {permission}
    </span>
  );
}
