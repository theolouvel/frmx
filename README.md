# Simple, Performant, Lightweight React Forms

**frmx** is lightweight (~27kb minified / ~9kb gzipped) and eliminates most of the boilerplate code and headaches when building forms with React, without assuming anything about the shape of your form data or the nesting / styling of your component.

## CodeSandbox

**[Check the demo here](https://codesandbox.io/s/5g8ek?file=/src/Demo.js)**

## Docs

**[Check the documentation here](https://frmx.io/)**

## Vision

Overall, the goal is to start from the data you need and allow you to write code like this and never worry about wiring state or passing stuff down the prop chain again:

```js
<FrmX
initialValues={{foo: "", bar: {baz:""}}}
onSubmit={formData => doSmthg(formData)}
// disableSubmitIfInvalid // comment out onInvalidSubmit to use this prop!
// disableIfNoUpdates // Additional rules to disable submission
onInvalidSubmit={() => alert("invalid form")}
schemaValidation={{ bar: { baz: str => str.length > 2 } }}
>
    <CustomInput1 field="bar.baz" />
    <CustomInput2 field="foo" />
    <CustomSubmitButton />
</FrmX>
```






