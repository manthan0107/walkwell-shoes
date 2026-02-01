import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid md:grid-cols-2 gap-0 p-0 w-[90vw] max-w-4xl h-[85vh] max-h-[700px] overflow-hidden">
        
        {/* Product Image Section */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square">
            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl"></div>
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="relative z-10 aspect-square w-full object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            />
            {productDetails?.salePrice > 0 && (
              <div className="absolute top-3 right-3 z-20 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                SALE
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col p-6 space-y-4 overflow-y-auto">
          
          {/* Product Header */}
          <div className="space-y-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {productDetails?.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {productDetails?.description}
            </p>
          </div>

          {/* Rating Display */}
          <div className="flex items-center gap-2 py-1">
            <div className="flex items-center gap-1">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {averageReview > 0 ? `${averageReview.toFixed(1)} (${reviews.length} reviews)` : 'No reviews yet'}
            </span>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span
                className={`text-2xl font-bold ${
                  productDetails?.salePrice > 0
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                ${productDetails?.price}
              </span>
              {productDetails?.salePrice > 0 && (
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${productDetails?.salePrice}
                </span>
              )}
            </div>
            {productDetails?.salePrice > 0 && (
              <p className="text-green-600 dark:text-green-400 text-sm font-semibold">
                You save ${(productDetails?.price - productDetails?.salePrice).toFixed(2)}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="py-2">
            {productDetails?.totalStock === 0 ? (
              <Button 
                className="w-full h-10 text-sm font-semibold bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                disabled
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full h-10 text-sm font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="my-3" />

          {/* Reviews Section */}
          <div className="space-y-4 flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Customer Reviews
            </h2>
            
            {/* Reviews List */}
            <div className="max-h-48 overflow-y-auto space-y-4 pr-2">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Avatar className="w-8 h-8 border border-gray-200 dark:border-gray-700 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-semibold">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {reviewItem?.userName}
                        </h3>
                        <div className="flex items-center gap-0.5">
                          <StarRatingComponent rating={reviewItem?.reviewValue} />
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <p className="text-sm">No reviews yet</p>
                  <p className="text-xs">Be the first to review this product!</p>
                </div>
              )}
            </div>

            {/* Write Review Section */}
            <div className="space-y-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
              <Label className="text-sm font-semibold text-gray-900 dark:text-white">
                Write Your Review
              </Label>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Rating:</span>
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Share your thoughts about this product..."
                  className="h-9 text-sm border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                />
                
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === "" || rating === 0}
                  className="w-full h-8 text-xs font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;