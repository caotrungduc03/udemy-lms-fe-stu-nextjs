import { Header } from "@/src/components/admin/adminPage/header";
import { Sidebar } from "@/src/components/admin/adminPage/sidebar";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-flow-col	grid-cols-sidebar items-center min-h-screen w-full justify-between">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Sidebar></Sidebar>
      <div className="h-screen">
        <Header></Header>
        {children}
      </div>
    </section>
  );
}
