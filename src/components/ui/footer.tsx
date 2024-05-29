/// <reference types="vite-plugin-svgr/client" />

import WnbLogoTextSvg from "@/assets/wnb-logo-text.svg?react";
import WnbLogoSvg from "@/assets/wnb-logo.svg?react";
import GithubIcon from "@/assets/github-mark.svg?react";

export const Footer = () => (
  <div className=" bg-primary text-white dark:bg-background flex  justify-between items-center px-5">
    <a href="https://www.wiesbaden-neu-bewegen.de">
      <WnbLogoTextSvg className="h-16 w-auto py-3 hidden lg:block" />
      <WnbLogoSvg className="h-16 w-auto py-3 lg:hidden" />
    </a>
    <h1 className="text-md font-semibold hidden md:block">
      Interaktive Karte zum Nahverkehrsplan 2030 Wiesbaden
    </h1>
    <div className="flex gap-5">
      <a
        href="https://wiesbaden-neu-bewegen.de/impressum/"
        className="underline"
      >
        Impressum
      </a>
      <a
        href="https://wiesbaden-neu-bewegen.de/datenschutz/"
        className="underline"
      >
        Datenschutz
      </a>
      <a href="https://github.com/AnsgarH1/Wiesbaden-NVPv2-Visualisierung">
        <div className="flex justify-center items-center  gap-2 underline ">
          <GithubIcon className="h-4 w-auto fill-white" />
          GitHub
        </div>
      </a>
    </div>
  </div>
);
