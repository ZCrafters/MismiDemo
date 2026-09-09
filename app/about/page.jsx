export const metadata = { title: "About Mismi", robots: { index: false } };

export default function About() {
  return (
    <>
      <p className="kicker" style={{ marginTop: 20 }}>ABOUT US</p>
      <h1>Cute bags, for the cutest days ♡</h1>
      <p style={{ maxWidth: "65ch" }}>
        Mismi is an Indonesian women’s bag brand with a Korean-style heart — sling bags,
        backpacks and totes that are adorable, featherlight and easy to pair with anything.
        The designs are playful yet effortless: corduroy, canvas, flower prints, even
        water-repellent picks. This demo catalog pulls real product data from Mismi’s
        official stores on Tokopedia, Shopee, Lazada &amp; TikTok.
      </p>
      <p style={{ maxWidth: "65ch" }}>
        From Jakarta to all of Indonesia, Mismi is here for your crushes, commutes and the
        cutest days — move easy, be Mismi. ♡
      </p>
      <h2>How to shop</h2>
      <p style={{ maxWidth: "65ch" }}>Pick a product on its detail page → add to cart → 3-step checkout (QRIS simulation). Final orders are placed at each marketplace’s official store.</p>
      <h2>Returns &amp; exchanges</h2>
      <p style={{ maxWidth: "65ch" }}>Follow the return policy of the official store you bought from. For help, reach out via Instagram @mismi.official.</p>
      <p><a className="btn" href="/catalog">Start Shopping →</a></p>
    </>
  );
}