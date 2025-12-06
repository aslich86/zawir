"use client"

import { Card } from "@/components/ui/card"

import type { WarisCalculationResult } from "../waris-calculator"

interface Props {
  result: WarisCalculationResult
}

export function WarisResult({ result }: Props) {
  const { netWealth, distribution, explanation } = result

  const formatRupiah = (n: number) =>
    n.toLocaleString("id-ID")

  return (
    <Card className="p-6 bg-card border-border space-y-6">
      <h2 className="text-xl font-semibold mb-4">Hasil Pembagian Warisan</h2>

      {/* Total Harta */}
      <div className="p-4 rounded-lg bg-muted">
        <p className="text-sm text-muted-foreground">Total Harta Bersih</p>
        <p className="text-xl font-bold">Rp {formatRupiah(netWealth)}</p>
      </div>

      {/* Table Result */}
      <div className="space-y-4">
        {Object.entries(distribution).map(([key, value]) => {
          if (value.amount === 0 && !value.isAshabah) return null

          return (
            <div
              key={key}
              className="border border-border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold capitalize">
                  {key.replace("sons", "Anak Laki-laki")
                      .replace("daughters", "Anak Perempuan")
                      .replace("husband", "Suami")
                      .replace("wife", "Istri")
                      .replace("father", "Ayah")
                      .replace("mother", "Ibu")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {explanation[key]}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  Rp {formatRupiah(value.amount)}
                </p>

                {!value.isAshabah && (
                  <p className="text-xs text-muted-foreground">
                    {(value.portion * 100).toFixed(2)}%
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
