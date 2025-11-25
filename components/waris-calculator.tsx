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
  distribution: Record<string, { portion: number; amount: number }>
  explanation: Record<string, string>
}

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

    const netWealth = Number.parseFloat(wealth)
    const distribution: Record<string, { portion: number; amount: number }> = {}
    const explanation: Record<string, string> = {}
    let totalPortion = 0

    // Check if there are children (sons or daughters)
    const hasChildren = heirs.sonChild > 0 || heirs.daughterChild > 0

    // Husband's share
    if (heirs.husband) {
      const portion = hasChildren ? 0.25 : 0.5
      distribution["husband"] = { portion, amount: 0 }
      explanation["husband"] = hasChildren
        ? "Suami mendapat 1/4 karena ada anak"
        : "Suami mendapat 1/2 karena tidak ada anak"
      totalPortion += portion
    }

    // Wife's share
    if (heirs.wife) {
      const portion = hasChildren ? 0.125 : 0.25
      distribution["wife"] = { portion, amount: 0 }
      explanation["wife"] = hasChildren
        ? "Istri mendapat 1/8 karena ada anak"
        : "Istri mendapat 1/4 karena tidak ada anak"
      totalPortion += portion
    }

    // Father's share
    if (heirs.father) {
      if (hasChildren) {
        const portion = 1 / 6
        distribution["father"] = { portion, amount: 0 }
        explanation["father"] = "Ayah mendapat 1/6 karena ada anak"
        totalPortion += portion
      } else {
        // Father becomes ashobah (gets remainder)
        distribution["father"] = { portion: 0, amount: 0, isAshabah: true }
        explanation["father"] = "Ayah menjadi ashabah karena tidak ada anak (mendapat sisa)"
      }
    }

    // Mother's share
    if (heirs.mother) {
      if (hasChildren) {
        const portion = 1 / 6
        distribution["mother"] = { portion, amount: 0 }
        explanation["mother"] = "Ibu mendapat 1/6 karena ada anak"
        totalPortion += portion
      } else {
        const portion = 1 / 3
        distribution["mother"] = { portion, amount: 0 }
        explanation["mother"] = "Ibu mendapat 1/3 karena tidak ada anak"
        totalPortion += portion
      }
    }

    // Sons and Daughters
    const totalChildren = heirs.sonChild + heirs.daughterChild
    if (totalChildren > 0) {
      // Calculate children's total share (sisa after other heirs)
      const childrenPortion = 1 - totalPortion

      if (heirs.sonChild > 0) {
        // Sons: 2 sons = 1 daughter in value
        // Total parts = (sons × 2) + daughters
        const totalParts = heirs.sonChild * 2 + heirs.daughterChild
        const sonEachPortion = (childrenPortion * 2) / totalParts
        distribution["sons"] = { portion: heirs.sonChild * sonEachPortion, amount: 0 }
        explanation["sons"] =
          `Masing-masing anak laki-laki mendapat ${(sonEachPortion * 100).toFixed(1)}% (rasio 2:1 dari anak perempuan)`
      }

      if (heirs.daughterChild > 0) {
        const totalParts = heirs.sonChild * 2 + heirs.daughterChild
        const daughterEachPortion = childrenPortion / totalParts
        distribution["daughters"] = { portion: heirs.daughterChild * daughterEachPortion, amount: 0 }
        explanation["daughters"] = `Masing-masing anak perempuan mendapat ${(daughterEachPortion * 100).toFixed(1)}%`
      }

      totalPortion = 1 // Children get the remainder, so total becomes 1
    }

    // Calculate actual amounts
    Object.keys(distribution).forEach((key) => {
      if (distribution[key].portion > 0 || distribution[key].isAshabah) {
        distribution[key].amount = distribution[key].isAshabah
          ? netWealth * (1 - totalPortion + (distribution[key].portion || 0))
          : netWealth * distribution[key].portion
      }
    })

    setResult({
      netWealth,
      heirs,
      distribution,
      explanation,
    })
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-card border-border space-y-6">
            <div>
              <Label htmlFor="wealth" className="font-semibold">
                Harta Bersih (Rp)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">Total harta warisan yang akan dibagikan</p>
              <Input
                id="wealth"
                type="number"
                placeholder="Contoh: 600000000"
                value={wealth}
                onChange={(e) => setWealth(e.target.value)}
                min="0"
              />
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-4 text-foreground">Ahli Waris yang Masih Hidup</h3>

              <div className="space-y-3">
                {/* Husband */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="husband"
                    checked={heirs.husband}
                    onCheckedChange={(checked) => {
                      setHeirs({ ...heirs, husband: !!checked })
                      setResult(null)
                    }}
                  />
                  <Label htmlFor="husband" className="cursor-pointer text-sm">
                    Suami
                  </Label>
                </div>

                {/* Wife */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="wife"
                    checked={heirs.wife}
                    onCheckedChange={(checked) => {
                      setHeirs({ ...heirs, wife: !!checked })
                      setResult(null)
                    }}
                  />
                  <Label htmlFor="wife" className="cursor-pointer text-sm">
                    Istri
                  </Label>
                </div>

                {/* Father */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="father"
                    checked={heirs.father}
                    onCheckedChange={(checked) => {
                      setHeirs({ ...heirs, father: !!checked })
                      setResult(null)
                    }}
                  />
                  <Label htmlFor="father" className="cursor-pointer text-sm">
                    Ayah
                  </Label>
                </div>

                {/* Mother */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="mother"
                    checked={heirs.mother}
                    onCheckedChange={(checked) => {
                      setHeirs({ ...heirs, mother: !!checked })
                      setResult(null)
                    }}
                  />
                  <Label htmlFor="mother" className="cursor-pointer text-sm">
                    Ibu
                  </Label>
                </div>

                <div className="border-t border-border pt-3">
                  <label className="text-sm font-medium text-foreground block mb-2">Anak Laki-laki</label>
                  <Input
                    type="number"
                    placeholder="Jumlah"
                    value={heirs.sonChild}
                    onChange={(e) => {
                      setHeirs({ ...heirs, sonChild: Number.parseInt(e.target.value) || 0 })
                      setResult(null)
                    }}
                    min="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Anak Perempuan</label>
                  <Input
                    type="number"
                    placeholder="Jumlah"
                    value={heirs.daughterChild}
                    onChange={(e) => {
                      setHeirs({ ...heirs, daughterChild: Number.parseInt(e.target.value) || 0 })
                      setResult(null)
                    }}
                    min="0"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={calculateWaris}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
              <div className="text-center">
                <p className="text-muted-foreground">
                  Isi data di sebelah kiri dan klik "Hitung Pembagian Warisan" untuk melihat hasil perhitungan
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
