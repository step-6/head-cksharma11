### CODE REVIEW

### lib.js
```
22              isSingleExistingFile() : can be changed because it sounds like whether it contains single file only.

45,49,50        organizeHead(), organizeTail() and organizeResult() : these function names can be changed.
61              input arguements order can be changed and also it can be passed within object.
```
### inputValidation.js
```
2        object name optionMapping can be changed and it should be plural.
25       isFileCountInvalid() : poor naming and also not needed.
39       code repeatation, validateHeadInputs can be made generic for head and tail input validation.
```

### IO.js
```
5        isNumberOption() name can be changed.
17       getNumberOptions() name can be changed.
25       getOptionWithCount() name can be changed.
33       getOptionWithoutCount() name can be changed. -> can be renamed because it is also used for tail input parsing.
10       count can be renamed as count.
````