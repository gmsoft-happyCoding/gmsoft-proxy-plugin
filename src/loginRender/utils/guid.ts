/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-bitwise */
export default () =>
  // @ts-ignore
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      // @ts-ignore
      ((window.crypto || window.msCrypto).getRandomValues(
        new Uint8Array(1)
      )[0] &
        (15 >> (c / 4)))
    ).toString(16)
  );
