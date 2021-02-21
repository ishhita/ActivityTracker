// https://github.com/GoogleChromeLabs/comlink/blob/4ba8162f6c28fb1bf53b491565ef9a3ae42b72d3/src/comlink.ts#L548
function generateUUID(): string {
  return new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
    .join("-");
}
