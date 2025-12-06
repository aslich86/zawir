"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ZakatResultData } from "../zakat-calculator";

interface ZakatFitrahProps {
  onResult: (result: ZakatResultData) => void;
  formatNumber: (value: string | number) => string;
  parseNumber: (value: string) => number;
}

export function ZakatFitrah({
  onResult,
  formatNumber,
  parseNumber,
}: ZakatFitrahProps) {
  const [familyMembers, setFamilyMembers] = useState("1");
  const [pricePerPerson, setPricePerPerson] = useState(formatNumber("50000"));

  const handleCalculate = () => {
    if (!familyMembers || !pricePerPerson) return;

    const members = parseNumber(familyMembers);
    const priceAmount = parseNumber(pricePerPerson);

    const totalAmount = members * priceAmount;

    onResult({
      type: "fitrah",
      amount: totalAmount,
      nisab: 0,
      wajib: true,
      details: {
        familyMembers: members,
        pricePerPerson: priceAmount,
      },
    });
  };

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
          inputMode="numeric"
          placeholder="Contoh: 4"
          value={familyMembers}
          onChange={(e) => {
            const cleaned = parseNumber(e.target.value);
            setFamilyMembers(cleaned ? formatNumber(cleaned) : "");
          }}
        />
      </div>

      <div>
        <Label htmlFor="pricePerPerson" className="font-semibold">
          Nilai Zakat Fitrah Per Orang (Rp)
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Nilai 1 sha (3.2 liter) beras / makanan pokok dalam rupiah
        </p>

        <Input
          id="pricePerPerson"
          inputMode="numeric"
          placeholder="Contoh: 50.000"
          value={pricePerPerson}
          onChange={(e) => {
            const cleaned = parseNumber(e.target.value);
            setPricePerPerson(cleaned ? formatNumber(cleaned) : "");
          }}
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
  );
}
