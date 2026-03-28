import { redirect } from "next/navigation";

/** Respaldo si el middleware no aplica; el middleware ya envía /admin → /dashboard con sesión. */
export default function AdminIndex() {
  redirect("/dashboard");
}
