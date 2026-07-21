function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-3 gap-12">

          <div>

            <h2 className="text-3xl font-black">
              AUREX
            </h2>

            <p className="mt-5 text-gray-400 leading-7">
              Intelligent Banking Change Analysis Platform
              helping financial institutions understand
              regulatory documents faster.
            </p>

          </div>

          <div>

            <h3 className="text-xl font-bold">
              Product
            </h3>

            <ul className="space-y-3 mt-5 text-gray-400">

              <li>Features</li>
              <li>Dashboard</li>
              <li>Pricing</li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-bold">
              Company
            </h3>

            <ul className="space-y-3 mt-5 text-gray-400">

              <li>About</li>
              <li>Contact</li>
              <li>Support</li>

            </ul>

          </div>

        </div>

        <div className="border-t border-slate-700 mt-16 pt-8 text-center text-gray-500">

          © 2026 AUREX. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;
