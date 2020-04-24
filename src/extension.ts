/*
 * This program and the accompanying materials are made available under the terms of the *
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at *
 * https://www.eclipse.org/legal/epl-v20.html                                      *
 *                                                                                 *
 * SPDX-License-Identifier: EPL-2.0                                                *
 *                                                                                 *
 * Copyright Contributors to the Zowe Project.                                     *
 *                                                                                 *
 */
import * as vscode from 'vscode';
import { ZoweExplorerApi } from './ZoweExplorerApi';
import { FtpUssApi } from './ZoweExplorerFtpApi';

export function activate(context: vscode.ExtensionContext) {
    registerFtpApi();
}

/**
 * Function that searches for the Zowe VS Code Extension and if found
 * registers the additional USS API implementation provided by this extension.
 */
function registerFtpApi(): boolean {
    const zoweExplorerApi = vscode.extensions.getExtension(
        'Zowe.vscode-extension-for-zowe'
    );
    if (zoweExplorerApi && zoweExplorerApi.exports) {
        const importedApi: ZoweExplorerApi.IApiRegisterClient =
            zoweExplorerApi.exports;
        importedApi.registerUssApi(new FtpUssApi());
        if (importedApi.reloadProfiles) {
            importedApi.reloadProfiles();
        }
        vscode.window.showInformationMessage(
            "Zowe Explorer was modified for FTP support."
        );
        return true;
    }
    vscode.window.showInformationMessage(
        'Zowe Explorer was not found: either it is not installed or you are using an older version without extensibility API.'
    );
    return false;
}
