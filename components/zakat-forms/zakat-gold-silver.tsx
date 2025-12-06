"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ZakatResultData } from "../zakat-calculator"

interface ZakatGoldSilverProps {
  onResult: (result: ZakatResultData) => void
  formatNumber: (value: string | number) => string
  parseNumber: (value: string) => number
}

export function ZakatGoldSilver({ onResult, formatNumber, parseNumber }: ZakatGoldSilverProps) {
  const [goldGrams, setGoldGrams] = useState("")
  const [goldPrice, setGoldPrice] = useState(formatNumber("650000"))

  const [silverGrams, setSilverGrams] = useState("")
  const [silverPrice, setSilverPrice] = useState(formatNumber("9500"))

  const handleCalculate = () => {
    const gold = parseNumber(goldGrams) || 0
    const silver = parseNumber(silverGrams) || 0

    if (gold <= 0 && silver <= 0) return

    const goldPriceAmount = parseNumber(goldPrice)
    const silverPriceAmount = parseNumber(silverPrice)

    const goldValue = gold * goldPriceAmount
    const silverValue = silver * silverPriceAmount
    const totalValue = goldValue + silverValue

    const goldNisab = 85 * goldPriceAmount
    const silverNisab = 595 * silverPriceAmount

    const wajib = goldValue >= goldNisab || silverValue >= silverNisab
    const zakatAmount = wajib ? totalValue * 0.025 : 0

    onResult({
      type: "emas",
      amount: zakatAmount,
      nisab: Math.min(goldNisab, silverNisab),
      wajib,
      details: {
        goldGrams: gold,
        goldValue,
        silverGrams: silver,
        silverValue,
        totalValue,
      },
    })
  }

  return (
    <Card className="p-6 bg-card border-border space-y-4">

      {/* EMAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Input gram emas */}
        <div>
          <Label htmlFor="goldGrams" className="font-semibold">Emas (Gram)</Label>
          <p className="text-sm text-muted-foreground mb-2">Jumlah emas yang Anda miliki</p>
          <Input
            id="goldGrams"
            inputMode="decimal"
            placeholder="Contoh: 100"
            value={goldGrams}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/,/g, "")
              setGoldGrams(cleaned)
            }}
          />
        </div>

        {/* Input harga emas */}
        <div>
          <Label htmlFor="goldPrice" className="font-semibold">Harga Emas Per Gram (Rp)</Label>
          <p className="text-sm text-muted-foreground mb-2">Harga pasaran emas hari ini</p>
          <Input
            id="goldPrice"
            inputMode="numeric"
            placeholder="Contoh: 650.000"
            value={goldPrice}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/,/g, "")
              setGoldPrice(formatNumber(cleaned))
            }}
          />
        </div>

      </div>

      {/* PERAK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Gram perak */}
        <div>
          <Label htmlFor="silverGrams" className="font-semibold">Perak (Gram)</Label>
          <p className="text-sm text-muted-foreground mb-2">Jumlah perak yang Anda miliki</p>
          <Input
            id="silverGrams"
            inputMode="decimal"
            placeholder="Contoh: 500"
            value={silverGrams}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/,/g, "")
              setSilverGrams(cleaned)
            }}
          />
        </div>

        {/* Harga perak */}
        <div>
          <Label htmlFor="silverPrice" className="font-semibold">Harga Perak Per Gram (Rp)</Label>
          <p className="text-sm text-muted-foreground mb-2">Harga pasaran perak hari ini</p>
          <Input
            id="silverPrice"
            inputMode="numeric"
            placeholder="Contoh: 9.500"
            value={silverPrice}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/,/g, "")
              setSilverPrice(formatNumber(cleaned))
            }}
          />
        </div>

      </div>

      <Button
        onClick={handleCalculate}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={goldGrams === "" && silverGrams === ""}
      >
        Hitung Zakat Emas & Perak
      </Button>
    </Card>
  )
}
