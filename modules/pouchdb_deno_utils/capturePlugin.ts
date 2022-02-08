// deno-lint-ignore-file no-explicit-any
const globalAnyRef = (globalThis as any)
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
