"use client"

import { Card } from "@/components/ui/card"
import type { ZakatResultData } from "../zakat-calculator"

interface ZakatResultProps {
  result: ZakatResultData
}

export function ZakatResult({ result }: ZakatResultProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getTitle = () => {
    switch (result.type) {
      case "penghasilan":
        return "Hasil Perhitungan Zakat Penghasilan"
      case "maal":
        return "Hasil Perhitungan Zakat Maal"
      case "emas":
        return "Hasil Perhitungan Zakat Emas & Perak"
      case "fitrah":
        return "Hasil Perhitungan Zakat Fitrah"
    }
  }

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Card
        className={`p-6 border-2 ${result.wajib ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900" : "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900"}`}
      >
        <div className="flex items-start gap-3">
          {result.wajib ? (
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <div>
            <h3
              className={`font-semibold text-lg ${result.wajib ? "text-green-900 dark:text-green-100" : "text-blue-900 dark:text-blue-100"}`}
            >
              {result.wajib ? "Anda Wajib Mengeluarkan Zakat" : "Anda Belum Mencapai Nisab"}
            </h3>
            {result.type !== "fitrah" && (
              <p
                className={`text-sm mt-1 ${result.wajib ? "text-green-800 dark:text-green-200" : "text-blue-800 dark:text-blue-200"}`}
              >
                {result.wajib
                  ? `Harta Anda telah mencapai nisab sebesar ${formatCurrency(result.nisab)}`
                  : `Nisab zakat adalah ${formatCurrency(result.nisab)}`}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Result Card */}
      <Card className="p-8 bg-card border-border">
        <div className="text-center">
          <h2 className="text-lg text-muted-foreground mb-4">{getTitle()}</h2>
          <div className="mb-6">
            <div className="text-5xl font-bold text-primary mb-2">{formatCurrency(result.amount)}</div>
            <p className="text-muted-foreground">Total Zakat yang Harus Dikeluarkan</p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="font-semibold text-foreground mb-4">Detail Perhitungan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.type === "penghasilan" && (
              <>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Penghasilan Tahunan</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(result.details.income)}</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Nisab (85 gram emas)</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(result.nisab)}</p>
                </div>
                <div className="bg-background p-4 rounded-lg md:col-span-2">
                  <p className="text-sm text-muted-foreground">Tarif Zakat Penghasilan</p>
                  <p className="text-lg font-semibold text-foreground">2.5% dari Total Penghasilan</p>
                </div>
              </>
            )}

            {result.type === "maal" && (
              <>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Harta</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(result.details.wealth)}</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Nisab (85 gram emas)</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(result.nisab)}</p>
                </div>
                <div className="bg-background p-4 rounded-lg md:col-span-2">
                  <p className="text-sm text-muted-foreground">Tarif Zakat Maal</p>
                  <p className="text-lg font-semibold text-foreground">2.5% dari Total Harta</p>
                </div>
              </>
            )}

            {result.type === "emas" && (
              <>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Emas</p>
                  <p className="text-lg font-semibold text-foreground">
                    {result.details.goldGrams.toFixed(2)} gram ({formatCurrency(result.details.goldValue)})
                  </p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Perak</p>
                  <p className="text-lg font-semibold text-foreground">
                    {result.details.silverGrams.toFixed(2)} gram ({formatCurrency(result.details.silverValue)})
                  </p>
                </div>
                <div className="bg-background p-4 rounded-lg md:col-span-2">
                  <p className="text-sm text-muted-foreground">Total Nilai</p>
                  <p className="text-lg font-semibold text-foreground">{formatCurrency(result.details.totalValue)}</p>
                </div>
              </>
            )}

            {result.type === "fitrah" && (
              <>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Jumlah Orang</p>
                  <p className="text-lg font-semibold text-foreground">{result.details.familyMembers} orang</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Harga Per Orang</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(result.details.pricePerPerson)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">💡 Informasi:</strong> Perhitungan ini bersifat informatif. Untuk
            memastikan akurasi, konsultasikan dengan ulama atau lembaga zakat terpercaya di daerah Anda.
          </p>
        </div>
      </Card>
    </div>
  )
}
