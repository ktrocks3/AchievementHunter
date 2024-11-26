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
import so_charming from '@/assets/Socharming.webp'

// Mapping between keys and icons
const ICON_MAP: { [key: string]: string } = {
	_bold: so_bold.src,
	_fun: so_fun.src,
	_creative: so_creative.src,
	_smarts: so_smart.src,
	_money: so_wealthy.src,
	_charm: so_charming.src,
	_damien: so_charming.src,
	_miranda: so_charming.src,
	_scott: so_charming.src,
	_polly: so_charming.src,
	_vera: so_charming.src,
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

// Define the columns
export const columns: ColumnDef<TableData>[] = [
	{
		accessorKey: 'n',
		header: 'N',
		cell: ({ row }) => (
			<div className="min-w-[30px] max-w-[50px] text-center">{row.getValue('n')}</div>
		),
	},
	{
		accessorKey: 'event',
		header: 'Event',
		cell: ({ row }) => (
			<div className="min-w-[100px] max-w-[200px] whitespace-normal break-words">
				{row.getValue('event')}
			</div>
		),
	},
	{
		accessorKey: 'characters',
		header: 'Characters',
		cell: ({ row }) => (
			<div className="min-w-[80px] max-w-[150px] whitespace-normal break-words">
				{row.getValue('characters')}
			</div>
		),
	},
	{
		accessorKey: 'locationType',
		header: 'Location/Type',
		cell: ({ row }) => (
			<div className="min-w-[80px] max-w-[150px] whitespace-normal break-words">
				{row.getValue('locationType')}
			</div>
		),
	},
	{
		accessorKey: 'option1Success',
		header: 'Option1 Success',
		cell: ({ row }) => {
			let iconKey = row.getValue('option1Success') as string
			let opac = 1
			if (typeof iconKey === 'string' && iconKey.endsWith('!')) {
				opac = 0.25
				iconKey = iconKey.replace(/!$/, '') // Remove the '!' from the end
			}
			const iconPath = ICON_MAP[iconKey]
			return (
				<div className="w-[50px] flex justify-center">
					{iconPath ? (
						<img src={iconPath} alt={iconKey} style={{ width: 32, height: 32, opacity: opac }} />
					) : (
						<span>&nbsp;</span> // Render blank space if no iconPath
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'option1Failure',
		header: 'Option1 Failure',
		cell: ({ row }) => {
			let iconKey = row.getValue('option1Failure') as string
			let opac = 1
			if (typeof iconKey === 'string' && iconKey.endsWith('!')) {
				opac = 0.25
				iconKey = iconKey.replace(/!$/, '') // Remove the '!' from the end
			}
			const iconPath = ICON_MAP[iconKey]
			return (
				<div className="w-[50px] flex justify-center">
					{iconPath ? (
						<img src={iconPath} alt={iconKey} style={{ width: 32, height: 32, opacity: opac }} />
					) : (
						<span>&nbsp;</span>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'option2Success',
		header: 'Option2 Success',
		cell: ({ row }) => {
			let iconKey = row.getValue('option2Success') as string
			let opac = 1
			if (typeof iconKey === 'string' && iconKey.endsWith('!')) {
				opac = 0.25
				iconKey = iconKey.replace(/!$/, '') // Remove the '!' from the end
			}
			const iconPath = ICON_MAP[iconKey]
			return (
				<div className="w-[50px] flex justify-center">
					{iconPath ? (
						<img src={iconPath} alt={iconKey} style={{ width: 32, height: 32, opacity: opac }} />
					) : (
						<span>&nbsp;</span>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'option2Failure',
		header: 'Option2 Failure',
		cell: ({ row }) => {
			let iconKey = row.getValue('option2Failure') as string
			let opac = 1
			if (typeof iconKey === 'string' && iconKey.endsWith('!')) {
				opac = 0.25
				iconKey = iconKey.replace(/!$/, '') // Remove the '!' from the end
			}
			const iconPath = ICON_MAP[iconKey]
			return (
				<div className="w-[50px] flex justify-center">
					{iconPath ? (
						<img src={iconPath} alt={iconKey} style={{ width: 32, height: 32, opacity: opac }} />
					) : (
						<span>&nbsp;</span>
					)}
				</div>
			)
		},
	},
]

export function DataTableDemo({ data }: { data: TableData[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
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
			<div className="rounded-md border max-h-96 overflow-y-auto">
				<Table className="table-auto w-full">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="text-left px-2 py-1 text-sm whitespace-normal"
									>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="px-2 py-1 text-sm break-words whitespace-normal"
										>
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
									className="h-24 text-center text-sm"
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
