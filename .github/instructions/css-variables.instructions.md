For the script generate-theme-tokens.js, make sure to follow the following rules:

- dimension values in rem units should be converted to pixels using a base pixel value of 16px per 1rem after calc or rounding operations
- dimension values in em units should also be converted to pixels using the same base pixel value of 16px per 1em after rounding.
- when rounding dimension values, round to the nearest whole number of the specified unit (after conversion to pixels if necessary).
- Don't output calc or round expressions in the final JSON; instead, resolve them to their calculated values.
- BASE_PIXEL_VALUE = 16;
- The JSON output should have resolved calculations and rounded values in pixels
- Alias variables should be referenced using curly braces, e.g., {--fa-some-variable}
- To properly resolve alias that have not yet a value, ensure that the parsing order allows for dependencies to be resolved first, e.g., parse scale variables before using them in calc expressions.
- Dimension types should be numeric pixel values without units in the final JSON output.

