import db from "../db/db";
import {
  ExistingReviewError,
  NoReviewProductError,
} from "../errors/reviewError";
import { ProductReview } from "../components/review";

class ReviewDAO {
  async addReview(
    model: string,
    user: string,
    score: number,
    comment: string
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Check if the user has already reviewed this product
        const checkExistingReviewQuery =
          "SELECT * FROM reviews WHERE model = ? AND user = ?";
        db.get(
          checkExistingReviewQuery,
          [model, user],
          async (err: Error | null, row: any) => {
            if (err) {
              reject(err);
              return;
            }

            if (row) {
              reject(new ExistingReviewError()); // Review already exists
              return;
            }

            // If there's no existing review, add the new review to the database
            const addReviewQuery =
              "INSERT INTO reviews (model, user, score, comment) VALUES (?, ?, ?, ?)";
            db.run(
              addReviewQuery,
              [model, user, score, comment],
              async (err: Error | null) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(); // Review added successfully
              }
            );
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async getProductReviews(model: string): Promise<ProductReview[]> {
    return new Promise<ProductReview[]>(async (resolve, reject) => {
      try {
        // Retrieve all reviews for the given product model from the database
        const getReviewsQuery = "SELECT * FROM reviews WHERE model = ?";
        db.all(
          getReviewsQuery,
          [model],
          async (err: Error | null, rows: any[]) => {
            if (err) {
              reject(err);
              return;
            }

            if (rows.length === 0) {
              reject(new NoReviewProductError()); // No reviews found for the product
              return;
            }

            const reviews: ProductReview[] = rows.map((row) => ({
              model: row.model,
              user: row.user,
              score: row.score,
              comment: row.comment,
            }));

            resolve(reviews); // Reviews fetched successfully
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteReview(model: string, user: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        // Check if the review exists before attempting to delete it
        const checkReviewQuery =
          "SELECT * FROM reviews WHERE model = ? AND user = ?";
        db.get(
          checkReviewQuery,
          [model, user],
          async (err: Error | null, row: any) => {
            if (err) {
              reject(err);
              return;
            }

            if (!row) {
              reject(new NoReviewProductError()); // No review found for the product and user
              return;
            }

            // Delete the review for the given product model and user from the database
            const deleteReviewQuery =
              "DELETE FROM reviews WHERE model = ? AND user = ?";
            db.run(
              deleteReviewQuery,
              [model, user],
              async (err: Error | null) => {
                if (err) {
                  reject(err);
                  return;
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
        const checkReviewsQuery = "SELECT * FROM reviews WHERE model = ?";
        db.all(
          checkReviewsQuery,
          [model],
          async (err: Error | null, rows: any[]) => {
            if (err) {
              reject(err);
              return;
            }

            if (rows.length === 0) {
              reject(new NoReviewProductError()); // No reviews found for the product
              return;
            }

            // Delete all reviews for the given product model from the database
            const deleteReviewsQuery = "DELETE FROM reviews WHERE model = ?";
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
        // Check if there are any reviews before attempting to delete them
        const checkAllReviewsQuery = "SELECT COUNT(*) as count FROM reviews";
        db.get(checkAllReviewsQuery, async (err: Error | null, row: any) => {
          if (err) {
            reject(err);
            return;
          }

          if (row.count === 0) {
            reject(new NoReviewProductError()); // No reviews found
            return;
          }

          // Delete all reviews from the database
          const deleteAllReviewsQuery = "DELETE FROM reviews";
          db.run(deleteAllReviewsQuery, async (err: Error | null) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(); // All reviews deleted successfully
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default ReviewDAO;
