export const compareFirstNames = (a: any, b: any) => {
    const valueA = a.firstName.toUpperCase()
    const valueB = b.firstName.toUpperCase()
    if (valueA < valueB) {
        return -1;
    }
    if (valueA > valueB) {
        return 1;
    }
    return 0;
}

export const compareLastNames = (a: any, b: any) => {
    const valueA = a.lastName.toUpperCase()
    const valueB = b.lastName.toUpperCase()
    if (valueA < valueB) {
        return -1;
    }
    if (valueA > valueB) {
        return 1;
    }
    return 0;
}

export const comparePositions = (a: any, b: any) => {
    const valueA = a.position.toUpperCase()
    const valueB = b.position.toUpperCase()
    if (valueA < valueB) {
        return -1;
    }
    if (valueA > valueB) {
        return 1;
    }
    return 0;
}

export const compareDescriptions = (a: any, b: any) => {
    const valueA = a.description.toUpperCase()
    const valueB = b.description.toUpperCase()
    if (valueA < valueB) {
        return -1;
    }
    if (valueA > valueB) {
        return 1;
    }
    return 0;
}
