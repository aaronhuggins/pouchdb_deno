// deno-lint-ignore-file no-explicit-any
type PluginSignature =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string];
type FakePouchDBPluginSink = (passedPlugin: any) => void;

interface FakePouchDB {
  __iAmSoFake__: boolean;
  plugin: FakePouchDBPluginSink;
}

const globalAnyRef: { PouchDB: FakePouchDB } = (globalThis as any);
const pluginRefs: Record<string, any> = {};
const fakePouchDB: FakePouchDB = {
  __iAmSoFake__: true,
  plugin(passedPlugin: any): void {
    if (typeof passedPlugin === "function") {
      pluginRefs[passedPlugin.name] = passedPlugin;
    } else if (typeof passedPlugin === "object" && passedPlugin !== null) {
      const props = [];
      const keys = Object.keys(passedPlugin);
      for (let i = 0; i < 4; i++) {
        const prop = keys[i];
        if (Object.prototype.hasOwnProperty.call(passedPlugin, prop)) {
          props.push(prop);
        }
      }
      const signature = props.join("|");
      pluginRefs[signature] = passedPlugin;
    }
  },
};
const pouchDBType = typeof globalAnyRef.PouchDB;

if (
  pouchDBType !== "object" ||
  (pouchDBType === "object" && !globalAnyRef.PouchDB.__iAmSoFake__)
) {
  globalAnyRef.PouchDB = fakePouchDB;
}

/** Factory for accessing captured plugins from the global scope with a fake PouchDB global.
 * @param signature - The runtime function name of the plugin, or an array of up to four object key names.
 */
export function capturePlugin(captureName: string | PluginSignature): any {
  if (Array.isArray(captureName)) {
    const signature = captureName.join("|");

    return pluginRefs[signature];
  }

  return pluginRefs[captureName];
}
