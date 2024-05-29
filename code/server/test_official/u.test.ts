import { describe, test, expect, beforeAll, afterAll } from "@jest/globals"
import request from 'supertest'
import { app } from "../index"
import db from "../src/db/db"

test("1", () => {
    console.log(db)
    expect(1).toBe(1)
})