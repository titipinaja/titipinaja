import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-svh font-sans">
      <h1 className="font-mono text-lg font-bold">Fun fact</h1>
      <p className="mt-2">
        A kilogram of airline luggage can have a significant impact on carbon
        dioxide emissions during air travel. On average, each kilogram of weight
        added to an aircraft increases fuel consumption by approximately 0.02
        liters per hour of flight [1]. For a long-haul international flight from
        Germany to Indonesia, specifically from Frankfurt to Jakarta (a round
        trip distance of about 11,668 km), the impact is substantial. Using the
        carbon dioxide emissions intensity of 0.602 kgCO2/tkm for long-haul
        international flights, a 20 kg piece of checked luggage would contribute
        approximately 140 kg of CO2 emissions for the round trip [2]. This
        translates to about 7 kg of CO2 per kilogram of luggage for this
        specific route.
      </p>
      <p className="mt-2">
        By fully using your baggage allowance, we&apos;re ensuring that the CO2
        emissions associated with your luggage are not wasted. This approach is
        particularly impactful for long-haul flights, such as those between
        Germany and Indonesia, where the potential for emissions reduction is
        greater. Remember, every kilogram counts. By making conscious packing
        decisions, travelers can play a significant role in reducing their
        carbon footprint and contributing to more sustainable air travel
        practices.
      </p>

      <div className="font flex flex-col pb-16">
        <h2 className="mt-4 font-mono text-lg font-bold">Links</h2>
        <Link
          href={
            "https://www.sherpr.com/en-us/reducing-your-carbon-footprint-with-luggage-shipping/"
          }
          className="underline underline-offset-2"
        >
          [1] Reducing Your Carbon Footprint with Luggage Shipping
        </Link>
        <Link
          href={"https://edokagura.com/en/reducingluggagereducesco2emissions/"}
          className="underline underline-offset-2"
        >
          [2] Reducing luggage when traveling has the maximum reduction of CO2
          emissions against any methods
        </Link>
      </div>
    </div>
  );
}
