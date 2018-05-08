//eval is 2x heavier than the following logic
class ComplexPropertyReader {

    public getValue(object:any, complexName:string) : any {
        if (complexName.indexOf('.') == -1)
            return object[complexName];
        else { 
            var splitResult = complexName.split('.');

            var currentObject = object;
            for (let i = 0; i < splitResult.length; i++) {

                if (currentObject[splitResult[i]] == null)
                    throw new Error("ComplexPropertyReader.get: Property not found: " 
                                    + complexName + " - " + splitResult[i]);

                currentObject = currentObject[splitResult[i]];
            }

            return currentObject;
        }
    }

    public setValue(object:any, complexName:string, value:any) : any {
        if (complexName.indexOf('.') == -1)
            object[complexName] = value;
        else {
            var splitResult = complexName.split('.');

            var currentObject = object;
            for (let i = 0; i < splitResult.length; i++) {

                if (currentObject[splitResult[i]] == null)
                    throw new Error("ComplexPropertyReader.setValue: Property not found: " 
                                    + complexName + " - " + splitResult[i]);

                if (i == splitResult.length -1) 
                    currentObject[splitResult[i]] = value;
                else 
                    currentObject = currentObject[splitResult[i]];
            }

            return currentObject;
        }
    }
}

export default new ComplexPropertyReader();