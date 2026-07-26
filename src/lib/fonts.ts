import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    { path: "../../public/satoshi/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/satoshi/Satoshi-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/satoshi/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/satoshi/Satoshi-Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/satoshi/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/satoshi/Satoshi-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/satoshi/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/satoshi/Satoshi-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../../public/satoshi/Satoshi-Black.otf", weight: "900", style: "normal" },
    { path: "../../public/satoshi/Satoshi-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const inter = localFont({
  src: [
    { path: "../../public/inter/Inter-Thin-BETA.otf", weight: "100", style: "normal" },
    { path: "../../public/inter/Inter-ThinItalic-BETA.otf", weight: "100", style: "italic" },
    { path: "../../public/inter/Inter-ExtraLight-BETA.otf", weight: "200", style: "normal" },
    { path: "../../public/inter/Inter-ExtraLightItalic-BETA.otf", weight: "200", style: "italic" },
    { path: "../../public/inter/Inter-Light-BETA.otf", weight: "300", style: "normal" },
    { path: "../../public/inter/Inter-LightItalic-BETA.otf", weight: "300", style: "italic" },
    { path: "../../public/inter/Inter-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/inter/Inter-Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/inter/Inter-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/inter/Inter-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/inter/Inter-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/inter/Inter-SemiBoldItalic.otf", weight: "600", style: "italic" },
    { path: "../../public/inter/Inter-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/inter/Inter-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "../../public/inter/Inter-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "../../public/inter/Inter-ExtraBoldItalic.otf", weight: "800", style: "italic" },
    { path: "../../public/inter/Inter-Black.otf", weight: "900", style: "normal" },
    { path: "../../public/inter/Inter-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const spaceGrotesk = localFont({
  src: [
    { path: "../../public/space-grotesk/SpaceGrotesk-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/space-grotesk/SpaceGrotesk-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/space-grotesk/SpaceGrotesk-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/space-grotesk/SpaceGrotesk-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/space-grotesk/SpaceGrotesk-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});
