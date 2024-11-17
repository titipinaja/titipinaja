import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-svh font-sans">
      <h1 className="font-mono text-lg font-bold">Do you know?</h1>
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
        specific route. The impact of reducing luggage weight becomes even more
        apparent when compared to other carbon reduction strategies. For
        instance, the effect of not carrying this 20 kg of checked baggage (140
        kg CO2) is about 2.6 times the annual reduction from eliminating food
        waste at home and in restaurants (54 kg CO2), and approximately 5.4
        times the annual reduction from using an air conditioner for one hour
        less per day (26 kg CO2 per year) [2]. These comparisons highlight how
        reducing luggage weight can be an effective way for travelers to
        decrease their carbon footprint, especially on long-haul flights like
        those between Germany and Indonesia.
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
