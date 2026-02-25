import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportSchema, ReportFormData } from "@/schemas/report.schema";

import { TStatusReportCitizen } from "..";
import api from "@/lib/api";

export default function Form({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<TStatusReportCitizen>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  function onSubmit(data: ReportFormData) {
    setStatus("loading");

    const payload = {
      title: data.title,
      description: data.description,
      location: data.location,
    };

    api
      .post("/reports", payload)
      .then((response) => {
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
      });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col bg-white shadow-md rounded-[20px] px-8 py-10 mb-4"
    >
      <label className="mb-1 text-gray-700 text-sm font-bold">Título</label>

      <input
        {...register("title")}
        className="shadow text-sm appearance-none border-1 bg-gray-50 border-gray-200 rounded-[16px] w-full 
            py-3 px-4 text-gray-700 leading-tight hover:outline-gray-600 focus:outline-gray-300 focus:shadow-outline"
        placeholder="Ex: Balanço quebrado na praça central"
        type="text"
      />

      {errors.title && (
        <span className="text-red-500 text-xs mt-1">
          {errors.title.message}
        </span>
      )}

      <span className="mt-2 text-gray-400 text-xs">
        Obs: Um título curto nos ajuda a identificar o problema rapidamente.
      </span>

      <label className="mt-4 mb-1 text-sm text-gray-700 font-bold">
        Descrição do problema
      </label>

      <textarea
        {...register("description")}
        className="shadow text-sm appearance-none border-1 bg-gray-50 border-gray-200 rounded-[16px] w-full 
            py-3 px-4 text-gray-700 leading-tight hover:outline-gray-600 focus:outline-gray-300 focus:shadow-outline min-h-[140px]"
        placeholder="Conte-nos os detalhes... é perigoso? Há quanto tempo isso está acontecendo? Já aconteceu algo parecido antes?"
      />

      {errors.description && (
        <span className="text-red-500 text-xs mt-1">
          {errors.description.message}
        </span>
      )}

      <label className="mt-4 mb-1 text-sm text-gray-700 font-bold">
        Localização
      </label>

      <input
        {...register("location")}
        className="shadow text-sm appearance-none border-1 bg-gray-50 border-gray-200 rounded-[16px] w-full 
            py-3 px-4 text-gray-700 leading-tight hover:outline-gray-600 focus:outline-gray-300 focus:shadow-outline"
        placeholder="Digite um endereço ou nome da rua"
        type="text"
      />

      {errors.location && (
        <span className="text-red-500 text-xs mt-1">
          {errors.location.message}
        </span>
      )}

      <button
        type="submit"
        className="cursor-pointer text-sm shadow mt-8 bg-violet-500 text-white 
              font-bold py-3 px-4 rounded-[16px] hover:bg-violet-600 focus:outline-none focus:shadow-outline"
      >
        Enviar relato
      </button>
    </form>
  );
}
