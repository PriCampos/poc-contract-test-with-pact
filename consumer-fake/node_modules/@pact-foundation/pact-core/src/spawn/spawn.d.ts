/// <reference types="node" />
import { ChildProcess } from 'child_process';
import { SpawnArguments } from './arguments';
export declare class Spawn {
    get cwd(): string;
    spawnBinary(command: string, args?: SpawnArguments, argMapping?: {
        [id: string]: string;
    }): ChildProcess;
    killBinary(binary?: ChildProcess): boolean;
}
declare const _default: Spawn;
export default _default;
