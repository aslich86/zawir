export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-primary mb-2">ZAWAR</h3>
            <p className="text-sm text-muted-foreground">
              Kalkulator Zakat & Warisan Syariah yang akurat, gratis, dan mudah digunakan untuk semua umat Muslim.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/zakat" className="text-muted-foreground hover:text-primary transition-colors">
                  Kalkulator Zakat
                </a>
              </li>
              <li>
                <a href="/waris" className="text-muted-foreground hover:text-primary transition-colors">
                  Kalkulator Warisan
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Informasi</h4>
            <p className="text-sm text-muted-foreground">
              ZAWAR adalah aplikasi web untuk membantu perhitungan zakat dan warisan sesuai syariah Islam. Gratis untuk
              semua.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-border pt-6 mb-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Disclaimer:</strong> ZAWAR dibuat oleh individu yang bukan ahli fiqih. Perhitungan zakat & warisan
            dalam aplikasi ini hanya sebagai referensi dan tidak menggantikan konsultasi dengan ulama atau lembaga
            resmi. Masukan dan koreksi dari berbagai pihak sangat dibutuhkan untuk perbaikan selanjutnya.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2025 ZAWAR — Kalkulator Syariah. </p>
          <p>Dibuat dengan hati oleh aslich - KambingCoding untuk umat</p>
        </div>
      </div>
    </footer>
  )
}
