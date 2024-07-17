// if (typeof ResizeObserver === "undefined") {
//   globalThis.ResizeObserver = class ResizeObserverShim {
//     // eslint-disable-next-line
//     constructor (..._args: ConstructorParameters<typeof ResizeObserver>) {}
//     // eslint-disable-next-line
//     observe (..._args: Parameters<ResizeObserver["observe"]>) {}
//     // eslint-disable-next-line
//     unobserve (..._args: Parameters<ResizeObserver["unobserve"]>) {}
//     // eslint-disable-next-line
//     disconnect (..._args: Parameters<ResizeObserver["disconnect"]>) {}
//   }
// }

// if (typeof MutationObserver === "undefined") {
//   globalThis.MutationObserver = class MutationObserverShim {
//     // eslint-disable-next-line
//     constructor (..._args: ConstructorParameters<typeof MutationObserver>) {}
//     // eslint-disable-next-line
//     observe (..._args: Parameters<MutationObserver["observe"]>) {}
//     // eslint-disable-next-line
//     takeRecords () { return [] as ReturnType<MutationObserver["takeRecords"]> }
//     // eslint-disable-next-line
//     disconnect (..._args: Parameters<MutationObserver["disconnect"]>) {}
//   }
// }

// if (typeof document === "undefined") {
//   class DocumentShim implements Partial<Document> {
//     // @ts-expect-error Shimming nonsense. Leave me alone.
//     createElement () {
//       // Not really worth recreating true functionality.
//       return {}
//     }

//     querySelector () { return null }

//     // @ts-expect-error Shimming nonsense. Leave me alone.
//     querySelectorAll () { return [] }
//   }

//   globalThis.document = new DocumentShim() as unknown as Document
// }
