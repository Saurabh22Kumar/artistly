import RequireAuth from "../../components/Auth/RequireAuth";
import OnboardForm from "../../components/Form/OnboardForm";

export default function OnboardPage() {
  return (
    <RequireAuth>
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-primary drop-shadow-sm tracking-tight">Onboard a New Artist</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg max-w-2xl leading-relaxed">
          Fill out the form below to add a new artist to the platform. All fields are required unless marked optional.
        </p>
        <OnboardForm />
      </main>
    </RequireAuth>
  );
}
