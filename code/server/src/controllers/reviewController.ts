import { User } from "../components/user";
import ReviewDAO from "../dao/reviewDAO";
import { ProductReview } from "../components/review";

class ReviewController {
  private dao: ReviewDAO;

  constructor() {
    this.dao = new ReviewDAO();
  }

  /**
   * Adds a new review for a product
   * @param model The model of the product to review
   * @param user The username of the user who made the review
   * @param score The score assigned to the product, in the range [1, 5]
   * @param comment The comment made by the user
   * @returns A Promise that resolves to nothing
   */
  async addReview(
    model: string,
    user: string,
    score: number,
    comment: string
  ): Promise<void> {
    try {
      const result = await this.dao.addReview(model, user, score, comment);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns all reviews for a product
   * @param model The model of the product to get reviews from
   * @returns A Promise that resolves to an array of Review objects
   */
  async getProductReviews(model: string): Promise<ProductReview[]> {
    try {
      const reviews = await this.dao.getProductReviews(model);
      return reviews;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes the review made by a user for a product
   * @param model The model of the product to delete the review from
   * @param user The user who made the review to delete
   * @returns A Promise that resolves to nothing
   */
  async deleteReview(model: string, user: string): Promise<void> {
    try {
      const result = await this.dao.deleteReview(model, user);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes all reviews for a product
   * @param model The model of the product to delete the reviews from
   * @returns A Promise that resolves to nothing
   */
  async deleteReviewsOfProduct(model: string): Promise<void> {
    try {
      const result = await this.dao.deleteReviewsOfProduct(model);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes all reviews of all products
   * @returns A Promise that resolves to nothing
   */
  async deleteAllReviews(): Promise<void> {
    try {
      const result = await this.dao.deleteAllReviews();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default ReviewController;
