import Image from "next/image";

import { TStatusReportCitizen } from "..";

export default function ErrorState({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<TStatusReportCitizen>>;
}) {
  return (
    <div className="mt-8 flex flex-col bg-white shadow-md rounded-[20px] px-8 py-10 mb-4 max-w-md mx-auto">
      <div className="flex justify-center">
        <Image
          quality={100}
          draggable={false}
          src="/assets/images/error.svg"
          alt="Error"
          width={120}
          height={200}
          className="animate-pulse"
        />
      </div>

      <h3 className="text-gray-800 md:text-2xl text-lg font-bold text-center mt-4">
        Ops! Algo deu errado
      </h3>
      <p className="text-gray-500 text-sm/5 text-center mt-3">
        Não conseguimos processar seu relato agora. Verifique sua internet ou
        tente novamente em alguns instantes.
      </p>

      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="cursor-pointer text-md bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
