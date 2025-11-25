import { ZakatCalculator } from "@/components/zakat-calculator"

export const metadata = {
  title: "Kalkulator Zakat — ZAWAR",
  description: "Hitung zakat penghasilan, zakat maal, zakat emas/perak, dan zakat fitrah",
}

export default function ZakatPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Kalkulator Zakat</h1>
          <p className="text-muted-foreground text-lg">
            Hitung zakat Anda dengan mudah dan akurat sesuai syariah Islam
          </p>
        </div>

        <ZakatCalculator />
      </div>
    </div>
  )
}
