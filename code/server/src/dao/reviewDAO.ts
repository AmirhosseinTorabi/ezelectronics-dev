
import { ExistingReviewError } from "../errors/reviewError";
import { NoReviewProductError } from "../errors/reviewError";
import db from "../db/db";
import { ProductReview } from "../components/review";

/**
 * A class that implements the interaction with the database for all review-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */
class ReviewDAO {

    /**
     * Creates a new reviww and saves their information in the database
     * @param model
     * @param username 
     * @param score 
     * @param date 
     * @param comment 
     * @returns A Promise that resolves to true if the user has been created.
     */
    // addReview(model, user.username, score, new Date(), comment)
    addReview(model: string, username: string, score: number, date: Date, comment: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                const sql = "INSERT INTO review (model, username, score, date, comment) VALUES(?, ?, ?, ?, ?)"
                db.run(sql, [model, username, score, date, comment], (err: Error | null) => {
                    if (err) {
                        if (err.message.includes("UNIQUE constraint failed: review.model")) reject(new ExistingReviewError)
                        reject(err)
                    }
                    resolve(true)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    getProductReviews(
        model: string
      ): Promise<ProductReview[]> {
        return new Promise<ProductReview[]>((resolve, reject) => {
          try {
            const sql =
              "SELECT model, username, score, date, comment FROM review WHERE model = ?";
            db.all(sql, [model], (err: Error | null, rows: ProductReview[]) => {
              if (err) {
                reject(err);
                return;
              }
              if (!rows) {
                reject(new NoReviewProductError());
                return;
              }
              const reviews = rows.map(
                (row) =>
                  new ProductReview(
                    row.model,
                    row.user,
                    row.score,
                    row.date,
                    row.comment,
                  )
              );
              resolve(reviews);
            });
          } catch (error) {
            reject(error);
          }
        });
      }

      deleteReview(model: string, username: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            try {
                const sql = "DELETE FROM review WHERE model=? AND username=?"
                db.run(sql, [model, username], (err: Error | null) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(true)
                })
            } catch (error) {
                reject(error)
            }
        })
      }

      deleteReviewsOfProduct(model: string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            try {
                const sql = "DELETE FROM review WHERE model=?"
                db.run(sql, [model], (err: Error | null) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(true)
                })
            } catch (error) {
                reject(error)
            }
        })
      }

      deleteAllReviews(): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            try {
                const sql = "TRUNCATE review"
                db.run(sql, [], (err: Error | null) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(true)
                })
            } catch (error) {
                reject(error)
            }
        })
      }

}

export default ReviewDAO;