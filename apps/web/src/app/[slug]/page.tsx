import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Список известных маршрутов — всё остальное это 404
  const knownRoutes = ["about", "profile", "login", "signup"];
  if (!knownRoutes.includes(slug)) {
    notFound();
  }

  return <div>My Post: {slug}</div>;
}
