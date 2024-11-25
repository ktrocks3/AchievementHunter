'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import logo from '@/assets/logo.png'
import Image from 'next/image'
import { Button } from './src/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { DataTableDemo } from './DataTable'

export default function Home() {
	const [folderPath, setFolderPath] = useState('')

	// Load the stored folder path when the component mounts
	useEffect(() => {
		const loadStoredFolder = async () => {
			const storedFolder = await window.BloopAPI.getStoredFolder()
			if (storedFolder) {
				setFolderPath(storedFolder)
			}
		}
		loadStoredFolder()
	}, [])

	const handleSelectFolder = async () => {
		const selectedPath = await window.BloopAPI.selectFolder()
		if (selectedPath) {
			setFolderPath(selectedPath)
			await window.BloopAPI.setStoredFolder(selectedPath) // Save to persistent storage
		}
		try {
			const scriptPath = 'FindMissingEvents.py'
			const args = ['--log_folder', selectedPath]
			console.log(args, "ASDF")
			const result = await window.BloopAPI.runScript(scriptPath, args)
			console.log('Script output:', result)
		} catch (error) {
			console.error('Error running script:', error)
		}

	}

	const refreshFolder = async () => {
		try {
			const scriptPath = 'FindMissingEvents.py'
			const args = ['--log_folder', folderPath]
			console.log(args)
			const result = await window.BloopAPI.runScript(scriptPath, args)
			console.log('Script output:', result)
		} catch (error) {
			console.error('Error running script:', error)
		}
	}


	const handleClearFolder = async () => {
		setFolderPath('') // Clear the state and the local file


		try {
			const scriptPath = 'deletelocal.py'
			const args = []
			const result = await window.BloopAPI.runScript(scriptPath, args)
			console.log('Script output:', result)
		} catch (error) {
			console.error('Error running script:', error)
		}

		await window.BloopAPI.setStoredFolder('') // Clear from persistent storage

	}

	return (
		<div className={styles.wrapper}>
			<main className={styles.main}>
				{!folderPath && (
					<div className={styles.header}>
						<Image
							src={logo.src}
							alt="logo"
							layout="responsive"
							width={1132} // Desired aspect ratio width
							height={196} // Desired aspect ratio height
						/>
					</div>
				)}
				{!folderPath && (
					<div className={styles.body}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							<p>Select a folder:</p>
							<Button
								style={{ width: '40px', height: '40px' }}
								onClick={handleSelectFolder}
							>
								<FontAwesomeIcon icon={faFolder} style={{ color: '#000000' }} />
							</Button>
						</div>
					</div>
				)}

				{folderPath && (
					<div className={styles.header}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							<p>Chosen folder: {folderPath}</p>
							<Button onClick={handleClearFolder}>Clear Folder</Button>
						</div>

						<Button onClick={refreshFolder}>Refresh</Button>
					</div>
				)}

				{folderPath && <DataTableDemo></DataTableDemo>}


				<footer className={styles.footer}>
					{folderPath
						? 'Achievement hunter by < / > ktrocks3'
						: '< / > ktrocks3'}
				</footer>
			</main>
		</div>
	)
}
