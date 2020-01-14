# Zowe Explorer FTP extension

An example VS Code extension demonstrating how to use the Zowe Explorer extension API. It implements Zowe CLI FTP plugin support for the USS explorer. You can then create Zowe CLI FTP profiles and add them to the USS Zowe Explorer to use the FTP protocol for accessing files instead of zOSMF.

## How to build

### Build and setup Zowe Explorer

This example currently works against the following branch of Zowe Explorer: <https://github.com/zowe/vscode-extension-for-zowe/tree/extension-api>

- Clone the Zowe Explorer repo: `git clone git@github.com:zowe/vscode-extension-for-zowe.git`
- Follow the instructions in the [docs/README.md](https://github.com/zowe/vscode-extension-for-zowe/blob/master/docs/README.md) to build it
- Checkout the extension-api branch: `git checkout extension-api`
- Build it to generate a vsix file: `npm install && npm run build && npm run package`
- Install the vsix file as VS Code extension
- Test the Zowe Explorer against using zOSMF CLI profiles

### Build this extension

This example is using the Zowe FTP CLI plugin as a dependency to provide FTP capabilities. Unfortunately, that plugin has not been released to npmjs or bintray, yet. You need to build it locally.

- Clone the FTP CLI plugin repo: `git clone git@github.com:zowe/zowe-cli-ftp-plugin.git`
- Build the FTP CLI plugin: `npm install && npm run build && npm pack && npm run installPlugin`
- Create Zowe CLI FTP profile: `zowe profiles create zftp <profile name> -H <host> -u <user> -p <password> -P <port>`
- Clone this repo in a parallel directory: `git clone git@github.com:phaumer/vscode-extension-for-zowe-api-sample.git`
- Build `npm install && npm run build && npm run package`
- Install the vsix file or just run this extension from VS Code that has the Zowe Explorer built from the AI branch running with the `<F5>` key.

## Using the FTP Extension

- By default this VS Code extension is not activated for demonstration purposed to show that the Zowe Explorer extension API is truly flexible and allows adding new capabilities dynamically. You could change the activation event in package.json if you want to auto-activate by changing this line:
    ```json
    "activationEvents": ["onCommand:extension.activateExtender"],
    ```
    to
    ```json
    "activationEvents": ["*"],
    ```
- To manually activate press `<Meta-Shift>-P` and type/select `Zowe: Activate FTP Support`.
- A message will be shown telling you that activation was successful and that you need to refresh the USS Explorer.
- Do that by click the Refresh icon.
- Then click the `+` icon and you will see your Zowe FTP profile listed in the drop-down.
- Select it and it will appear in the USS Explorer.
- Click the Search icon next to it to specify a USS path to list it.
- Try opening and saving files.

## How to create your own Zowe Explorer extension

TBD, but the rough steps would be:

- Copy the file `src/ZoweExplorerAPI.ts`
- Implement classes that implement any of the `IMvs`, `IUss`, `IJes` interfaces.
- Implement a registration method similar to `registerFtpApi()` in `extension.ts` that queries the Zowe Explorer API and calls the registration method.
