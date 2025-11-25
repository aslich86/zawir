"use client"

import { Card } from "@/components/ui/card"
import type { WarisCalculationResult } from "../waris-calculator"

interface WarisResultProps {
  result: WarisCalculationResult
}

export function WarisResult({ result }: WarisResultProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Prepare chart data
  const chartData = Object.entries(result.distribution)
    .map(([key, value]) => {
      let label = ""
      if (key === "husband") label = "Suami"
      else if (key === "wife") label = "Istri"
      else if (key === "father") label = "Ayah"
      else if (key === "mother") label = "Ibu"
      else if (key === "sons") label = `${result.heirs.sonChild} Anak Laki-laki`
      else if (key === "daughters") label = `${result.heirs.daughterChild} Anak Perempuan`

      return {
        name: label,
        value:
          value.portion > 0
            ? value.portion
            : 1 -
              Object.values(result.distribution)
                .filter((v) => v.portion > 0)
                .reduce((acc, curr) => acc + curr.portion, 0),
      }
    })
    .filter((item) => item.value > 0)

  const COLORS = ["#1C8B6A", "#DEC47A", "#0EA5A5", "#14B8A6", "#2DD4BF", "#06B6D4"]

  const totalAmount = Object.values(result.distribution).reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-6 bg-card border-border">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-background p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Harta Bersih</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(result.netWealth)}</p>
          </div>
          <div className="bg-background p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Terbagikan</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalAmount)}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-background p-4 rounded-lg">
          <h3 className="font-semibold text-foreground mb-4 text-center">Visualisasi Pembagian Warisan</h3>
          {chartData.length > 0 && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex justify-center">
                <svg width="240" height="240" viewBox="0 0 240 240">
                  <defs>
                    <style>{`
                      .pie-label { font-size: 11px; font-weight: bold; fill: white; text-anchor: middle; dominant-baseline: middle; }
                    `}</style>
                  </defs>
                  {chartData.map((item, index) => {
                    let currentAngle = -90
                    for (let i = 0; i < index; i++) {
                      currentAngle += chartData[i].value * 360
                    }

                    const sliceAngle = item.value * 360
                    const startAngle = currentAngle
                    const endAngle = currentAngle + sliceAngle
                    const radius = 80
                    const centerX = 120
                    const centerY = 120

                    const startRad = (startAngle * Math.PI) / 180
                    const endRad = (endAngle * Math.PI) / 180

                    const x1 = centerX + radius * Math.cos(startRad)
                    const y1 = centerY + radius * Math.sin(startRad)
                    const x2 = centerX + radius * Math.cos(endRad)
                    const y2 = centerY + radius * Math.sin(endRad)

                    const largeArc = sliceAngle > 180 ? 1 : 0

                    const pathData = [
                      `M ${centerX} ${centerY}`,
                      `L ${x1} ${y1}`,
                      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                      "Z",
                    ].join(" ")

                    const labelAngle = startAngle + sliceAngle / 2
                    const labelRad = (labelAngle * Math.PI) / 180
                    const labelRadius = radius * 0.65
                    const labelX = centerX + labelRadius * Math.cos(labelRad)
                    const labelY = centerY + labelRadius * Math.sin(labelRad)

                    return (
                      <g key={`slice-${index}`}>
                        <path d={pathData} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth="2" />
                        <text x={labelX} y={labelY} className="pie-label">
                          {(item.value * 100).toFixed(0)}%
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-2">
                {chartData.map((item, index) => (
                  <div key={`legend-${index}`} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Distribution Table */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Detail Pembagian</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-semibold text-foreground">Ahli Waris</th>
                <th className="text-right py-2 px-3 font-semibold text-foreground">Bagian</th>
                <th className="text-right py-2 px-3 font-semibold text-foreground">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.distribution).map(([key, value]) => {
                let label = ""
                if (key === "husband") label = "Suami"
                else if (key === "wife") label = "Istri"
                else if (key === "father") label = "Ayah"
                else if (key === "mother") label = "Ibu"
                else if (key === "sons") label = `${result.heirs.sonChild} Anak Laki-laki (masing-masing)`
                else if (key === "daughters") label = `${result.heirs.daughterChild} Anak Perempuan (masing-masing)`

                if (value.amount === 0 && !value.isAshabah) return null

                return (
                  <tr key={key} className="border-b border-border/50 hover:bg-background/50">
                    <td className="py-3 px-3 text-foreground">{label}</td>
                    <td className="py-3 px-3 text-right">
                      {value.portion > 0 ? `${(value.portion * 100).toFixed(2)}%` : "Sisa"}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-primary">
                      {key === "sons"
                        ? formatCurrency(value.amount / result.heirs.sonChild)
                        : key === "daughters"
                          ? formatCurrency(value.amount / result.heirs.daughterChild)
                          : formatCurrency(value.amount)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Explanation */}
      <Card className="p-6 bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-4">Penjelasan Perhitungan</h3>
        <div className="space-y-2 text-sm">
          {Object.entries(result.explanation).map(([key, explanation]) => (
            <div key={key} className="flex gap-2">
              <span className="text-primary font-semibold">•</span>
              <p className="text-muted-foreground">{explanation}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">
        <p className="text-xs text-yellow-900 dark:text-yellow-200 leading-relaxed">
          <strong>⚠️ Penting:</strong> Perhitungan ini bersifat informatif dan menggunakan metode perhitungan dasar.
          Untuk hasil yang akurat dan mengikat secara hukum, konsultasikan dengan ahli waris lainnya dan/atau hadiri
          sesi pembagian warisan di hadapan saksi dan/atau lembaga terpercaya.
        </p>
      </Card>
    </div>
  )
}
