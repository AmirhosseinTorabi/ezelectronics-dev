import db from "../db/db";
import {
  ExistingReviewError,
  NoReviewProductError,
} from "../errors/reviewError";
import { ProductNotFoundError } from "../errors/productError"
import { ProductReview } from "../components/review";

class ReviewDAO {
  addReview(
    model: string,
    username: string,
    score: number,
    date: string,
    comment: string
  ): Promise<void> {
    return new Promise<void>( (resolve, reject) => {
      try {
        
        // Check if the product exists before attempting to delete it
        const checkReviewQuery =
          "SELECT model FROM product WHERE model = ?";
        db.get(
          checkReviewQuery,
          [model],
          async (err: Error | null, row: any) => {
            if (err) {
              reject(err);
              return;
            }

            if (!row) {
              reject(new ProductNotFoundError()); // No product found
              return;
            }
          const sql = "INSERT INTO review (model, username, score, date, comment) VALUES(?, ?, ?, ?, ?)"
          db.run(sql, [model, username, score, date, comment], (err: Error | null) => {
              if (err) {
                  if (err.message.includes("UNIQUE constraint failed: review.model")) reject(new ExistingReviewError)
                  reject(err)
                
              }
              resolve()
          })
      })
    } catch (error) {
        reject(error)
    }
    });
  }

  async getProductReviews(model: string): Promise<ProductReview[]> {
    return new Promise<ProductReview[]>(async (resolve, reject) => {
      try {
        // Retrieve all reviews for the given product model from the database
        const getReviewsQuery = "SELECT model, username, score, date, comment FROM review WHERE model = ?";
        db.all(
          getReviewsQuery,
          [model],
          async (err: Error | null, rows: any[]) => {
            if (err) {
              reject(err);
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

            resolve(reviews); // Reviews fetched successfully
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteReview(model: string, username: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Check if the product exists before attempting to delete it
        const checkReviewQuery =
          "SELECT model FROM product WHERE model = ?";
        db.get(
          checkReviewQuery,
          [model],
          async (err: Error | null, row: any) => {
            if (err) {
              reject(err);
              return;
            }

            if (!row) {
              reject(new ProductNotFoundError()); // No product found
              return;
            }

            // Delete the review for the given product model and user from the database
            const deleteReviewQuery =
              "DELETE FROM reviews WHERE model = ? AND user = ?";
            db.run(
              deleteReviewQuery,
              [model, username],
              function (err) {
                if (err) {
                  reject(err);
                  return;
                }
                if (this.changes == 0){
                  reject (new NoReviewProductError())
                  return
                }
                resolve(); // Review deleted successfully
              }
            );
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteReviewsOfProduct(model: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Check if there are any reviews for the product before attempting to delete them
        const checkReviewsQuery = "SELECT model FROM product WHERE model = ?";
        db.get(
          checkReviewsQuery,
          [model],
          async (err: Error | null, rows: any[]) => {
            if (err) {
              reject(err);
              return;
            }

            if (!rows) {
              reject(new ProductNotFoundError()); // product not found
              return;
            }

            // Delete all reviews for the given product model from the database
            const deleteReviewsQuery = "DELETE FROM review WHERE model = ?";
            db.run(deleteReviewsQuery, [model], async (err: Error | null) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(); // Reviews deleted successfully
            });
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteAllReviews(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
          // Delete all reviews from the database
          const deleteAllReviewsQuery = "DELETE FROM review";
          db.run(deleteAllReviewsQuery, async (err: Error | null) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(); // All reviews deleted successfully
          });
        
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default ReviewDAO;
