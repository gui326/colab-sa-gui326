import { useState } from "react";
import Image from "next/image";

import Form from "./Form";
import LoadingState from "./LoadingState";
import SuccessState from "./SuccessState";
import ErrorState from "./ErrorState";

export type TStatusReportCitizen = "idle" | "loading" | "success" | "error";

export default function HomeScreen() {
  const [status, setStatus] = useState<TStatusReportCitizen>("idle");

  return (
    <main className="bg-gray-50 min-h-screen">
      <header className="bg-white">
        <nav className="h-[72px] max-w-7xl mx-auto px-4 flex items-center">
          <div className="flex items-center gap-[16px]">
            <Image
              quality={100}
              draggable={false}
              src="/assets/images/logo_guidev.svg"
              alt="Logo Guidev"
              width={36}
              height={36}
            />

            <h2 className="md:text-lg text-md font-bold text-violet-500">
              Colab.gui326
            </h2>
          </div>
        </nav>
      </header>

      <section>
        <div className="max-w-2xl mx-auto px-4 py-[64px]">
          <h1 className="text-gray-800 md:text-5xl text-2xl font-bold text-center">
            Vamos resolver juntos
          </h1>

          <p className="text-gray-500 md:mt-[24px] mt-[12px] md:text-xl text-sm text-center">
            Viu algo errado no bairro? Conte para nós
            <br />e nós cuidaremos do resto!
          </p>

          {status == "idle" ? <Form setStatus={setStatus} /> : null}

          {status == "loading" ? <LoadingState /> : null}

          {status == "success" ? <SuccessState /> : null}

          {status == "error" ? <ErrorState setStatus={setStatus} /> : null}
        </div>
      </section>
    </main>
  );
}
