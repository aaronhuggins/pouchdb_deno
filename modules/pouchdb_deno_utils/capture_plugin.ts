// deno-lint-ignore-file no-explicit-any
type FakePouchDBPluginSink = (passedPlugin: any) => void

interface FakePouchDB {
  plugin: FakePouchDBPluginSink
}

const globalAnyRef: { PouchDB: FakePouchDB } = (globalThis as any)
const pluginRefs: Record<string, any> = {}

globalAnyRef.PouchDB = {
  plugin (passedPlugin: any): void {
    if (passedPlugin){
      pluginRefs[passedPlugin.name] = passedPlugin
    }
  }
}

/** Factory for accessing captured plugins from the global scope with a fake PouchDB global. */
export function capturePlugin (captureName: string): any {
  return pluginRefs[captureName]
}
