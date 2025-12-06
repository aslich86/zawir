"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ZakatIncome } from "./zakat-forms/zakat-income"
import { ZakatMaal } from "./zakat-forms/zakat-maal"
import { ZakatGoldSilver } from "./zakat-forms/zakat-gold-silver"
import { ZakatFitrah } from "./zakat-forms/zakat-fitrah"
import { ZakatResult } from "./zakat-forms/zakat-result"

export type ZakatType = "penghasilan" | "maal" | "emas" | "fitrah"

export interface ZakatResultData {
  type: ZakatType
  amount: number
  nisab: number
  wajib: boolean
  details: Record<string, any>
}

/* ===========================================================
   🔢 HELPER — FORMAT ANGKA RIBUAN OTOMATIS
   =========================================================== */
export function formatNumber(value: string | number): string {
  if (value === "" || value === null || value === undefined) return ""

  const num = typeof value === "number" ? value : Number(value.replace(/\./g, ""))
  if (isNaN(num)) return ""

  return num.toLocaleString("id-ID")
}

export function parseNumber(value: string): number {
  if (!value) return 0
  return Number(value.replace(/\./g, ""))
}

export function ZakatCalculator() {
  const [zakatType, setZakatType] = useState<ZakatType>("penghasilan")
  const [result, setResult] = useState<ZakatResultData | null>(null)

  return (
    <div className="space-y-8">
      {/* Type Selection */}
      <Card className="p-6 bg-card border-border">
        <Label htmlFor="zakat-type" className="text-base font-semibold mb-3 block">
          Pilih Jenis Zakat
        </Label>
        <Select
          value={zakatType}
          onValueChange={(value) => {
            setZakatType(value as ZakatType)
            setResult(null)
          }}
        >
          <SelectTrigger id="zakat-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="penghasilan">Zakat Penghasilan</SelectItem>
            <SelectItem value="maal">Zakat Maal (Harta)</SelectItem>
            <SelectItem value="emas">Zakat Emas & Perak</SelectItem>
            <SelectItem value="fitrah">Zakat Fitrah</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Form Section */}
      <div>
        {zakatType === "penghasilan" && (
          <ZakatIncome onResult={setResult} formatNumber={formatNumber} parseNumber={parseNumber} />
        )}
        {zakatType === "maal" && (
          <ZakatMaal onResult={setResult} formatNumber={formatNumber} parseNumber={parseNumber} />
        )}
        {zakatType === "emas" && (
          <ZakatGoldSilver onResult={setResult} formatNumber={formatNumber} parseNumber={parseNumber} />
        )}
{zakatType === "fitrah" && (
  <ZakatFitrah
    onResult={setResult}
    formatNumber={formatNumber}
    parseNumber={parseNumber}
  />
)}
      </div>

      {/* Result Section */}
      {result && <ZakatResult result={result} />}
    </div>
  )
}
