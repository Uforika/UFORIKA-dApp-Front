export const flatArrays = <T>(arrays: T[][]) => arrays.reduce((acc, val) => acc.concat(val));
