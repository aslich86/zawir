"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ZakatResultData } from "../zakat-calculator"

interface ZakatMaalProps {
  onResult: (result: ZakatResultData) => void
  formatNumber: (value: string | number) => string
  parseNumber: (value: string) => number
}

export function ZakatMaal({ onResult, formatNumber, parseNumber }: ZakatMaalProps) {
  const [wealth, setWealth] = useState("")
  const [goldPrice, setGoldPrice] = useState(formatNumber("650000"))

  const handleCalculate = () => {
    const wealthAmount = parseNumber(wealth)
    const goldPriceAmount = parseNumber(goldPrice)

    if (wealthAmount <= 0 || goldPriceAmount <= 0) return

    // Nisab zakat maal = 85 gram emas
    const nisabAmount = 85 * goldPriceAmount
    const wajib = wealthAmount >= nisabAmount
    const zakatAmount = wajib ? wealthAmount * 0.025 : 0

    onResult({
      type: "maal",
      amount: zakatAmount,
      nisab: nisabAmount,
      wajib,
      details: {
        wealth: wealthAmount,
        goldPrice: goldPriceAmount,
        nisabGrams: 85,
      },
    })
  }

  return (
    <Card className="p-6 bg-card border-border space-y-4">

      {/* TOTAL HARTA */}
      <div>
        <Label htmlFor="wealth" className="font-semibold">
          Total Harta (Rp)
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Masukkan total harta/aset yang Anda miliki (uang tunai, tabungan, aset lainnya)
        </p>
        <Input
          id="wealth"
          inputMode="numeric"
          placeholder="Contoh: 100.000.000"
          value={wealth}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/\D/g, "")
            setWealth(formatNumber(cleaned))
          }}
        />
      </div>

      {/* HARGA EMAS */}
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
            const cleaned = e.target.value.replace(/\D/g, "")
            setGoldPrice(formatNumber(cleaned))
          }}
        />
      </div>

      {/* TOMBOL */}
      <Button className="w-full" onClick={handleCalculate}>
        Hitung Zakat
      </Button>

    </Card>
  )
}
