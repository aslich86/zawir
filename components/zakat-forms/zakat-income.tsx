"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ZakatResultData } from "../zakat-calculator"

interface ZakatIncomeProps {
  onResult: (result: ZakatResultData) => void
}

export function ZakatIncome({ onResult }: ZakatIncomeProps) {
  const [income, setIncome] = useState("")
  const [goldPrice, setGoldPrice] = useState("650000")

  const handleCalculate = () => {
    if (!income || !goldPrice) return

    const incomeAmount = Number.parseFloat(income)
    const goldPriceAmount = Number.parseFloat(goldPrice)

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
          type="number"
          placeholder="Contoh: 120000000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          min="0"
        />
      </div>

      <div>
        <Label htmlFor="goldPrice" className="font-semibold">
          Harga Emas Per Gram (Rp)
        </Label>
        <p className="text-sm text-muted-foreground mb-2">Harga emas hari ini untuk menentukan nisab (85 gram)</p>
        <Input
          id="goldPrice"
          type="number"
          placeholder="Contoh: 650000"
          value={goldPrice}
          onChange={(e) => setGoldPrice(e.target.value)}
          min="0"
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
