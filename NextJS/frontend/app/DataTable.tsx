'use client'

import * as React from 'react'
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from './src/components/ui/button'
import { Input } from './src/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './src/components/ui/table'
import so_bold from '@/assets/Sobold.webp'
import so_fun from '@/assets/Sofun.webp'
import so_creative from '@/assets/Socreative.webp'
import so_smart from '@/assets/Sosmart.webp'
import so_wealthy from '@/assets/Sowealthy.webp'

// Mapping between keys and icons
const ICON_MAP: { [key: string]: string } = {
	_bold: so_bold.src,
	_fun: so_fun.src,
	_creative: so_creative.src,
	_smarts: so_smart.src,
	_wealth: so_wealthy.src,
}

// Define the type for the data structure
export type TableData = {
	n: number;
	event: string;
	characters: string;
	locationType: string;
	option1Success: string; // Icon or identifier for success
	option1Failure: string; // Icon or identifier for failure
	option2Success: string;
	option2Failure: string;
};

// Sample data
const data: TableData[] = [
	{
		n: 1,
		event: 'Battle at Dawn',
		characters: 'Hero, Villain',
		locationType: 'Forest',
		option1Success: '_bold',
		option1Failure: '_fun',
		option2Success: '_creative',
		option2Failure: '_smarts',
	},
	{
		n: 2,
		event: 'Mystery of the Cave',
		characters: 'Detective, Ghost',
		locationType: 'Cave',
		option1Success: '_fun',
		option1Failure: '_wealth',
		option2Success: '_bold',
		option2Failure: '_creative',
	},
]

// Define the columns
export const columns: ColumnDef<TableData>[] = [
	{
		accessorKey: 'n',
		header: 'N',
		cell: ({ row }) => <div>{row.getValue('n')}</div>,
	},
	{
		accessorKey: 'event',
		header: 'Event',
		cell: ({ row }) => <div>{row.getValue('event')}</div>,
	},
	{
		accessorKey: 'characters',
		header: 'Characters',
		cell: ({ row }) => <div>{row.getValue('characters')}</div>,
	},
	{
		accessorKey: 'locationType',
		header: 'Location/Type',
		cell: ({ row }) => <div>{row.getValue('locationType')}</div>,
	},
	{
		accessorKey: 'option1Success',
		header: 'Option1 Success',
		cell: ({ row }) => {
			const iconKey = row.getValue('option1Success') as string
			const iconPath = ICON_MAP[iconKey]

			return (
				<div>
					{iconPath ? (
						<img src={iconPath} alt={iconKey} style={{ width: 32, height: 32 }} />
					) : (
						<span>Unknown</span>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'option1Failure',
		header: 'Option1 Failure',
		cell: ({ row }) => {
			const iconKey = row.getValue('option1Failure') as string
			const iconPath = ICON_MAP[iconKey]

			return (
				<div>
					{iconPath ? (
						<img src={iconPath} alt={iconKey} style={{ width: 32, height: 32 }} />
					) : (
						<span>Unknown</span>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'option2Success',
		header: 'Option2 Success',
		cell: ({ row }) => {
			const iconKey = row.getValue('option2Success') as string
			const iconPath = ICON_MAP[iconKey]

			return (
				<div>
					{iconPath ? (
						<img src={iconPath} alt={iconKey} style={{ width: 32, height: 32 }} />
					) : (
						<span>Unknown</span>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'option2Failure',
		header: 'Option2 Failure',
		cell: ({ row }) => {
			const iconKey = row.getValue('option2Failure') as string
			const iconPath = ICON_MAP[iconKey]

			return (
				<div>
					{iconPath ? (
						<img src={iconPath} alt={iconKey} style={{ width: 32, height: 32 }} />
					) : (
						<span>Unknown</span>
					)}
				</div>
			)
		},
	},
]

export function DataTableDemo() {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter events..."
					value={(table.getColumn('event')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('event')?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
