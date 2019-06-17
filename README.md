**JSInputFormatter** is a easy way to format HTML inputs with masks.

**Syntax:**
- import the JSInputFormatter.js
- set the function below on **oninput** event to input format.

**inputFormatter(event,mask)
event:** element input event
**mask:** String with mask
    # - Any valid number
    * - Anything
   others characters don't change

**inputDecimalFormatter(event,decimal)
event:** element input event
**decimal:** Integer number with decimal

Example 1 - Credit Card:
```
Credit Card #### #### #### ####
<input id="cartao" type="text" oninput="inputFormatter(event,'#### #### #### ####')"/>
```
Example 2 - Phone number:
```
Brazil Phone number (##)*####-####
<input id="phone" type="text" oninput="inputFormatter(event,'(##)*####-####')"/>
```
Example 3 - Decimal number :
```
Decimal 0.00
<input id="valor" type="number" oninput="inputDecimalFormatter(event,2)" value='0.00'/>
```
