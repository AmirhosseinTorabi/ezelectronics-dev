const PRODUCT_NOT_FOUND = "Product not found"
const INVALID_GROUPING = "Invalid grouping: must be category or model"
const PRODUCT_ALREADY_EXISTS = "The product already exists"
const PRODUCT_SOLD = "Product already sold"
const EMPTY_PRODUCT_STOCK = "Product stock is empty"
const LOW_PRODUCT_STOCK = "Product stock cannot satisfy the requested quantity"
const SELLING_DATE_ERROR = "Selling date is wrong"
const WRONG_PARAMETERS = "Wrong parameters"

/**
 * Represents an error that occurs when a product is not found.
 */
class ProductNotFoundError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = PRODUCT_NOT_FOUND
        this.customCode = 404
    }
}

/** Error when product grouping is invalid */
class InvalidGrouping extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = INVALID_GROUPING
        this.customCode = 410
    }
}

class SellingDateError extends Error{
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = SELLING_DATE_ERROR
        this.customCode = 400
    }
}

/**
 * Represents an error that occurs when a product id already exists.
 */
class ProductAlreadyExistsError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = PRODUCT_ALREADY_EXISTS
        this.customCode = 409
    }
}

/**
 * Represents an error that occurs when a product is already sold.
 */
class ProductSoldError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = PRODUCT_SOLD
        this.customCode = 409
    }
}

class EmptyProductStockError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = EMPTY_PRODUCT_STOCK
        this.customCode = 409
    }
}

class LowProductStockError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = LOW_PRODUCT_STOCK
        this.customCode = 409
    }
}

class WrongParameterError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super()
        this.customMessage = WRONG_PARAMETERS
        this.customCode = 422
    }
}

export { ProductNotFoundError, ProductAlreadyExistsError, ProductSoldError, EmptyProductStockError, LowProductStockError, WrongParameterError, InvalidGrouping, SellingDateError}