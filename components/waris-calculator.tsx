"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { WarisResult } from "./waris-forms/waris-result"

export interface WarisHeirsSelection {
  husband: boolean
  wife: boolean
  father: boolean
  mother: boolean
  sonChild: number
  daughterChild: number
}

export interface WarisCalculationResult {
  netWealth: number
  heirs: WarisHeirsSelection
  distribution: Record<
    string,
    { portion: number; amount: number; isAshabah?: boolean }
  >
  explanation: Record<string, string>
}


/* === FORMAT NUMBER HELPERS === */
const formatNumber = (value: string | number) => {
  const cleaned = String(value).replace(/\D/g, "")
  if (!cleaned) return ""
  return Number(cleaned).toLocaleString("id-ID")
}

const parseNumber = (value: string): number =>
  Number(value.replace(/\./g, "")) || 0

export function WarisCalculator() {
  const [wealth, setWealth] = useState("")
  const [heirs, setHeirs] = useState<WarisHeirsSelection>({
    husband: false,
    wife: false,
    father: false,
    mother: false,
    sonChild: 0,
    daughterChild: 0,
  })
  const [result, setResult] = useState<WarisCalculationResult | null>(null)

  const calculateWaris = () => {
    if (!wealth) return

    const netWealth = parseNumber(wealth)
    const distribution: Record<
      string,
      { portion: number; amount: number; isAshabah?: boolean }
    > = {}
    const explanation: Record<string, string> = {}
    let totalPortion = 0

    const hasChildren = heirs.sonChild > 0 || heirs.daughterChild > 0

    // Husband
    if (heirs.husband) {
      const portion = hasChildren ? 0.25 : 0.5
      distribution["husband"] = { portion, amount: 0 }
      explanation["husband"] = hasChildren
        ? "Suami mendapat 1/4 karena ada anak"
        : "Suami mendapat 1/2 karena tidak ada anak"
      totalPortion += portion
    }

    // Wife
    if (heirs.wife) {
      const portion = hasChildren ? 0.125 : 0.25
      distribution["wife"] = { portion, amount: 0 }
      explanation["wife"] = hasChildren
        ? "Istri mendapat 1/8 karena ada anak"
        : "Istri mendapat 1/4 karena tidak ada anak"
      totalPortion += portion
    }

    // Father
    if (heirs.father) {
      if (hasChildren) {
        const portion = 1 / 6
        distribution["father"] = { portion, amount: 0 }
        explanation["father"] = "Ayah mendapat 1/6 karena ada anak"
        totalPortion += portion
      } else {
        distribution["father"] = { portion: 0, amount: 0, isAshabah: true }
        explanation["father"] = "Ayah menjadi ashabah (mendapat sisa) karena tidak ada anak"
      }
    }

    // Mother
    if (heirs.mother) {
      const portion = hasChildren ? 1 / 6 : 1 / 3
      distribution["mother"] = { portion, amount: 0 }
      explanation["mother"] = hasChildren
        ? "Ibu mendapat 1/6 karena ada anak"
        : "Ibu mendapat 1/3 karena tidak ada anak"
      totalPortion += portion
    }

    // Children
    const totalChildren = heirs.sonChild + heirs.daughterChild
    if (totalChildren > 0) {
      const childrenPortion = 1 - totalPortion
      const totalParts = heirs.sonChild * 2 + heirs.daughterChild

      if (heirs.sonChild > 0) {
        const portionEach = (childrenPortion * 2) / totalParts
        distribution["sons"] = {
          portion: heirs.sonChild * portionEach,
          amount: 0,
        }
        explanation["sons"] = `Masing-masing anak laki-laki mendapat ${(portionEach * 100).toFixed(1)}%`
      }

      if (heirs.daughterChild > 0) {
        const portionEach = childrenPortion / totalParts
        distribution["daughters"] = {
          portion: heirs.daughterChild * portionEach,
          amount: 0,
        }
        explanation["daughters"] = `Masing-masing anak perempuan mendapat ${(portionEach * 100).toFixed(1)}%`
      }

      totalPortion = 1
    }

    // Calculate actual amounts
    Object.keys(distribution).forEach((key) => {
      const d = distribution[key]
      if (d.isAshabah) {
        d.amount = netWealth * (1 - totalPortion)
      } else {
        d.amount = netWealth * d.portion
      }
    })

    setResult({ netWealth, heirs, distribution, explanation })
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Input Section */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-card border-border space-y-6">

            {/* Wealth Input */}
            <div>
              <Label htmlFor="wealth" className="font-semibold">
                Harta Bersih (Rp)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Total harta warisan yang akan dibagikan
              </p>

              <Input
                id="wealth"
                inputMode="numeric"
                placeholder="600.000.000"
                value={wealth}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\./g, "")
                  setWealth(formatNumber(raw))
                  setResult(null)
                }}
              />
            </div>

            {/* Heirs Selection */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-4">Ahli Waris yang Masih Hidup</h3>

              <div className="space-y-3">
                {[
                  { key: "husband", label: "Suami" },
                  { key: "wife", label: "Istri" },
                  { key: "father", label: "Ayah" },
                  { key: "mother", label: "Ibu" },
                ].map((field) => (
                  <div key={field.key} className="flex items-center gap-3">
                    <Checkbox
                      id={field.key}
                      checked={(heirs as any)[field.key]}
                      onCheckedChange={(checked) => {
                        setHeirs({ ...heirs, [field.key]: !!checked })
                        setResult(null)
                      }}
                    />
                    <Label htmlFor={field.key} className="cursor-pointer text-sm">
                      {field.label}
                    </Label>
                  </div>
                ))}

                {/* Sons */}
                <div className="border-t border-border pt-3">
                  <label className="text-sm font-medium block mb-2">
                    Anak Laki-laki
                  </label>
                  <Input
                    inputMode="numeric"
                    placeholder="Jumlah"
                    value={heirs.sonChild}
                    onChange={(e) => {
                      const v = Number(e.target.value.replace(/\D/g, "")) || 0
                      setHeirs({ ...heirs, sonChild: v })
                      setResult(null)
                    }}
                  />
                </div>

                {/* Daughters */}
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Anak Perempuan
                  </label>
                  <Input
                    inputMode="numeric"
                    placeholder="Jumlah"
                    value={heirs.daughterChild}
                    onChange={(e) => {
                      const v = Number(e.target.value.replace(/\D/g, "")) || 0
                      setHeirs({ ...heirs, daughterChild: v })
                      setResult(null)
                    }}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={calculateWaris}
              className="w-full bg-primary"
              disabled={!wealth}
            >
              Hitung Pembagian Warisan
            </Button>
          </Card>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-2">
          {result ? (
            <WarisResult result={result} />
          ) : (
            <Card className="p-8 bg-card border-border border-dashed h-full flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Isi data di sebelah kiri lalu klik tombol untuk melihat hasil perhitungan
              </p>
            </Card>
          )}
        </div>

      </div>
    </div>
  )
}
