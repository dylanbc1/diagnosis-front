import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gran Sesión",
  description: "Creado por Mariana Ardila Agudelo",
  icons: {
    icon: "/favicon.ico", // Ruta al favicon en la raíz del proyecto
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Contenedor de fondo */}
        <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
          {/* Imagen de fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dxhi8xsyb/image/upload/v1731363405/propuesta2_mhnzja.jpg')",
            }}
          >
          </div>
          
          <div className="relative flex items-center justify-center min-h-screen">
          {/* Contenido principal con ancho ajustable */}
            <div className="w-full max-w-5xl mx-auto p-6 bg-white bg-opacity-90 shadow-lg">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
