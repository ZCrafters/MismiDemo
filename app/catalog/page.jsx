import CatalogClient from "./CatalogClient";
import { Breadcrumb } from "../../components/ui/Chrome";

export const metadata = { title: "Catalog — Mismi" };

// Server shell: renders breadcrumb + delegates to client component for filter/sort/pagination.
// Required for static export because catalog uses searchParams (dynamic at runtime).
export default function CatalogPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Catalog" }]} />
      <h1 style={{ margin: "4px 0 0" }}>Catalog</h1>
      <CatalogClient />
    </>
  );
}
