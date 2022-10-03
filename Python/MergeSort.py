def MergeSort(array):
    if(len(array)<=1):
        return array
    midPoint=(0+len(array))//2
    leftArray=MergeSort(array[:midPoint])
    rightArray=MergeSort(array[midPoint:])
    newArray=Merge(leftArray, rightArray)
    return newArray

def Merge(leftArray, rightArray):
    firstIndex=0
    secondIndex=0
    newArray=[]
    while(firstIndex<len(leftArray) and secondIndex<len(rightArray)):
        if(leftArray[firstIndex]<rightArray[secondIndex]):
            newArray.append(leftArray[firstIndex])
            firstIndex+=1
        else:
            newArray.append(rightArray[secondIndex])
            secondIndex+=1
    while(firstIndex<len(leftArray)):
        newArray.append(leftArray[firstIndex])
        firstIndex+=1
    while(secondIndex<len(rightArray)):
        newArray.append(rightArray[secondIndex])
        secondIndex+=1
    return newArray

array=[9, 3, 1, 7, 4, 10, 53, 23, 12, 44]
result=MergeSort(array)
print(result)
