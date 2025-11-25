import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "ZAWIR — Kalkulator Zakat & Warisan Syariah",
  description: "Hitung zakat dan pembagian warisan sesuai syariah Islam dengan akurat dan mudah",
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:py-32 lg:py-40 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-medium text-primary">Kalkulator Syariah Terpercaya</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance text-foreground mb-6 leading-tight">
              <span className="text-primary">ZAWIR</span> — Kalkulator Zakat & Warisan Syariah
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-10">
              Hitung zakat dan pembagian warisan sesuai dengan ketentuan syariah Islam. Aplikasi berbasis web yang
              akurat, mudah digunakan, dan gratis untuk semua.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/zakat">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Kalkulator Zakat
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/waris">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary text-primary hover:bg-primary/5 bg-transparent"
                >
                  Kalkulator Warisan
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Mengapa Memilih ZAWIR?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dirancang khusus untuk membantu Anda memahami dan menghitung kewajiban syariah dengan presisi tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 hover:shadow-lg transition-shadow bg-card border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Perhitungan Cepat & Akurat</h3>
              <p className="text-muted-foreground">
                Hasil perhitungan real-time berdasarkan algoritma syariah yang telah diverifikasi dan dipercaya oleh
                banyak pengguna.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 hover:shadow-lg transition-shadow bg-card border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Berbagai Jenis Zakat</h3>
              <p className="text-muted-foreground">
                Mendukung perhitungan zakat penghasilan, zakat maal, zakat emas/perak, dan zakat fitrah dengan formula
                yang sesuai syariah.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 hover:shadow-lg transition-shadow bg-card border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Pembagian Warisan Faraidh</h3>
              <p className="text-muted-foreground">
                Hitung pembagian warisan sesuai ilmu Faraidh dengan mempertimbangkan semua jenis ahli waris yang ada.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Siap Menghitung Kewajiban Syariah Anda?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 text-balance">
            Pilih kalkulator yang Anda butuhkan dan mulai perhitungan Anda sekarang juga.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/zakat">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Mulai Hitung Zakat
              </Button>
            </Link>
            <Link href="/waris">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 bg-transparent"
              >
                Mulai Hitung Warisan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 sm:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Tentang ZAWIR</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                ZAWIR adalah aplikasi web yang dirancang untuk membantu umat Muslim dalam menghitung dan memahami
                kewajiban zakat serta pembagian warisan sesuai dengan hukum syariah Islam.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Semua perhitungan dilakukan secara real-time di perangkat Anda, tanpa perlu terhubung ke internet
                setelah halaman dimuat. Aplikasi ini tersedia untuk semua orang dan dapat diakses kapan saja.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Fitur Utama</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">
                    Kalkulator Zakat (Penghasilan, Maal, Emas/Perak, Fitrah)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Kalkulator Warisan (Faraidh)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Mode Terang dan Gelap</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Responsif untuk Semua Perangkat</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Gratis dan Tidak Memerlukan Registrasi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
