"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ZakatResultData } from "../zakat-calculator"

interface ZakatIncomeProps {
  onResult: (result: ZakatResultData) => void
  formatNumber: (value: string | number) => string
  parseNumber: (value: string) => number
}

export function ZakatIncome({ onResult, formatNumber, parseNumber }: ZakatIncomeProps) {

  const [income, setIncome] = useState("")
  const [goldPrice, setGoldPrice] = useState(formatNumber("650000"))

  const handleCalculate = () => {
    if (!income || !goldPrice) return

    const incomeAmount = parseNumber(income)
    const goldPriceAmount = parseNumber(goldPrice)

    // Nisab zakat penghasilan = 85 gram emas
    const nisabAmount = 85 * goldPriceAmount
    const wajib = incomeAmount >= nisabAmount
    const zakatAmount = wajib ? incomeAmount * 0.025 : 0

    onResult({
      type: "penghasilan",
      amount: zakatAmount,
      nisab: nisabAmount,
      wajib,
      details: {
        income: incomeAmount,
        goldPrice: goldPriceAmount,
        nisabGrams: 85,
      },
    })
  }

  return (
    <Card className="p-6 bg-card border-border space-y-4">
      <div>
        <Label htmlFor="income" className="font-semibold">
          Total Penghasilan Tahunan (Rp)
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Masukkan total penghasilan bruto Anda dalam setahun (gaji, bonus, tunjangan, dll)
        </p>
        <Input
          id="income"
          inputMode="numeric"
          placeholder="Contoh: 120.000.000"
          value={income}
          onChange={(e) => {
            const cleaned = parseNumber(e.target.value)
            setIncome(cleaned ? formatNumber(cleaned) : "")
          }}
        />
      </div>

      <div>
        <Label htmlFor="goldPrice" className="font-semibold">
          Harga Emas Per Gram (Rp)
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Harga emas hari ini untuk menentukan nisab (85 gram)
        </p>
        <Input
          id="goldPrice"
          inputMode="numeric"
          placeholder="Contoh: 650.000"
          value={goldPrice}
          onChange={(e) => {
            const cleaned = parseNumber(e.target.value)
            setGoldPrice(cleaned ? formatNumber(cleaned) : "")
          }}
        />
      </div>

      <Button
        onClick={handleCalculate}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={!income || !goldPrice}
      >
        Hitung Zakat Penghasilan
      </Button>
    </Card>
  )
}
