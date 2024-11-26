import './globals.css'

export const metadata = {
	title: 'Achievement Hunter',
	description:
		'For monster prom, to get all achievements',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
