import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    // Un fond en dégradé subtil pour un look plus premium
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <AuthForm />
    </main>
  );
}