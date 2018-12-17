### CODE REVIEW
````
fileNames    lineNumber    Description

lib.js        22            isSingleExistingFile() : can be changed because it sounds like                                                       whether it contains single file only.
lib.js        45,49,50            organizeHead(), organizeTail() and organizeResult() : these function names can be                                    changed.
lib.js        61            input arguements order can be changed and also it can be passed within object.


inputValidation.js   2        object name optionMapping can be changed and it should be plural.
inputValidation.js   25       isFileCountInvalid() : poor naming and also not needed.
inputValidation.js   39       code repeatation, validateHeadInputs can be made generic for head and tail input                                     validation.
IO.js            5        isNumberOption() name can be changed.
IO.js            17       getNumberOptions() name can be changed.
IO.js           25        getOptionWithCount() name can be changed.
IO.js           33        getOptionWithoutCount() name can be changed.

IO.js -> can be renamed because it is also used for tail input parsing.


IO.js         10          value can be renamed as count.
````