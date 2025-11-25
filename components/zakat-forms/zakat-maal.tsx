"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ZakatResultData } from "../zakat-calculator"

interface ZakatMaalProps {
  onResult: (result: ZakatResultData) => void
}

export function ZakatMaal({ onResult }: ZakatMaalProps) {
  const [wealth, setWealth] = useState("")
  const [goldPrice, setGoldPrice] = useState("650000")

  const handleCalculate = () => {
    if (!wealth || !goldPrice) return

    const wealthAmount = Number.parseFloat(wealth)
    const goldPriceAmount = Number.parseFloat(goldPrice)

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
      <div>
        <Label htmlFor="wealth" className="font-semibold">
          Total Harta (Rp)
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Masukkan total harta/aset yang Anda miliki (uang tunai, tabungan, aset lainnya)
        </p>
        <Input
          id="wealth"
          type="number"
          placeholder="Contoh: 100000000"
          value={wealth}
          onChange={(e) => setWealth(e.target.value)}
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
        disabled={!wealth || !goldPrice}
      >
        Hitung Zakat Maal
      </Button>
    </Card>
  )
}
