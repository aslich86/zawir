"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ZakatResultData } from "../zakat-calculator"

interface ZakatFitrahProps {
  onResult: (result: ZakatResultData) => void
}

export function ZakatFitrah({ onResult }: ZakatFitrahProps) {
  const [familyMembers, setFamilyMembers] = useState("1")
  const [pricePerPerson, setPricePerPerson] = useState("50000")

  const handleCalculate = () => {
    if (!familyMembers || !pricePerPerson) return

    const members = Number.parseInt(familyMembers)
    const priceAmount = Number.parseFloat(pricePerPerson)

    // Zakat fitrah adalah 1 sha (3.2 liter) untuk setiap orang
    // Biasanya dinyatakan dalam nilai uang
    const totalAmount = members * priceAmount

    onResult({
      type: "fitrah",
      amount: totalAmount,
      nisab: 0,
      wajib: true,
      details: {
        familyMembers: members,
        pricePerPerson: priceAmount,
      },
    })
  }

  return (
    <Card className="p-6 bg-card border-border space-y-4">
      <div>
        <Label htmlFor="familyMembers" className="font-semibold">
          Jumlah Anggota Keluarga
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Jumlah orang yang wajib mengeluarkan zakat fitrah (termasuk Anda)
        </p>
        <Input
          id="familyMembers"
          type="number"
          placeholder="Contoh: 4"
          value={familyMembers}
          onChange={(e) => setFamilyMembers(e.target.value)}
          min="1"
        />
      </div>

      <div>
        <Label htmlFor="pricePerPerson" className="font-semibold">
          Nilai Zakat Fitrah Per Orang (Rp)
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Nilai 1 sha (3.2 liter) beras, kurma, atau sejenis makanan pokok
        </p>
        <Input
          id="pricePerPerson"
          type="number"
          placeholder="Contoh: 50000"
          value={pricePerPerson}
          onChange={(e) => setPricePerPerson(e.target.value)}
          min="0"
        />
      </div>

      <Button
        onClick={handleCalculate}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={!familyMembers || !pricePerPerson}
      >
        Hitung Zakat Fitrah
      </Button>
    </Card>
  )
}
