// This is an App Router page (src/app/page.tsx). The App Router in Next.js 13+ uses React Server Components and prefers fetch for data loading.
// getStaticProps/getServerSideProps are not available in the App Router. Data fetching is done via async functions or fetch in server components.

import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";

const categories = [
	{
		name: "Singers",
		icon: "/mic.svg",
		href: "/artists?category=Singer",
		description: "Bollywood, classical, and live vocalists.",
	},
	{
		name: "Dancers",
		icon: "/dance.svg",
		href: "/artists?category=Dancer",
		description: "Classical, contemporary, and group performers.",
	},
	{
		name: "Speakers",
		icon: "/speaker.svg",
		href: "/artists?category=Speaker",
		description: "Motivational, corporate, and event speakers.",
	},
	{
		name: "DJs",
		icon: "/dj.svg",
		href: "/artists?category=DJ",
		description: "Bollywood, EDM, and club DJs.",
	},
	{
		name: "Magicians",
		icon: "/magic.svg",
		href: "/artists?category=Magician",
		description: "Stage and close-up magicians.",
	},
	{
		name: "Bands",
		icon: "/band.svg",
		href: "/artists?category=Band",
		description: "Live bands for all occasions.",
	},
];

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center min-h-[80vh] px-2 sm:px-4 py-8 gap-8 sm:gap-12">
			<section className="text-center max-w-2xl mx-auto px-2">
				<h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
					Book Top Performing Artists for Your Event
				</h1>
				<p className="text-base md:text-xl text-gray-600 dark:text-gray-300 mb-8">
					Artistly.com connects event planners with talented singers, dancers,
					speakers, DJs, magicians, and bands across India. Discover, shortlist,
					and book the perfect artist for your next event.
				</p>
				<Button
					asChild
					variant="secondary"
					className="w-full max-w-xs mx-auto mt-8"
				>
					<Link href="/artists" aria-label="Explore all artists">
						Explore Artists
					</Link>
				</Button>
			</section>
			<section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-1">
				{categories.map((cat) => (
					<Link
						key={cat.name}
						href={cat.href}
						className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-6 flex flex-col items-center shadow hover:shadow-lg transition"
					>
						<div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 flex items-center justify-center bg-primary/10 rounded-full">
							<Image
								src={cat.icon}
								alt={cat.name + " icon"}
								width={40}
								height={40}
							/>
						</div>
						<h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition">
							{cat.name}
						</h2>
						<p className="text-gray-600 dark:text-gray-300 text-center text-xs sm:text-sm">
							{cat.description}
						</p>
					</Link>
				))}
			</section>
		</main>
	);
}
