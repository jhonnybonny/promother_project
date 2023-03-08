import subProcess from "child_process";

export const executeCommand = async (command: string): Promise<unknown> => {
    const commandExecute = new Promise((resolve) => {
        subProcess.exec(
            command,
            (error, stdout) => {
                resolve(stdout)
            }
        )
    })
    return commandExecute
}