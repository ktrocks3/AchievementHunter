/* ********************************************************************
 *   Declaration file for the API exposed over the context bridge
 *********************************************************************/

export interface IBloopAPI {
	foo: string
	ping: () => Promise<string>
	async

	getStoredFolder(): any

	async

	setStoredFolder(selectedPath: any): any

	async

	selectFolder(): any

	async

	runScript(scriptPath: string, args: string[]): any
}

declare global {
	interface Window {
		BloopAPI: IBloopAPI

		electron: {
			selectFolder: () => Promise<string[]>;
		};
	}
}
