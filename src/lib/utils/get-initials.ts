export function getInitials(name: string | undefined) {
  if (name == null) return "";

  const [firstName, ...surnames] = name.split(" ");

  return `${firstName?.at(0)}${surnames.at(-1)?.at(0)}`;
}
