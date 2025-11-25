import { WarisCalculator } from "@/components/waris-calculator"

export const metadata = {
  title: "Kalkulator Warisan — ZAWIR",
  description: "Hitung pembagian warisan sesuai dengan ilmu Faraidh syariah Islam",
}

export default function WarisPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Kalkulator Warisan (Faraidh)</h1>
          <p className="text-muted-foreground text-lg">
            Hitung pembagian warisan sesuai dengan ilmu Faraidh dan hukum Islam
          </p>
        </div>

        <WarisCalculator />
      </div>
    </div>
  )
}
