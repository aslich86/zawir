"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ZakatResultData } from "../zakat-calculator"

interface ZakatGoldSilverProps {
  onResult: (result: ZakatResultData) => void
}

export function ZakatGoldSilver({ onResult }: ZakatGoldSilverProps) {
  const [goldGrams, setGoldGrams] = useState("")
  const [goldPrice, setGoldPrice] = useState("650000")
  const [silverGrams, setSilverGrams] = useState("")
  const [silverPrice, setSilverPrice] = useState("9500")

  const handleCalculate = () => {
    const gold = goldGrams ? Number.parseFloat(goldGrams) : 0
    const silver = silverGrams ? Number.parseFloat(silverGrams) : 0

    if (gold <= 0 && silver <= 0) return

    const goldPriceAmount = Number.parseFloat(goldPrice)
    const silverPriceAmount = Number.parseFloat(silverPrice)

    const goldValue = gold * goldPriceAmount
    const silverValue = silver * silverPriceAmount
    const totalValue = goldValue + silverValue

    // Nisab untuk emas = 85 gram
    // Nisab untuk perak = 595 gram
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="goldGrams" className="font-semibold">
            Emas (Gram)
          </Label>
          <p className="text-sm text-muted-foreground mb-2">Jumlah emas yang Anda miliki</p>
          <Input
            id="goldGrams"
            type="number"
            placeholder="Contoh: 100"
            value={goldGrams}
            onChange={(e) => setGoldGrams(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <Label htmlFor="goldPrice" className="font-semibold">
            Harga Emas Per Gram (Rp)
          </Label>
          <p className="text-sm text-muted-foreground mb-2">Harga pasaran emas hari ini</p>
          <Input
            id="goldPrice"
            type="number"
            placeholder="Contoh: 650000"
            value={goldPrice}
            onChange={(e) => setGoldPrice(e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="silverGrams" className="font-semibold">
            Perak (Gram)
          </Label>
          <p className="text-sm text-muted-foreground mb-2">Jumlah perak yang Anda miliki</p>
          <Input
            id="silverGrams"
            type="number"
            placeholder="Contoh: 500"
            value={silverGrams}
            onChange={(e) => setSilverGrams(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <Label htmlFor="silverPrice" className="font-semibold">
            Harga Perak Per Gram (Rp)
          </Label>
          <p className="text-sm text-muted-foreground mb-2">Harga pasaran perak hari ini</p>
          <Input
            id="silverPrice"
            type="number"
            placeholder="Contoh: 9500"
            value={silverPrice}
            onChange={(e) => setSilverPrice(e.target.value)}
            min="0"
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
