import { Sidebar } from "~/app/[locale]/(private)/_components/sidebar";

export default function PrivateLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
