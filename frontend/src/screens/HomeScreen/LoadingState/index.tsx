import Image from "next/image";

export default function LoadingState() {
  return (
    <div className="mt-8 flex flex-col bg-white shadow-md rounded-[20px] px-8 py-10 mb-4 max-w-md mx-auto">
      <div className="flex justify-center">
        <Image
          quality={100}
          draggable={false}
          src="/assets/images/loading.svg"
          alt="Loading"
          width={120}
          height={200}
          className="animate-spin"
        />
      </div>

      <h3 className="text-gray-800 md:text-2xl text-lg font-bold text-center mt-4">
        Estamos analisando seu relato, só um momento...
      </h3>
      <p className="text-gray-500 text-sm/5 text-center mt-3">
        Nosso ajudante está lendo os detalhes para garantir que chegue à equipe
        certa.
      </p>
    </div>
  );
}
