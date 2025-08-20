"use client";

export default function ErrorPage({ error }: { error: unknown }) {
  console.error(error);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Evento no encontrado
        </h1>
        <p className="text-gray-600">
          El evento que buscas no existe o ha sido eliminado.
        </p>
      </div>
    </div>
  );
}
